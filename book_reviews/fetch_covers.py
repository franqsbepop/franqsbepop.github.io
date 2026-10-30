"""Download book covers from Open Library into book_reviews/covers/.

Reads goodreads_library_export.csv, finds a cover for each book (by ISBN
first, then by title + author), saves it as covers/<slug>.jpg and writes
covers/manifest.json mapping each CSV title to its image file. list.html
reads that manifest. Books that already have a cover are skipped, so the
script can be re-run after a new Goodreads export.

    python3 book_reviews/fetch_covers.py
"""

import csv
import json
import re
import time
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
CSV_PATH = HERE / "goodreads_library_export.csv"
COVERS = HERE / "covers"
MANIFEST = COVERS / "manifest.json"
HEADERS = {"User-Agent": "franqsbepop.github.io cover fetcher (diogo.franquinho@gmail.com)"}


def slugify(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:80]


def get(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as res:
        return res.read()


def find_cover_id(isbn, title, author):
    queries = []
    if isbn:
        queries.append({"isbn": isbn})
    # Drop subtitles and series notes, which rarely match Open Library's titles
    short_title = re.split(r"[:(]", title)[0].strip()
    queries.append({"title": short_title, "author": author})
    queries.append({"title": short_title})
    for params in queries:
        params.update(fields="cover_i", limit=5)
        url = "https://openlibrary.org/search.json?" + urllib.parse.urlencode(params)
        docs = json.loads(get(url)).get("docs", [])
        for doc in docs:
            if doc.get("cover_i"):
                return doc["cover_i"]
        time.sleep(0.5)
    return None


def main():
    COVERS.mkdir(exist_ok=True)
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    missing = []

    with CSV_PATH.open(encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    for row in rows:
        title = row["Title"].strip()
        if not title or (title in manifest and (COVERS / manifest[title]).exists()):
            continue
        author = row["Author"].strip()
        # Goodreads exports ISBNs as Excel formulas: ="0123456789"
        isbn = row["ISBN"].strip().lstrip("=").strip('"')
        try:
            cover_id = find_cover_id(isbn, title, author)
            if cover_id is None:
                missing.append(title)
                print(f"  no cover: {title}")
                continue
            filename = f"{slugify(title)}.jpg"
            image = get(f"https://covers.openlibrary.org/b/id/{cover_id}-M.jpg")
            (COVERS / filename).write_bytes(image)
            manifest[title] = filename
            print(f"  saved:    {title}")
        except Exception as e:
            missing.append(title)
            print(f"  error:    {title} ({e})")
        time.sleep(0.5)

    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False, sort_keys=True))
    print(f"\n{len(manifest)} covers in manifest, {len(missing)} not found.")


if __name__ == "__main__":
    main()
