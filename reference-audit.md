# Reference Audit

Generated: 2026-08-11

Canonical reference:
`posts/post2.html`

Scope:
`posts/post*.html` (36 files matched the glob: post1–post23, post25–post36, and postX. post24.html does not exist. post36.html is a 0-byte empty file and could not be audited for content — see its note below. 35 posts were audited for content.)

## Summary

| Metric                            | Count |
| --------------------------------- | ----: |
| Posts audited                     |    35 |
| Explicit references                |   225 |
| References verified               |   137 |
| References requiring review       |    88 |
| Broken/incorrect links (confirmed)|    16 |
| Missing references (structural)   | 1 post with no References section at all (post30); many individual uncited claims — see per-post detail |
| Orphan references                 |    96 |
| Duplicate references              | 4 (2 duplicate/near-duplicate post files: post22≈post23≈post1; 2 in-file duplicate entries: post17 ref4, post27 refs 1/6) |
| Citation numbering problems       | 4 posts (post6, post8, post13, post17) |
| Formatting inconsistencies        | 34 of 35 audited posts deviate from post2.html's canonical style in at least one respect |
| Quotations requiring verification | 6 quotations identified; 4 flagged UNCERTAIN or confirmed-misattributed, 2 confirmed genuine |

**Methodology note on the summary counts:** "Explicit references" counts every numbered/listed reference-list entry as it appears in each post's References (or Further Reading) section, including duplicate post files. "References verified" means the source was confirmed to exist and the printed bibliographic metadata (author, year, title, venue) was confirmed accurate, independent of minor formatting deviations from post2.html's style. "References requiring review" includes any reference with a confirmed or strongly suspected factual error (wrong author/year/title/venue), a broken or mismatched link, a fabricated/unlocatable source, or a suspicious placeholder identifier (e.g. a duplicate ISBN/DOI/OCLC number shared with an unrelated entry). "Broken/incorrect links" counts only links independently confirmed dead (HTTP 404, DNS failure) or confirmed via fetched content to resolve to the wrong document — it excludes links that returned HTTP 403 to automated tools (JSTOR, ScienceDirect, APS, etc. routinely block bots) unless the correct URL could not otherwise be corroborated by independent search. "Orphan references" counts individual reference-list entries never cited anywhere in a post's body text via a numbered marker.

**Overall headline finding:** the canonical `post2.html` citation style (inline hyperlinks on proper nouns, numbered `<sup><a href="#refN">[N]</a></sup>` markers tied to a `References` section) is followed closely by almost none of the other 34 posts. Reference-list accuracy is highly variable: several posts (post11, post13, postX in particular) contain confirmed factual errors, broken links, or — in postX's case — content that could not be verified to exist at all and that carries a systematic pattern of duplicated placeholder identifiers (shared ISBNs/DOIs/OCLC numbers across unrelated titles), a strong signature of fabrication. No blog post content itself was modified during this audit; see the end of this document for the `git status` confirmation.

---

# Post-by-post audit

## `posts/post1.html`

### Metadata
* Title (`<title>` tag): "Theoretical Foundations of Data-Driven Stochastic Modelling with Financial Market Application" (singular "Application"); `<h2>` heading reads "...Applications" (plural) — internal title/H2 mismatch within the file itself.
* Date: November 13, 2024
* References found: 14
* Hyperlinks found: 14 (one bare "Link" anchor per reference; zero inline hyperlinks in prose)
* References section exists: YES

**Note:** post1.html, post22.html, and post23.html share byte-for-byte (or near-identical) prose and an identical 14-item reference list. post22.html and post23.html are exact duplicates of each other; post1.html differs from them only in title/H2 wording. All three are audited together below since the underlying content and errors are identical; see the "Structural issues" note under post22/post23 for the duplication recommendation.

### References

#### Reference [1]
* Current text: Hastie, T., Tibshirani, R., & Friedman, J. (2009). The elements of statistical learning: data mining, inference, and prediction. Springer Science & Business Media.
* Source identified: *The Elements of Statistical Learning* (2nd ed.), Hastie, Tibshirani, Friedman, Springer, 2009
* Source exists: YES
* Source verified: YES — DOI 10.1007/978-0-387-84858-7 confirms title, authors, year, edition
* Current URL: https://link.springer.com/book/10.1007/978-0-387-84858-7
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO — bare "Link" anchor instead of a hyperlinked title
* Action required: Reformat link placement to match site style
* Confidence: HIGH

#### Reference [2]
* Current text: Murphy, K. P. (2022). Probabilistic Machine Learning: An Introduction. MIT Press.
* Source identified: Kevin P. Murphy, *Probabilistic Machine Learning: An Introduction*, MIT Press, 2022
* Source exists: YES
* Source verified: YES
* Current URL: https://probml.github.io/pml-book/book1.html
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Reformat link placement
* Confidence: HIGH

#### Reference [3]
* Current text: LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444.
* Source identified: Same — confirmed volume, issue, page range, authors
* Source exists: YES
* Source verified: YES
* Current URL: https://www.nature.com/articles/nature14539
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Reformat link placement
* Confidence: HIGH

#### Reference [4]
* Current text: Vaswani, A., et al. (2017). Attention is all you need. NeurIPS, 30, 5998-6008.
* Source identified: Same — authors, venue, volume, page range confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://papers.nips.cc/paper/2017/hash/3f5ee243547dee91fbd053c1c4a845aa-Abstract.html
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Reformat link placement
* Confidence: HIGH

#### Reference [5]
* Current text: Kidger, P., Morrill, J., Foster, J., & Lyons, T. (2020). Neural SDEs as Infinite-Dimensional GANs. arXiv:2006.09375.
* Source identified: Real paper is "Neural SDEs as Infinite-Dimensional GANs," arXiv:**2102.03657**, submitted Feb 2021, ICML 2021. Real authors: **Patrick Kidger, James Foster, Xuechen Li, Harald Oberhauser, Terry Lyons** — "Morrill" is not an author; Li and Oberhauser are omitted.
* Source exists: YES (the real paper), but NOT as cited
* Source verified: PARTIAL — year wrong, printed arXiv ID wrong (doesn't even match the paper's own hyperlink), author list wrong
* Current URL: https://arxiv.org/abs/2102.03657 (the link itself is correct)
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same (keep)
* Formatting consistent with post2.html: NO
* Action required: **Fix citation metadata** — year to 2021, printed arXiv ID to 2102.03657, authors to Kidger, Foster, Li, Oberhauser, Lyons
* Confidence: HIGH

#### Reference [6]
* Current text: Raissi, M., Perdikaris, P., & Karniadakis, G. E. (2019). Physics-informed neural networks... Journal of Computational Physics, 378, 686-707.
* Source identified: Same — authors, journal, volume, pages confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://www.sciencedirect.com/science/article/pii/S0021999118307125
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Reformat link placement
* Confidence: HIGH

#### Reference [7]
* Current text: Tegmark, M. (2024). KAN: Kolmogorov–Arnold Networks. arXiv:2404.19756v1.
* Source identified: Real paper, correct arXiv ID/year, but real authors are **Ziming Liu, Yixuan Wang, Sachin Vaidya, Fabian Ruehle, James Halverson, Marin Soljačić, Thomas Y. Hou, and Max Tegmark** — Tegmark is the senior/last author, not sole author.
* Source exists: YES, but attribution is wrong
* Source verified: PARTIAL — misattributed lead authorship
* Current URL: https://arxiv.org/html/2404.19756v1
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: **Correct author attribution** to "Liu, Z., Wang, Y., Vaidya, S., Ruehle, F., Halverson, J., Soljačić, M., Hou, T. Y., & Tegmark, M."
* Confidence: HIGH

#### Reference [8]
* Current text: Tegmark, M. (2023). Physics Informed Kolmogorov-Arnold Neural Networks... arXiv:2407.18373.
* Source identified: Real paper, but real authors are **Subhajit Patra, Sonali Panda, Bikram Keshari Parida, Mahima Arya, Kurt Jacobs, Denys I. Bondar, Abhijit Sen**; Tegmark is not an author at all. Year should be 2024 (arXiv prefix 2407 = July 2024), not 2023.
* Source exists: YES, but NOT as cited
* Source verified: PARTIAL — wrong author entirely, wrong year
* Current URL: https://arxiv.org/abs/2407.18373
* URL works: YES
* URL points to correct source: YES (correct paper by ID, wrong metadata)
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: **Fully replace citation metadata** — correct authors and year (2024)
* Confidence: HIGH

#### Reference [9]
* Current text: Øksendal, B. (2003). Stochastic differential equations. In Stochastic Differential Equations (pp. 65-84). Springer.
* Source identified: Bernt Øksendal, Ch. 5, in *Stochastic Differential Equations: An Introduction with Applications*, Springer
* Source exists: YES
* Source verified: MEDIUM — DOI 10.1007/978-3-642-14394-6_5 confirms chapter/book match; the DOI corresponds to the 6th edition (commonly dated 2003 for the text, 2010 for this specific ISBN printing) — a plausible but imprecise year/edition pairing
* Current URL: https://link.springer.com/chapter/10.1007/978-3-642-14394-6_5
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Consider aligning cited year with the edition matching the DOI
* Confidence: MEDIUM

#### Reference [10]
* Current text: Karatzas, I., & Shreve, S. (1998). Brownian motion and stochastic calculus (Vol. 113). Springer.
* Source identified: 1st edition 1988, 2nd edition 1991; no edition dated exactly 1998 was located, though a late-1990s reprint may exist
* Source exists: YES
* Source verified: PARTIAL — year unconfirmed
* Current URL: https://link.springer.com/book/10.1007/978-1-4612-0949-2
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Verify the 1998 printing exists; otherwise cite as 1991 (2nd ed.)
* Confidence: MEDIUM

#### Reference [11]
* Current text: Black, F., & Scholes, M. (1973). The pricing of options and corporate liabilities. Journal of Political Economy, 81(3), 637-654.
* Source identified: Identical to post2.html's ref3 — independently confirmed correct there (JSTOR 1831029)
* Source exists: YES
* Source verified: YES
* Current URL: https://www.jstor.org/stable/1831029
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO (bare "Link" pattern instead of hyperlinked title)
* Action required: Reformat link placement
* Confidence: HIGH

#### Reference [12]
* Current text: Buehler, H., Gonon, L., Teichmann, J., & Wood, B. (2019). Deep hedging. Quantitative Finance, 19(8), 1271-1291.
* Source identified: Same — authors, journal, volume/issue, pages confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://www.tandfonline.com/doi/full/10.1080/14697688.2019.1571683
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Reformat link placement
* Confidence: HIGH

#### Reference [13]
* Current text: Cont, R., Stoikov, S., & Talreja, R. (2010). A stochastic model for order book dynamics. Operations Research, 58(3), 549-563.
* Source identified: Same — fully confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://pubsonline.informs.org/doi/abs/10.1287/opre.1090.0780
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Reformat link placement
* Confidence: HIGH

#### Reference [14]
* Current text: Weron, R. (2014). Electricity price forecasting... International Journal of Forecasting, 30(4), 1030-1081.
* Source identified: Same — fully confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://www.sciencedirect.com/science/article/pii/S0169207014001083
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Reformat link placement
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "Stochastic" derives from Greek meaning "to conjecture"/"to aim."
* Location: Paragraph 4
* Source found: Standard etymology (Greek "stokhastikos," from "stokhazesthai" — "to aim at, guess")
* Verification: Consistent with standard dictionary etymologies; left uncited in the post
* Confidence: MEDIUM
* Action: Optionally add a citation; not a factual error

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None — all 14 references cited in order
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: Formatting deviates from post2.html throughout (no inline hyperlinks on proper nouns; bare "Link" anchors instead of hyperlinked titles; no `target="_blank"`). References [5] and [8] contain materially incorrect authorship consistent with hallucinated citation metadata — high-priority fix. `<title>` and H2 disagree internally.

---

## `posts/post22.html`

### Metadata
* Title: "Theoretical Foundations of Data-Driven Stochastic Modelling with Financial Market Applications" (both `<title>` and H2 match this wording, capitalized consistently — differs from post1.html's mismatched title/H2)
* Date: November 13, 2024
* References found: 14
* Hyperlinks found: 14
* References section exists: YES

### References
Content and reference list are **byte-identical** to post1.html (same 14 references, same URLs, same errors). See the `posts/post1.html` section above for the full per-reference verification, including the confirmed errors in Reference [5] (wrong year/arXiv ID/authors), Reference [7] (misattributed to Tegmark alone), and Reference [8] (wrong author entirely, wrong year). All findings and confidence levels there apply identically here.

### Claims requiring verification
Same as post1.html — see Claim 1 there (etymology of "stochastic").

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None — same as post1.html
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: Same "Link"-anchor formatting deviation from post2.html style as post1.html. Unlike post1.html, the `<title>` and H2 are internally consistent in this file. **This file is a duplicate of post1.html's content** (only title casing/wording differs); post22.html and post23.html are exact duplicates of each other. Recommend consolidating to a single canonical post and removing/redirecting the duplicates, fixing the reference errors in whichever is kept.

---

## `posts/post23.html`

### Metadata
* Title: "Theoretical Foundations of Data-Driven Stochastic Modelling with Financial Market Applications" (identical to post22.html)
* Date: November 13, 2024
* References found: 14
* Hyperlinks found: 14
* References section exists: YES

### References
Content is **byte-identical to post22.html** (confirmed by direct file comparison — same prose, same 14 references, same URLs). See the `posts/post1.html` section for full per-reference verification and the same confirmed errors in References [5], [7], and [8].

### Claims requiring verification
Same as post1.html — see Claim 1 there.

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: post22.html and post23.html are exact duplicates (same title, date, body, references) — redundant content that should be resolved (keep one, remove/redirect the other) independent of the reference-accuracy fixes. Same formatting deviations from post2.html style as post1.html/post22.html.

---

## `posts/post2.html` (CANONICAL — self-audit)

### Metadata
* Title: A Brief History of Mathematical Finance
* Date: November 23, 2024
* References found: 3
* Hyperlinks found: 19 (multiple inline hyperlinks on proper nouns/titles throughout the prose, plus 3 in the References section)
* References section exists: YES

### References

#### Reference [1]
* Current text: Bachelier, L. (1900). Théorie de la spéculation (The Theory of Speculation). Doctoral Thesis, supervised by Henri Poincaré.
* Source identified: Louis Bachelier's doctoral thesis, completed 1900 under Henri Poincaré at the Sorbonne — genuine, well-documented foundational work of mathematical finance
* Source exists: YES
* Source verified: YES
* Current URL: https://www.investmenttheory.org/uploads/3/4/8/2/34825752/emhbachelier.pdf
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: YES (this is the canonical example)
* Action required: None
* Confidence: HIGH

#### Reference [2]
* Current text: Einstein, A. (1905). Investigations on the Theory of Brownian Movement. Annalen der Physik.
* Source identified: Einstein's 1905 paper on Brownian motion, Annalen der Physik — genuine, foundational
* Source exists: YES
* Source verified: YES
* Current URL: https://ia801603.us.archive.org/14/items/investigationont0000albe/investigationont0000albe.pdf
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: YES
* Action required: None
* Confidence: HIGH

#### Reference [3]
* Current text: Black, F., & Scholes, M. (1973). The pricing of options and corporate liabilities. Journal of Political Economy, 81(3), 637-654.
* Source identified: Same, real and foundational — independently re-confirmed via JSTOR stable ID 1831029 when cross-checked against post1.html's identical citation
* Source exists: YES
* Source verified: YES
* Current URL: https://www.jstor.org/stable/1831029
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: YES
* Action required: None
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: Bachelier's thesis predates Einstein's Brownian-motion paper "by five years."
* Location: Paragraph 3
* Source found: Bachelier's thesis (1900) vs. Einstein's paper (1905)
* Verification: Confirmed — exactly five years
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: Brownian motion "was first observed by Robert Brown" analyzing particles suspended in water under a microscope.
* Location: Paragraph 4
* Source found: Standard history-of-science account of Robert Brown's 1827 observations
* Verification: Consistent with the well-established historical record
* Confidence: HIGH
* Action: None

#### Claim 3
* Claim: The Black-Scholes model was developed by Black, Scholes, and Merton in the 1970s; practitioners like Edward O. Thorp had used similar methods earlier.
* Location: Paragraph 5
* Source found: Standard history of quantitative finance; Thorp's use of related option-pricing formulas pre-dating Black-Scholes-Merton is well documented (e.g., his work with Sheen Kassouf in the 1960s)
* Verification: Confirmed
* Confidence: HIGH
* Action: None

### Quotations
None found.

### Structural issues
None — this file is the canonical style reference against which all other posts were judged. No corrections identified.

---

## `posts/post3.html`

### Metadata
* Title: "Reducing bias in education evaluation trought improved assessment systems and methodologies" (typo: "trought" → "through")
* Date: November 20, 2024
* References found: 6
* Hyperlinks found: 6 (all in References section; 0 inline in prose)
* References section exists: YES

### References

#### Reference [1]
* Current text: Hanson, R. (2006-2024). Overcoming Bias [Blog].
* Source identified: Robin Hanson, "How School Goes Wrong," Overcoming Bias, published June 13, 2021
* Source exists: YES
* Source verified: PARTIAL — cited date "(2006-2024)" is not a real publication date (conflates blog's founding year with an arbitrary end year); actual post is from 2021
* Current URL: https://www.overcomingbias.com/p/how-school-goes-wronghtml
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same; fix date to 2021
* Formatting consistent with post2.html: NO
* Action required: Fix citation to Hanson, R. (2021). "How School Goes Wrong." Overcoming Bias.
* Confidence: MEDIUM

#### Reference [2]
* Current text: UNESCO. (2017). Education for Sustainable Development Goals: Learning Objectives.
* Source identified: Same — lead author Marco Rieckmann, Paris: UNESCO
* Source exists: YES
* Source verified: YES
* Current URL: https://unesdoc.unesco.org/ark:/48223/pf0000255511/PDF/255511eng.pdf.multi
* URL works: 403 to bots (UNESCO blocks automated tools); document ID independently confirmed correct
* URL points to correct source: YES
* Preferred URL: same, or a mirror
* Formatting consistent with post2.html: YES
* Action required: None significant
* Confidence: HIGH

#### Reference [3]
* Current text: Black, P., & Wiliam, D. (1998). Assessment and Classroom Learning. Assessment in Education, 5(1), 7-74.
* Source identified: Same — title, journal, volume/issue/pages match exactly
* Source exists: YES
* Source verified: YES
* Current URL: https://doi.org/10.1080/0969595980050102
* URL works: YES (DOI resolves)
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: YES
* Action required: None
* Confidence: HIGH

#### Reference [4]
* Current text: Brookhart, S. M., et al. (2016). A Century of Grading Research. Review of Educational Research, 86(4), 803-848.
* Source identified: Same — matches published record
* Source exists: YES
* Source verified: YES
* Current URL: https://www.jstor.org/stable/44668237
* URL works: 403 to bots
* URL points to correct source: UNCERTAIN (could not confirm JSTOR ID directly due to blocking; title/venue/year independently correct)
* Preferred URL: same, or ERIC mirror (EJ1121566)
* Formatting consistent with post2.html: YES
* Action required: Manually confirm JSTOR ID
* Confidence: MEDIUM

#### Reference [5]
* Current text: García, E., & Weiss, E. (2017). Education inequalities at the school starting gate... Economic Policy Institute.
* Source identified: Same — confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://www.epi.org/publication/education-inequalities-at-the-school-starting-gate/
* URL works: 403 to bots; independently confirmed correct via search
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: YES
* Action required: None
* Confidence: HIGH

#### Reference [6]
* Current text: Darling-Hammond, L. (2010). Looking Back to Move Forward. Stanford Social Innovation Review.
* Source identified: The actual page is "Looking Back to Move Forward," an excerpt from Matt Grossmann's book *How Social Science Got Better*, published on SSIR October 12, 2021 — NOT by Linda Darling-Hammond, and not from 2010.
* Source exists: YES (page exists), but NOT as attributed
* Source verified: NO — misattribution confirmed
* Current URL: https://ssir.org/books/excerpts/entry/looking_back_to_move_forward
* URL works: YES
* URL points to correct source: NO — wrong author and wrong year for the actual content
* Preferred URL: Correct the attribution to Grossmann, M. (2021), or find and cite an actual Darling-Hammond piece
* Formatting consistent with post2.html: N/A (misattributed)
* Action required: **HIGH PRIORITY FIX** — correct author/year or replace
* Confidence: LOW (as cited); the misattribution itself is HIGH confidence

### Claims requiring verification

#### Claim 1
* Claim: Black and Wiliam (1998) found formative assessment has significant positive effects, particularly for low-achieving students.
* Location: Paragraph 2
* Source found: Black & Wiliam (1998), ref 3
* Verification: Accurate, widely-cited summary
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: Brookhart et al. (2016) suggest combining continuous and standardized assessment.
* Location: Paragraph 3
* Source found: Brookhart et al. (2016), ref 4 — a historical review, not primarily a policy-recommendation paper
* Verification: UNCERTAIN — could not confirm this specific recommendation is a central conclusion
* Confidence: LOW
* Action: Verify against the paper text or soften the claim

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: No inline hyperlinks in prose. Reference [6]'s misattribution is the most serious issue. Title has a typo.

---

## `posts/post4.html`

### Metadata
* Title: "On the integration of artifical inteligence and other computational devices in the learning paradigm" (typos: "artifical inteligence")
* Date: October 5, 2024
* References found: 2
* Hyperlinks found: 2 (both in References; 0 inline)
* References section exists: YES

### References

#### Reference [1]
* Current text: Bloom, B. S. (1984). The 2 Sigma Problem... Educational Researcher, 13(6), 4-16.
* Source identified: Same — real, well-known paper
* Source exists: YES
* Source verified: YES
* Current URL: https://gwern.net/doc/psychology/1984-bloom.pdf
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: YES
* Action required: None for the reference itself, but see orphan note below
* Confidence: HIGH

#### Reference [2]
* Current text: Wing, J. M. (2006). Computational Thinking. Communications of the ACM, 49(3), 33-35.
* Source identified: Same — real, well-known paper
* Source exists: YES
* Source verified: YES
* Current URL: https://www.cs.cmu.edu/~15110-s13/Wing06-ct.pdf
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: YES
* Action required: None for the reference itself, but see orphan note below
* Confidence: HIGH

### Claims requiring verification
This post contains only general, unsourced commentary/opinion about AI in education with no specific historical, biographical, or attributable factual claims requiring fact-checking beyond the two references.

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: **MAJOR** — zero `<sup>` citation markers anywhere; neither reference is ever cited inline
* Orphan reference: **Both** references are orphaned
* Numbering issue: None
* Raw URL: None
* Other: Title has typos. No inline hyperlinks in prose.

---

## `posts/post5.html`

### Metadata
* Title: Optimal Transport Meets Martingales
* Date: December 5, 2025
* References found: 4
* Hyperlinks found: 4 (all in a "References & Further Reading" section; 0 inline hyperlinks in prose)
* References section exists: YES (titled "References & Further Reading," not post2's plain "References")

### References

#### Reference [1]
* Current text: Beiglböck, M., Henry-Labordère, P., & Penkner, F. (2013). Model-independent bounds for option prices: A mass transport approach. Finance and Stochastics, 17(3), 477–501.
* Source identified: Same — confirmed via independent search (Springer DOI 10.1007/s00780-013-0205-8, arXiv:1106.5929); the linked PDF is the authors' own University of Vienna mirror
* Source exists: YES
* Source verified: YES — title, authors, journal, volume, pages all match
* Current URL: https://www.mat.univie.ac.at/~mathias/BHLP_05_21.pdf
* URL works: YES (HTTP 200)
* URL points to correct source: YES
* Preferred URL: same (author's own mirror is appropriate)
* Formatting consistent with post2.html: PARTIAL — title is hyperlinked correctly, but no `id="refN"` anchor and no inline `[N]` citation marker exists anywhere in the prose
* Action required: Add `id="ref1"` anchor and inline citation marker
* Confidence: HIGH

#### Reference [2]
* Current text: Hobson, D. (1998). Robust hedging of the lookback option. Finance and Stochastics, 2(4), 329–347.
* Source identified: Same — independently confirmed (Springer DOI 10.1007/s007800050044): author, journal, volume 2, issue 4, pages 329-347, year 1998 all match exactly
* Source exists: YES
* Source verified: YES for the underlying bibliographic facts
* Current URL: https://papers.ssrn.com/sol3/papers.cfm?abstract_id=114188
* URL works: UNCERTAIN — SSRN blocked automated fetch (Cloudflare challenge / 403); the specific abstract_id could not be independently confirmed to correspond to this exact paper (no third-party source citing this SSRN ID was found)
* URL points to correct source: UNCERTAIN
* Preferred URL: https://doi.org/10.1007/s007800050044 (Springer, confirmed correct) or https://warwick.ac.uk/fac/sci/statistics/staff/academic-research/hobson/publications/lookback.ps (author's own page)
* Formatting consistent with post2.html: YES structurally (hyperlinked title, Author/Year/Title/Venue)
* Action required: Verify the SSRN abstract ID manually, or switch to the Springer DOI / author's page for a more certain link
* Confidence: HIGH (bibliographic facts) / MEDIUM (this specific URL)

#### Reference [3]
* Current text: Henry-Labordère, P. (2017). Model-free Hedging: A Martingale Optimal Transport Viewpoint.
* Source identified: Real book, Chapman & Hall/CRC (Chapman & Hall/CRC Financial Mathematics Series), 2017
* Source exists: YES
* Source verified: YES — publisher's own product page confirms title/author/year
* Current URL: https://www.routledge.com/Model-free-Hedging-A-Martingale-Optimal-Transport-Viewpoint/Henry-Labordere/p/book/9780367657963
* URL works: YES (HTTP 200)
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: PARTIAL — title hyperlinked, but no publisher given, no `id`/citation marker
* Action required: Add publisher; add `id="ref3"` and inline citation marker
* Confidence: HIGH

#### Reference [4]
* Current text: Villani, C. (2009). Optimal Transport: Old and New.
* Source identified: Cédric Villani, *Optimal Transport: Old and New*, Grundlehren der mathematischen Wissenschaften 338, Springer, 2009 — genuine, Doob Prize-winning text
* Source exists: YES
* Source verified: YES (book itself); the linked file is a personal-website mirror of Villani's freely-circulated lecture notes/book PDF rather than the publisher
* Current URL: http://elenaher.dinauz.org/B07D.StFlour.pdf
* URL works: YES (HTTP 200)
* URL points to correct source: LIKELY YES (search corroborates this file circulates as a mirror of Villani's book/lecture notes), though this is an unofficial personal-domain mirror rather than an institutional or publisher source
* Preferred URL: Springer's own page (https://link.springer.com/book/10.1007/978-3-540-71050-9) for a more stable/authoritative link
* Formatting consistent with post2.html: PARTIAL — title hyperlinked and italicized, but no publisher, no `id`/citation marker
* Action required: Consider swapping to the Springer publisher link for stability; add publisher, `id="ref4"`, and inline citation marker
* Confidence: MEDIUM (URL content plausible but from an unofficial personal mirror rather than a verified authoritative host)

### Claims requiring verification
This post is expository/technical (defining martingale optimal transport, its role in model-independent option pricing via Breeden-Litzenberger). No historical priority or biographical claims beyond attributing the field's origins to Monge and Kantorovich, which is standard and uncontroversial.

#### Claim 1
* Claim: Optimal transport "since its inception by Monge and later Kantorovich, ... has become a central topic in probability, analysis, and beyond."
* Location: "Optimal Transport in Brief" section
* Source found: Standard history of the field (Monge 1781, Kantorovich 1942)
* Verification: Accurate, standard framing
* Confidence: HIGH
* Action: None

### Quotations
None found.

### Structural issues
* Missing References section: No (present, titled "References & Further Reading")
* Missing citation: **All 4 references are never cited inline anywhere in the body text** — no `<sup>[N]</sup>` or `<a href="#refN">` markers exist anywhere in this post, despite the References section implying a numbered convention
* Orphan reference: All 4 references (1–4) are orphaned relative to post2.html's inline-citation convention
* Numbering issue: N/A (no `id="refN"` anchors exist on any `<li>`)
* Raw URL: None (all wrapped in `<a>` tags)
* Other: Zero inline hyperlinks on proper nouns/terms in the prose (post2.html hyperlinks Volterra, Lévy, Wiener, etc. directly; post5 does not hyperlink "Monge," "Kantorovich," "Breeden-Litzenberger," etc.). Section heading "References & Further Reading" deviates from post2.html's plain "References."

---

## `posts/post6.html`

### Metadata
* Title (`<title>` tag): "The Philosophy and Mathematics of Finance: A Brief Overview"; `<h2>` heading: "The Philosophy of Financial Markets" — does not match the `<title>` tag
* `<meta name="description">`: "Diogo Franquinho - Blog Post 8" — copy-paste leftover; this exact string also appears (correctly) in the real post8.html
* Date: November 20, 2024
* References found: 5
* Hyperlinks found: 5 in the References section + 0 inline in prose
* References section exists: YES

### References

#### Reference [1]
* Current text: Hamkins, J. D. (2021). Lectures on the Philosophy of Mathematics. Cambridge, MA: MIT Press.
* Source identified: Joel David Hamkins, *Lectures on the Philosophy of Mathematics*, MIT Press, 2021 — bibliographically correct
* Source exists: YES
* Source verified: YES (bibliographic facts)
* Current URL: https://mitpress.mit.edu/9780262542234/lectures-on-the-philosophy-of-mathematics/
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: YES
* Action required: **The claim attached to this citation is unsupported** — the prose attributes a finance-specific argument to Hamkins, but this book's documented scope (platonism, structuralism, proof, computability, set theory) does not include finance. Likely fabricated/misattributed claim; remove or replace with a genuinely finance-focused source.
* Confidence: HIGH (bibliographic details) / LOW–UNCERTAIN (the associated claim, likely fabricated)

#### Reference [2]
* Current text: Herzog, L. (2023). Philosophy of Money and Finance. Stanford Encyclopedia of Philosophy.
* Source identified: SEP entry "Philosophy of Money and Finance," co-authored by **Boudewijn de Bruin, Lisa Herzog, Martin O'Neill, and Joakim Sandberg** — not Herzog alone
* Source exists: YES
* Source verified: PARTIAL — authorship wrongly reduced to one of four co-authors. **The direct quotation attributed to this source ("the set of economic practices and institutions that have to do with the intertemporal allocation of value") could not be located anywhere in the entry's actual text**, which instead frames finance as "an extension of the monetary system."
* Current URL: https://plato.stanford.edu/entries/money-finance/
* URL works: YES
* URL points to correct source: YES (topic), but the specific quotation attributed to it appears fabricated
* Preferred URL: same
* Formatting consistent with post2.html: PARTIAL
* Action required: **Correct authorship to all four co-authors; the quotation could not be verified in the source and should be removed or replaced**
* Confidence: HIGH (authorship and quote-mismatch both independently checked)

#### Reference [3]
* Current text: Hacking, I. (2001). An Introduction to Probability and Inductive Logic. Princeton, NJ: Princeton University Press.
* Source identified: Ian Hacking, same title, published July 2001, ISBN 9780521772877
* Source exists: YES
* Source verified: PARTIAL — **wrong publisher**: the book was published by **Cambridge University Press**, not Princeton
* Current URL: http://fitelson.org/confirmation/hacking_introduction_to_probability_and_inductive_logic.pdf
* URL works: UNCERTAIN (large PDF, could not fully confirm liveness this session)
* URL points to correct source: UNCERTAIN
* Preferred URL: Cambridge University Press page for ISBN 9780521772877, or Internet Archive
* Formatting consistent with post2.html: YES structurally
* Action required: **Correct publisher to "Cambridge: Cambridge University Press"**
* Confidence: HIGH (publisher error confirmed)

#### Reference [4]
* Current text: MacKenzie, D. (2006). An Engine, Not a Camera: How Financial Models Shape Markets. Princeton, NJ: Princeton University Press.
* Source identified: Donald MacKenzie, same title, MIT Press, 2006
* Source exists: YES
* Source verified: PARTIAL — **wrong publisher**: actual publisher is **MIT Press**, confirmed via MIT Press's own catalog, Cambridge Core review, and the LSE-hosted PDF URL used in the citation itself. Additionally, the surrounding prose cites this 2006 book to support a claim about "the global financial crisis" (2008) — the book predates that crisis by two years, an anachronistic mismatch.
* Current URL: https://personal.lse.ac.uk/ROBERT49/teaching/ph232/pdf/MacKenzie2006.pdf
* URL works: UNCERTAIN (plausible LSE teaching-page mirror, not independently re-fetched)
* URL points to correct source: PLAUSIBLE
* Preferred URL: https://mitpress.mit.edu/9780262633673/an-engine-not-a-camera/
* Formatting consistent with post2.html: YES structurally
* Action required: **Correct publisher to "Cambridge, MA: MIT Press"; reconsider whether this source actually supports the 2008-crisis claim it is attached to**
* Confidence: HIGH (publisher error and year/claim mismatch both confirmed)

#### Reference [5]
* Current text: Shubik, M. (2011). The Theory of Money and Financial Institutions, Volume 3. Cambridge, MA: MIT Press.
* Source identified: Martin Shubik, same title, MIT Press, January 2011
* Source exists: YES
* Source verified: YES — all bibliographic details confirmed
* Current URL: https://mitpress.mit.edu/9780262518031/the-theory-of-money-and-financial-institutions-volume-3/
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: YES
* Action required: **Never cited anywhere in the body text — orphan reference.** Add an in-text citation or remove.
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "As Joel David Hamkins argues, mathematics in finance is not just a computational tool, but a conceptual lens..." (attributed to ref1)
* Location: "Mathematics in Finance" section
* Source found: Hamkins (2021) — a general philosophy-of-mathematics text with no apparent finance content
* Verification: Could not verify this argument appears in the cited book
* Confidence: LOW / likely fabricated attribution
* Action: Remove or replace with a genuinely finance-focused source

#### Claim 2
* Claim: SEP quotation "the set of economic practices and institutions that have to do with the intertemporal allocation of value" (attributed to ref2)
* Location: "The Nature of Finance" section
* Source found: SEP entry — the exact phrase was not found in the entry's text
* Verification: NOT VERIFIED — likely fabricated or a misrepresented paraphrase
* Confidence: LOW / likely fabricated quotation
* Action: Remove the quotation marks and attribute as paraphrase, or replace with a verbatim quote; correct authorship

#### Claim 3
* Claim: "The global financial crisis underscored how abstract models can have concrete, sometimes devastating, real-world effects" (attributed to ref4, MacKenzie 2006)
* Location: "Ethics and the Societal Role of Finance" section
* Source found: MacKenzie's book predates the 2008 crisis by two years
* Verification: The book's general thesis (models are "performative") is real, but it cannot itself have "underscored" the 2008 crisis specifically
* Confidence: MEDIUM
* Action: Rephrase to describe MacKenzie's actual (pre-2008) argument, or cite a source specifically covering 2008

#### Claim 4
* Claim: "Model risk... played a pivotal role in the 2008 financial crisis."
* Location: "Risk, Uncertainty, and the Limits of Knowledge" section
* Source found: Widely-supported claim in the economics/finance literature, but uncited in the post
* Verification: Broadly consistent with established secondary literature
* Confidence: MEDIUM
* Action: Add a citation

### Quotations

#### Quote 1
* Quotation: "the set of economic practices and institutions that have to do with the intertemporal allocation of value"
* Attribution: Attributed to the SEP entry "Philosophy of Money and Finance," cited as "Herzog, L. (2023)"
* Original source: SEP entry (de Bruin, Herzog, O'Neill, Sandberg)
* Verified: NO — phrase not found in the cited entry after examining its introduction and definitional passages
* Notes: Likely fabricated or misattributed; also misattributes sole authorship

### Structural issues
* Missing References section: No
* Missing citation: No
* Orphan reference: **Reference [5] (Shubik) is never cited**
* Numbering issue: In-text citation order is [2], [1], [3], [4] — out of ascending order
* Raw URL: None
* Other: `<title>`/H2 mismatch; `<meta description>` copy-paste leftover; no inline hyperlinks anywhere in the prose. Two of five references (Hacking, MacKenzie) share **identical wrong publisher attributions** ("Princeton, NJ: Princeton University Press") despite being published by two different, correctly-identifiable presses — a notable red flag suggestive of templated/fabricated metadata.

---

## `posts/post7.html`

### Metadata
* Title: Brain-Computer Interfaces: The Future of Human-Machine Interaction
* Date: December 10, 2024
* References found: 3
* Hyperlinks found: 4 (1 inline Wikipedia link + 3 in "References & Notes")
* References section exists: YES (titled "References & Notes")

### References

#### Reference [1]
* Current text: Vidal, J. J. (1973). "Toward Direct Brain-Computer Communication." Annual Review of Biophysics and Bioengineering, 2, 157–180.
* Source identified: Same — confirmed via Annual Reviews/PubMed (PMID 4583653)
* Source exists: YES
* Source verified: YES
* Current URL: `references/post7/vidal1973.pdf` (local file, confirmed present, 439,590 bytes)
* URL works: YES
* URL points to correct source: Presumed YES
* Preferred URL: same, optionally add DOI 10.1146/annurev.bb.02.060173.001105
* Formatting consistent with post2.html: PARTIAL — `<sup>[1]</sup>` marker is NOT hyperlinked to `#ref1`
* Action required: Add anchor hyperlink to citation markers
* Confidence: HIGH

#### Reference [2]
* Current text: Wolpaw, J.R., et al. (2002). "Brain-Computer Interfaces for Communication and Control." Clinical Neurophysiology, 113(6), 767–791.
* Source identified: Same — real, highly-cited review
* Source exists: YES
* Source verified: YES
* Current URL: `references/post7/Brain Computer Interfaces for Communication and Control 2002.pdf` (Title Case in href)
* URL works: **RISK OF BROKEN LINK** — actual file on disk is lowercase; works on case-insensitive filesystems (local macOS) but GitHub Pages serves from a case-sensitive Linux filesystem, so this link is very likely to 404 in production
* URL points to correct source: Presumed YES in content, but case-mismatch is a real deployment risk
* Preferred URL: Rename the file to match the href exactly, or fix the href
* Formatting consistent with post2.html: Same anchor-hyperlink issue
* Action required: **FIX case mismatch between href and actual filename before this breaks in production**
* Confidence: HIGH (paper legitimate); LOW (confidence the link currently works live)

#### Reference [3]
* Current text: Wang, Y., Jiang, C., & Li, C. (2023). "A Review of Brain-Computer Interface Technologies..." arXiv:2303.12626.
* Source identified: A real paper with this title/authors exists, but its actual arXiv ID is **2503.16471**, dated **March 2025**
* Source exists: YES (the paper), but NOT at the cited ID/year
* Source verified: NO as cited — confirmed via fetch that arXiv:2303.12626 is actually "Machine Learning in Physics and Geometry" by He, Heyes, and Hirst — an unrelated paper
* Current URL: https://arxiv.org/pdf/2303.12626
* URL works: YES — but resolves to the WRONG paper
* URL points to correct source: NO
* Preferred URL: https://arxiv.org/abs/2503.16471
* Formatting consistent with post2.html: Same anchor issue
* Action required: **HIGH PRIORITY FIX** — replace arXiv ID with 2503.16471 and correct year to 2025
* Confidence: LOW (as cited); the mismatch itself is HIGH confidence

### Claims requiring verification

#### Claim 1
* Claim: "Evolution of Brain-Computer Interfaces (BCIs), from the first EEG in 1924 to modern BCIs" (image caption)
* Location: Featured image caption
* Source found: Hans Berger recorded the first human EEG on July 6, 1924, at the University of Jena
* Verification: Confirmed accurate
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: "Vidal, at the Brain Research Institute, UCLA, set forth the foundational ideas..."
* Location: Paragraph 2
* Source found: Confirmed via historyofinformation.com and Vidal's UCLA page
* Verification: Accurate
* Confidence: HIGH
* Action: None

#### Claim 3
* Claim: Individuals with ALS can use BCIs to type messages or control a wheelchair
* Location: Paragraph 3
* Source found: Consistent with the general BCI literature (ref 2)
* Verification: Plausible, though not tied to a specific in-text citation
* Confidence: MEDIUM
* Action: None required

### Quotations
None found.

### Structural issues
* Missing References section: No (present but titled "References & Notes")
* Missing citation: None
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: Citation markers `<sup>[1]</sup>` etc. NOT hyperlinked to `#refN` in any of the 3 citations. Reference [3]'s arXiv ID is wrong/mismatched. Reference [2]'s local file case likely mismatches its href, risking a broken link on GitHub Pages. Leftover hidden `<figure style="display:none">` template artifact in the HTML. Two image assets in `posts/references/post7/` are unreferenced anywhere in the post.

---

## `posts/post8.html`

### Metadata
* Title: Ethical Implications of Finance in Von Neumann Universes
* `<meta name="description">`: "Diogo Franquinho - Blog Post 8" (consistent with filename)
* Date: November 27, 2024
* References found: 4
* Hyperlinks found: 4 (each reference's entire text is one hyperlink) + 0 inline
* References section exists: YES

### References

#### Reference [1]
* Current text: Herzog, L. (2021). Professional Ethics in Banking and the Logic of "Integrated Situations"... JSTOR.
* Source identified: Lisa Herzog, same title, Journal of Business Ethics, vol. 156, issue 2, pp. 531–543
* Source exists: YES
* Source verified: PARTIAL — title, author, JSTOR stable ID (45106430) all correct, but **year is wrong**: published in **2019**, not 2021. "JSTOR" is cited as the venue when it's merely the hosting database; the actual journal is omitted.
* Current URL: https://www.jstor.org/stable/45106430
* URL works: UNCERTAIN (JSTOR blocked automated fetch with 403; stable ID independently confirmed correct via search)
* URL points to correct source: YES
* Preferred URL: same, or Springer DOI (10.1007/s10551-017-3562-y)
* Formatting consistent with post2.html: NO — entire citation wrapped in one hyperlink; missing `target="_blank"` and actual journal name/volume/pages
* Action required: **Correct year to 2019; replace "JSTOR" with the actual journal name "Journal of Business Ethics, 156(2), 531–543"**
* Confidence: HIGH

#### Reference [2]
* Current text: Vanderschraaf, P. (2015). Introduction: Game Theory and Business Ethics. Business Ethics Quarterly. Published online by Cambridge University Press: 23 January 2015.
* Source identified: Peter Vanderschraaf, same title, Business Ethics Quarterly, Volume 9, Issue 1
* Source exists: YES
* Source verified: PARTIAL — **true original publication is 1999** (BEQ vol. 9, issue 1); "23 January 2015" is the date Cambridge Core digitized the article, not the original publication date
* Current URL: https://www.cambridge.org/core/journals/business-ethics-quarterly/article/abs/introduction-game-theory-and-business-ethics/87E60879CD6A464C9F8B67F6C69E60D7
* URL works: YES (plausible pattern, matches search results)
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: **Correct year to 1999 (original publication), noting the 2015 online republication if desired**
* Confidence: MEDIUM-HIGH

#### Reference [3]
* Current text: Angel, J. J., & McCabe, D. (2013). Ethical Standards for Stockbrokers: Fiduciary or Suitability? Journal of Business Ethics.
* Source identified: Same — authors, title, journal, year, JSTOR stable ID (23433913) all confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://www.jstor.org/stable/23433913?seq=4
* URL works: UNCERTAIN (JSTOR blocked; ID independently confirmed correct)
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO — missing volume/issue/pages
* Action required: Add volume/issue/pages (115(1), 183–193)
* Confidence: HIGH

#### Reference [4]
* Current text: Peterson, M. (2021). The Ethics of Games. Stanford Encyclopedia of Philosophy (Winter 2021 Edition).
* Source identified: The URL resolves to a real SEP entry, but **both title and author are wrong**. Actual title: **"Game Theory and Ethics"**; actual authors: **Keith Hankins and Peter Vanderschraaf**
* Source exists: NO as cited
* Source verified: NO
* Current URL: https://plato.stanford.edu/archives/win2021/entries/game-ethics/
* URL works: YES
* URL points to correct source: NO — URL resolves to a real, topically-relevant SEP entry, but under a different title and different authors than stated. (Note the irony: Vanderschraaf is correctly cited as sole author of Reference [2] above, suggesting citation confusion.)
* Preferred URL: same URL is fine once metadata is corrected
* Formatting consistent with post2.html: NO
* Action required: **Correct title to "Game Theory and Ethics" and authors to "Hankins, K., & Vanderschraaf, P."**
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "Von Neumann's work on self-reproducing automata helps illuminate how complex financial instruments can emerge, proliferate, and interact."
* Location: Paragraph 3
* Source found: Von Neumann's *Theory of Self-Reproducing Automata* (posthumous, ed. Burks, University of Illinois Press, 1966) — well documented
* Verification: The historical fact is well-established; the financial analogy is the author's own interpretive argument
* Confidence: HIGH (historical fact); N/A (analogy is opinion)
* Action: None required

#### Claim 2
* Claim: "Game theory, introduced in part by von Neumann... The minimax theorem..."
* Location: Paragraph 4
* Source found: Von Neumann proved the minimax theorem (1928) and co-authored *Theory of Games and Economic Behavior* (1944) with Morgenstern
* Verification: Consistent with standard history
* Confidence: HIGH
* Action: None

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None
* Numbering issue: Citation order in text is [1], [2][4], [3] — [4] cited before [3]
* Raw URL: None
* Other: In-text citations use bare `<sup>[1]</sup>` without `<a href="#refN">` wrapping — not hyperlinked, unlike post2.html. Reference-list entries wrap the *entire* citation in a single hyperlink. No `target="_blank"`. No inline hyperlinks on proper nouns. Two of four references contain outright wrong bibliographic metadata (ref1 wrong year; ref4 wrong title AND author) — a high error rate for a 4-reference post.

---

## `posts/post9.html`

### Metadata
* Title: "Grothendieck, von Neumann and Hilbert" (subtitle: "Revolutionaries of 20th Century Mathematics")
* Date: November 27, 2024
* References found: 5
* Hyperlinks found: 8 (3 inline Wikipedia links + 5 in References)
* References section exists: YES

**Note:** unlike post2 (which links only the *title*), post9 wraps the entire reference citation text in a single `<a>` tag throughout.

### References

#### Reference [1]
* Current text: Dieudonné, J. (1984). The Work of Nicholas Bourbaki. American Mathematical Monthly.
* Source identified: Jean Dieudonné's real article is titled "The Work of **Nicolas** Bourbaki" (correct spelling), published in the **American Mathematical Monthly**, Vol. 77 (**1970**), pp. 134–145
* Source exists: YES (the real 1970 article), but NOT as cited
* Source verified: NO — three compounding errors: misspelled name ("Nicholas" vs. "Nicolas"), wrong year (1970, not 1984), and the linked URL is to the **Bulletin of the AMS**, October 1984 issue — a different journal than stated, unconfirmed as even being a Dieudonné piece (403-blocked)
* Current URL: https://www.ams.org/journals/bull/1984-10-01/S0273-0979-1984-15225-2/
* URL works: YES (HTTP 200)
* URL points to correct source: NO / UNCERTAIN — journal in citation text doesn't match journal in URL
* Preferred URL: If citing the 1970 Monthly article, use the correct venue/year
* Formatting consistent with post2.html: NO (whole-line link)
* Action required: **HIGH PRIORITY FIX** — resolve year/journal/name inconsistencies
* Confidence: LOW

#### Reference [2]
* Current text: Reid, C. (1970). Hilbert. Springer-Verlag.
* Source identified: Constance Reid, same title, Springer-Verlag, 1970 — confirmed real biography
* Source exists: YES
* Source verified: YES
* Current URL: https://link.springer.com/book/10.1007/978-3-642-61497-2
* URL works: YES
* URL points to correct source: Likely YES (a different Springer DOI also surfaced for what may be a related edition — could not fully disambiguate)
* Preferred URL: same, pending edition confirmation
* Formatting consistent with post2.html: NO (whole-line link)
* Action required: Minor — confirm edition-specific DOI
* Confidence: MEDIUM-HIGH

#### Reference [3]
* Current text: Macrae, N. (1992). John von Neumann... 
* Source identified: Norman Macrae's real 1992 biography, originally published by **Pantheon Books**, New York, not Princeton University Press
* Source exists: YES (book is real)
* Source verified: PARTIAL — book correct, but link targets Princeton University Press, which is not the original publisher
* Current URL: https://press.princeton.edu/books/hardcover/9780691174181/john-von-neumann
* URL works: **NO — HTTP 404** (confirmed)
* URL points to correct source: NO (dead link)
* Preferred URL: Internet Archive (archive.org/details/johnvonneumann0000macr) or a currently-valid page
* Formatting consistent with post2.html: NO
* Action required: **HIGH PRIORITY FIX — broken link (404)**
* Confidence: LOW

#### Reference [4]
* Current text: Jackson, A. (2004). Comme Appelé du Néant... The Life of Alexandre Grothendieck. Notices of the AMS.
* Source identified: Allyn Jackson's real two-part article — Part 1 in the **September** 2004 issue, Part 2 in October
* Source exists: YES
* Source verified: PARTIAL — the post's link mismatches month/part pairing: it uses "part1" filename combined with the **October** ("200410") folder, but Part 1 was published in the **September** issue
* Current URL: https://www.ams.org/notices/200410/fea-grothendieck-part1.pdf
* URL works: **NO — HTTP 404** (confirmed)
* URL points to correct source: NO
* Preferred URL: https://www.ams.org/notices/200409/fea-grothendieck-part1.pdf
* Formatting consistent with post2.html: NO
* Action required: **FIX — correct URL path from "200410" to "200409"**
* Confidence: MEDIUM (content/attribution correct; only URL broken)

#### Reference [5]
* Current text: Gowers, T. (2008). The Princeton Companion to Mathematics.
* Source identified: Edited by Timothy Gowers, with associate editors June Barrow-Green and Imre Leader, Princeton University Press, 2008
* Source exists: YES
* Source verified: PARTIAL — book real and correctly attributed to Gowers (co-editors omitted); destination URL is wrong
* Current URL: https://press.princeton.edu/books/hardcover/9780691118802/the-rise-of-modern-science-explained
* URL works: **NO — HTTP 404**
* URL points to correct source: NO — even the URL slug is for a **different book entirely**, despite sharing the ISBN in the path
* Preferred URL: Correct Princeton University Press page for ISBN 9780691118802
* Formatting consistent with post2.html: NO; also omits co-editors
* Action required: **HIGH PRIORITY FIX — both broken and mismatched to the wrong title**
* Confidence: LOW

### Claims requiring verification

#### Claim 1
* Claim: "Hilbert... laid crucial foundations through his famous 23 problems"
* Location: Paragraph 2
* Source found: Hilbert's 23 problems, 1900 ICM, Paris
* Verification: Accurate
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: Von Neumann's work on operator algebras, quantum mechanics, computer science, economics
* Location: Paragraph 3
* Source found: Standard, well-documented facts
* Verification: Accurate
* Confidence: HIGH
* Action: None

#### Claim 3
* Claim: Grothendieck "revolutionized algebraic geometry... development of homological algebra"
* Location: Paragraph 4
* Source found: Standard mathematical history; homological algebra predates Grothendieck (he generalized rather than originated it)
* Verification: Mostly accurate; slight overstatement of sole originator role
* Confidence: MEDIUM-HIGH
* Action: Minor wording precision only

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: Citation markers not hyperlinked to `#refN`. Reference list wraps entire citation in one link. **Three of five references have broken (404) links** (refs 3, 4, 5). Reference 1 has compounding factual errors.

---

## `posts/post10.html`

### Metadata
* Title (h2): "Turing and Shannon: The Mathematical Foundations of Modern Computing"; `<title>` tag: "Turing and Shannon: Pioneers of Computing and Information Theory" — inconsistent
* Date: November 28, 2024
* References found: 5
* Hyperlinks found: 7 (2 inline Wikipedia links + 5 in References)
* References section exists: YES

### References

#### Reference [1]
* Current text: Davis, M. (2000). The Universal Computer: The Road from Leibniz to Turing. MIT Press.
* Source identified: Martin Davis, same title, published by **W. W. Norton & Company**, 2000. No evidence of an MIT Press edition.
* Source exists: YES (book real)
* Source verified: NO as cited — wrong publisher
* Current URL: https://mitpress.mit.edu/9780262042369/
* URL works: Could not confirm directly (403 to bots); the ISBN doesn't match any known Davis edition
* URL points to correct source: LIKELY NO
* Preferred URL: Norton 2000 edition (ISBN 978-0393047851) or Internet Archive
* Formatting consistent with post2.html: NO (whole-line link)
* Action required: **HIGH PRIORITY FIX — correct publisher and URL**
* Confidence: LOW

#### Reference [2]
* Current text: Turing, A.M. (1936). On Computable Numbers... Proceedings of the London Mathematical Society.
* Source identified: Real, foundational paper, PLMS Series 2, Vol. 42 (1936–37), pp. 230–265; correct JSTOR/DOI stable ID independently found: 10.2307/2268810
* Source exists: YES
* Source verified: PARTIAL — the specific JSTOR stable ID cited does not match the independently-found correct ID
* Current URL: https://www.jstor.org/stable/2371045
* URL works: 403 to bots; ID "2371045" does not match the independently-found correct ID "2268810"
* URL points to correct source: UNCERTAIN/LIKELY NO
* Preferred URL: https://www.jstor.org/stable/2268810 (pending manual confirmation)
* Formatting consistent with post2.html: NO
* Action required: Verify and likely correct the JSTOR stable ID
* Confidence: LOW

#### Reference [3]
* Current text: Shannon, C.E. (1948). A Mathematical Theory of Communication. Bell System Technical Journal.
* Source identified: Real, foundational paper, BSTJ Vol. 27, 1948, pp. 379-423
* Source exists: YES
* Source verified: YES
* Current URL: https://ieeexplore.ieee.org/document/6773024
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO (whole-line link, otherwise fine)
* Action required: None
* Confidence: HIGH

#### Reference [4]
* Current text: Pierce, J.R. (1980). An Introduction to Information Theory... Dover.
* Source identified: John R. Pierce, real book, Dover Publications, 1980, ISBN 978-0486240619 — matches citation text
* Source exists: YES
* Source verified: PARTIAL — citation text correctly says "Dover," but the linked URL is an MIT Press domain, inconsistent
* Current URL: https://mitpress.mit.edu/9780262534666/
* URL works: 403 to bots
* URL points to correct source: LIKELY NO — domain contradicts stated publisher; ISBN doesn't match Pierce's Dover ISBN
* Preferred URL: A Dover Publications link matching ISBN 978-0486240619
* Formatting consistent with post2.html: NO
* Action required: **FIX — text/URL publisher mismatch**
* Confidence: LOW

#### Reference [5]
* Current text: Copeland, B.J. (2019). The Church-Turing Thesis: Logical and Physical Versions. Nature.
* Source identified: No matching Nature-published Copeland article under this title was found. Closest real work: Copeland & Shagrir, "The Church-Turing Thesis: Logical Limit or Breachable Barrier?", **Communications of the ACM**, 62(1), 66-74 (2019) — different title, journal, and a co-author omitted
* Source exists: UNCERTAIN as titled
* Source verified: NO
* Current URL: https://www.nature.com/articles/d41586-019-02360-7
* URL works: YES
* URL points to correct source: NO — **CONFIRMED MISMATCH**: this URL resolves to "Will China lead the world in AI by 2030?" by Sarah O'Meara, a 2019 Nature news feature about Chinese AI policy — entirely unrelated
* Preferred URL: dl.acm.org/doi/10.1145/3198448 (correct paper), or plato.stanford.edu/entries/church-turing/
* Formatting consistent with post2.html: NO
* Action required: **HIGH PRIORITY FIX — wrong title, wrong journal, URL points to an unrelated article**
* Confidence: LOW (as cited); the mismatch itself is HIGH confidence

### Claims requiring verification

#### Claim 1
* Claim: Turing's 1936 paper introduced the Turing machine and the theoretical limits of computation
* Location: Paragraph 2
* Source found: Standard history of computing
* Verification: Accurate
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: "He [Shannon] introduced the concept of the bit as a unit of information..."
* Location: Paragraph 3
* Source found: Shannon's 1948 paper formalized/popularized "bit"; Shannon himself credits John W. Tukey with coining the term
* Verification: Broadly accurate as commonly framed, though strictly Tukey coined the word
* Confidence: MEDIUM-HIGH
* Action: Minor — could add nuance about Tukey coining the term

#### Claim 3
* Claim: Turing's Bletchley Park work and later writings pioneered cryptography and AI
* Location: Paragraph 5
* Source found: Well-documented historical fact
* Verification: Accurate
* Confidence: HIGH
* Action: None

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: `<title>`/H2 mismatch. Citation markers not hyperlinked. Reference list wraps whole citation in one link. **Reference [5] is a serious, confirmed mismatch.** Reference [1]'s publisher is wrong. Reference [4]'s URL domain contradicts its own stated publisher. Reference [2]'s JSTOR ID doesn't match the verified correct ID.

---

## `posts/post11.html`

### Metadata
* Title: Mathematical Beauty and Taste
* Date: November 29, 2024
* References found: 5
* Hyperlinks found: 2 inline (Hardy, Euler's identity) + 5 in References
* References section exists: YES

### References

#### Reference [1]
* Current text: Hardy, G. H. (1940). A Mathematician's Apology. Cambridge University Press.
* Source identified: Real, canonical book
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://www.cambridge.org/core/books/mathematicians-apology/C2BE78C36B6B10B7F6C8E51392F0C0A4
* URL works: NO (server error on repeated fetch)
* URL points to correct source: NO — genuine Cambridge Core hash for this book is `A344F9D097F5AFF45BDA21B57B54BDCA`, not the hash used
* Preferred URL: https://www.cambridge.org/core/books/mathematicians-apology/A344F9D097F5AFF45BDA21B57B54BDCA
* Formatting consistent with post2.html: NO (whole citation in one link, no italics, `<sup>[1]</sup>` not linked to `#ref1`)
* Action required: Fix URL hash; link citation markers to `#refN` anchors
* Confidence: MEDIUM (book correct; URL wrong)

#### Reference [2]
* Current text: Rota, G. C. (1997). The Phenomenology of Mathematical Beauty. Synthese.
* Source identified: Real article, Synthese 111, 171–182 (1997), DOI 10.1023/A:1004930722234
* Source exists: YES
* Source verified: YES (article itself)
* Current URL: https://press.princeton.edu/books/hardcover/9780691178769/the-nature-of-mathematical-beauty
* URL works: NO (404)
* URL points to correct source: NO — ISBN 9780691178769 is actually **"Plants That Kill"** by Dauncey & Larsson, a completely unrelated book about poisonous plants
* Preferred URL: https://link.springer.com/article/10.1023/A:1004930722234
* Formatting consistent with post2.html: NO
* Action required: **Replace URL entirely — current link is wrong and 404s**
* Confidence: LOW (destination definitively wrong)

#### Reference [3]
* Current text: Chandrasekhar, S. (1987). Truth and Beauty: Aesthetics and Motivations in Science. University of Chicago Press.
* Source identified: Real book, confirmed via press.uchicago.edu, archive.org
* Source exists: YES
* Source verified: YES (book itself)
* Current URL: `x`
* URL works: NO — literally the string "x"
* URL points to correct source: NO
* Preferred URL: https://press.uchicago.edu/ucp/books/book/chicago/T/bo4432943.html or archive.org
* Formatting consistent with post2.html: NO
* Action required: **Fix broken placeholder link immediately**
* Confidence: LOW (link) / MEDIUM (underlying book, real)

#### Reference [4]
* Current text: Stewart, I. (2007). Why Beauty Is Truth: A History of Symmetry. Basic Books.
* Source identified: Real book, confirmed
* Source exists: YES
* Source verified: YES (book itself)
* Current URL: https://www.springer.com/gp/book/9783034604833
* URL works: YES (redirects), but...
* URL points to correct source: NO — resolves to Springer/Birkhäuser DOI for **"Treatment and Prevention of Malaria"**, a completely unrelated pharmacology book
* Preferred URL: https://www.hachettebookgroup.com/titles/ian-stewart/why-beauty-is-truth/9780465082377/
* Formatting consistent with post2.html: NO
* Action required: **Replace URL entirely**
* Confidence: LOW (destination definitively wrong)

#### Reference [5]
* Current text: McAllister, J. W. (2005). Mathematical Beauty and the Evolution of the Standards of Mathematical Proof. Synthese.
* Source identified: Actually published as a chapter in *The Visual Mind II* (ed. Emmer, MIT Press, 2005), pp. 15–34, **NOT in the journal Synthese**
* Source exists: YES, but venue attribution is wrong
* Source verified: PARTIAL
* Current URL: https://www.jstor.org/stable/27903904
* URL works: UNCERTAIN (403)
* URL points to correct source: UNCERTAIN — venue mismatch (book chapter vs. journal) makes a JSTOR "Synthese" link suspect
* Preferred URL: https://scholarlypublications.universiteitleiden.nl/handle/1887/8622
* Formatting consistent with post2.html: NO
* Action required: Correct venue from "Synthese" to "The Visual Mind II, MIT Press"; verify/replace JSTOR link
* Confidence: LOW

### Claims requiring verification

#### Claim 1
* Claim: Hardy declared "beauty is the first test: there is no permanent place in the world for ugly mathematics."
* Location: Paragraph 2
* Source found: A Mathematician's Apology, §10 — genuine primary source
* Verification: Confirmed genuine
* Confidence: HIGH
* Action: None (only the reference URL needs fixing)

#### Claim 2
* Claim: Euler's identity is often cited as an example of mathematical beauty.
* Location: Paragraph 3
* Source found: Common mathematical consensus
* Verification: Not a claim requiring a specific primary source
* Confidence: HIGH
* Action: None

### Quotations

#### Quote 1
* Quotation: "beauty is the first test: there is no permanent place in the world for ugly mathematics."
* Attribution: G. H. Hardy, A Mathematician's Apology (1940)
* Original source: A Mathematician's Apology, §10 — genuine primary source
* Verified: YES
* Notes: Well-attested, no doubt about authenticity

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None — all 5 cited
* Numbering issue: None
* Raw URL: None in prose
* Other: `<sup>[N]</sup>` markers are plain text, not hyperlinked. **Worst reference-integrity record found in the entire audit**: 3 of 5 references point to entirely unrelated or broken destinations (a poisonous-plants book, a malaria pharmacology book, and a literal "x" placeholder), plus 1 more with an incorrect venue attribution.

---

## `posts/post12.html`

### Metadata
* Title: Leonhard Euler / "The Master of Us All"
* Date: December 1, 2024
* References found: 8
* Hyperlinks found: 1 inline (Euler wiki) + 8 in References
* References section exists: YES

### References

#### Reference [1]
* Current text: Dunham, W. (2007). Euler: The Master of Us All. Mathematical Association of America.
* Source identified: William Dunham, same title, MAA (Dolciani Mathematical Expositions No. 22)
* Source exists: YES
* Source verified: PARTIAL — **wrong year**: published **1999**, not 2007 (confirmed via Amazon, AMS bookstore, Harvard Book Store)
* Current URL: Google Books link
* URL works: Plausible
* URL points to correct source: Likely YES
* Preferred URL: https://bookstore.ams.org/dol-22/
* Formatting consistent with post2.html: NO
* Action required: **Correct publication year to 1999**
* Confidence: MEDIUM (book identity correct; year wrong)

#### Reference [2]
* Current text: Bradley, R. E., & Sandifer, C. E. (2007). Leonhard Euler: Life, Work and Legacy. Elsevier.
* Source identified: Same — confirmed real, Studies in the History and Philosophy of Mathematics Vol. 5
* Source exists: YES
* Source verified: YES
* Current URL: https://www.sciencedirect.com/bookseries/studies-in-the-history-and-philosophy-of-mathematics/vol/5/suppl/C
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: None substantive
* Confidence: HIGH

#### Reference [3]
* Current text: Varadarajan, V. S. (2006). Euler Through Time. American Mathematical Society.
* Source identified: Same — confirmed real, ISBN 978-0-8218-3580-7
* Source exists: YES
* Source verified: YES
* Current URL: https://bookstore.ams.org/euler
* URL works: Plausible
* URL points to correct source: Likely YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: None substantive
* Confidence: HIGH

#### Reference [4]
* Current text: Dunham, W. (2007). The Genius of Euler. Mathematical Association of America.
* Source identified: Same — confirmed real, correct year/publisher
* Source exists: YES
* Source verified: YES
* Current URL: https://bookstore.ams.org/spec-51
* URL works: Plausible
* URL points to correct source: Likely YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: None substantive
* Confidence: HIGH

#### Reference [5]
* Current text: Fellmann, E. A. (2007). Leonhard Euler. Birkhäuser Basel.
* Source identified: Same — confirmed real (trans. Gautschi & Gautschi), ISBN 978-3-7643-7538-6
* Source exists: YES
* Source verified: YES
* Current URL: Google Books link
* URL works: Plausible
* URL points to correct source: Likely YES
* Preferred URL: https://link.springer.com/book/9783764375386
* Formatting consistent with post2.html: NO
* Action required: Minor — prefer publisher link
* Confidence: HIGH

#### Reference [6]
* Current text: Euler, L. (1748). Introductio in analysin infinitorum. Lausanne.
* Source identified: Real work (Eneström E101/E102), matches citation
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://scholarlycommons.pacific.edu/cgi/viewcontent.cgi?article=1014&context=euler-works
* URL works: UNCERTAIN (403)
* URL points to correct source: LIKELY NO — the confirmed correct Euler Archive entry is at `euler-works/101/`, whose article ID is 1100, not 1014; article ID 1014 resolves to an unrelated 2021 paper
* Preferred URL: https://scholarlycommons.pacific.edu/euler-works/101/
* Formatting consistent with post2.html: NO
* Action required: Verify and likely correct the article ID
* Confidence: LOW/UNCERTAIN
* Note: prose (paragraph 6) mistranslates the title as "Analysis of the Infinitorium" — standard English title is "Introduction to the Analysis of the Infinite"

#### Reference [7]
* Current text: Euler, L. (1736). Mechanica sive motus scientia analytice exposita. St. Petersburg.
* Source identified: Real work, matches citation
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://scholarlycommons.pacific.edu/cgi/viewcontent.cgi?article=1101&context=euler-works
* URL works: UNCERTAIN (403)
* URL points to correct source: UNCERTAIN — article ID 1101 resolves to an unrelated 2025 paper
* Preferred URL: Euler Archive entries E015/E016
* Formatting consistent with post2.html: NO
* Action required: Verify/correct article ID
* Confidence: LOW/UNCERTAIN

#### Reference [8]
* Current text: Euler, L. (1749). Scientia navalis... St. Petersburg.
* Source identified: Real work (E110/E111), matches citation exactly
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://scholarlycommons.pacific.edu/cgi/viewcontent.cgi?article=1109&context=euler-works
* URL works: UNCERTAIN (403)
* URL points to correct source: PLAUSIBLE — self-consistent numeric pattern, unlike refs 6–7
* Preferred URL: https://scholarlycommons.pacific.edu/euler-works/110/
* Formatting consistent with post2.html: NO
* Action required: Spot-check
* Confidence: MEDIUM

### Claims requiring verification

#### Claim 1
* Claim: Euler lost sight in his right eye at 31 and became almost totally blind later; his works fill over 70 volumes
* Location: Paragraph 5
* Source found: Standard, corroborated biographical facts
* Verification: Consistent with the established record
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: Euler introduced modern notation — f(x), e, i, π, Σ
* Location: Paragraph 2
* Source found: Standard history-of-notation fact
* Verification: Well-established
* Confidence: HIGH
* Action: None

### Quotations

#### Quote 1
* Quotation: "Read Euler, read Euler, he is the master of us all."
* Attribution: Pierre-Simon Laplace
* Original source: Reported by Guglielmo Libri in *Journal des Savants*, January 1846, claiming he personally heard Laplace say it. No direct written record from Laplace himself exists.
* Verified: UNCERTAIN — attribution widely repeated but rests solely on Libri's account, and Libri's reliability has been seriously questioned (he was later exposed as a book thief and forger)
* Notes: The post presents this as settled fact with no hedge; should ideally note the attribution is traditional/disputed

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: Ref1's year is wrong. Refs 6 and 7's Euler-Archive URLs show signs of ID mismatch; ref8 more plausible but unconfirmed. Prose mistranslates the *Introductio* title.

---

## `posts/post13.html`

### Metadata
* Title: Mathematical Philosophy and Large Language Models: New Frontiers in Mathematical Reasoning
* Date: December 2, 2024
* References found: 4
* Hyperlinks found: 0 inline + 4 in References
* References section exists: YES

### References

#### Reference [1]
* Current text: OpenAI. (2023). GPT-4 Technical Report. arXiv:2301.10848.
* Source identified: Real paper is arXiv:**2303.08774**
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://arxiv.org/pdf/2303.08774 (correct)
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: **The printed arXiv ID ("2301.10848") does not match a real paper — internal inconsistency with the correct hyperlink (2303.08774). Fix the printed ID.**
* Confidence: MEDIUM (correct paper/URL; text ID fabricated/wrong)

#### Reference [2]
* Current text: Shapiro, S. (2020). Philosophy of Mathematics. The Stanford Encyclopedia of Philosophy.
* Source identified: SEP entry (plato.stanford.edu/entries/philosophy-mathematics/)
* Source exists: YES
* Source verified: PARTIAL — **author misattribution**: this SEP entry is authored by **Leon Horsten**, not Stewart Shapiro (confirmed via PhilPapers' linked bibliography)
* Current URL: https://plato.stanford.edu/entries/philosophy-mathematics/
* URL works: YES
* URL points to correct source: YES (URL/topic correct)
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: **Correct author name to Leon Horsten**
* Confidence: MEDIUM (URL/topic correct; author wrong)

#### Reference [3]
* Current text: Hendrycks, D., et al. (2021). Measuring Mathematical Problem Solving With the MATH Dataset. arXiv:1904.01557.
* Source identified: Real paper is arXiv:**2103.03874**
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://arxiv.org/pdf/2103.03874 (correct)
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: **The printed ID "1904.01557" belongs to a completely different paper** (Saxton et al., DeepMind 2019). Fix to 2103.03874.
* Confidence: MEDIUM

#### Reference [4]
* Current text: Cobbe, K., et al. (2022). Training Verifiers to Solve Math Word Problems. arXiv:2206.14858.
* Source identified: Real paper (GSM8K) is arXiv:**2110.14168** (Oct 2021)
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://arxiv.org/pdf/2110.14168 (correct)
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: **The printed ID "2206.14858" belongs to a different paper** (Lewkowycz et al., Minerva, 2022). Fix printed ID; year should likely read 2021.
* Confidence: MEDIUM

### Claims requiring verification

#### Claim 1
* Claim: Debates about LLM "understanding" of mathematics "echo the concerns of philosophers like Imre Lakatos and Penelope Maddy."
* Location: Paragraph 3
* Source found: Lakatos and Maddy are real philosophers whose general subject matter is plausible, but no citation ties their work to this specific LLM discussion, and neither appears in the References list
* Verification: Unsupported/uncited assertion
* Confidence: LOW
* Action: Add a citation or hyperlink the names

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: The Lakatos/Maddy claim is uncited
* Orphan reference: None
* Numbering issue: **Confirmed bug** — the prose cites `[5]` in paragraph 3, but only references 1–4 exist. This is a dangling citation with no corresponding entry.
* Raw URL: None
* Other: No inline hyperlinks on proper nouns. `<sup>[N]</sup>` markers are plain text, not linked. Three of four references have arXiv-ID text that doesn't match their own hyperlink target — a systemic issue.

---

## `posts/post14.html`

### Metadata
* Title: The Unreasonable Effectiveness of Mathematics: Karpathy vs Wigner (page title) / "...from Wigner to Karpathy" (H2)
* Date: December 4, 2024
* References found: 6
* Hyperlinks found: 2 inline (Wigner, Karpathy) + 6 in References
* References section exists: YES

### References

#### Reference [1]
* Current text: Wigner, E. (1960). The Unreasonable Effectiveness of Mathematics in the Natural Sciences. Communications in Pure and Applied Mathematics.
* Source identified: Same — confirmed by directly reading the full PDF; matches title, author, journal, volume, issue, date exactly
* Source exists: YES
* Source verified: YES
* Current URL: https://webhomes.maths.ed.ac.uk/~v1ranick/papers/wigner.pdf
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: Close (parenthetical style vs. `<sup>`)
* Action required: None substantive
* Confidence: HIGH

#### Reference [2]
* Current text: Karpathy, A. (2015). The Unreasonable Effectiveness of Recurrent Neural Networks. [Archived: Link may be unavailable]
* Source identified: Same — page loads, title/author/date confirmed via direct fetch
* Source exists: YES
* Source verified: YES
* Current URL: http://karpathy.github.io/2015/05/21/rnn-effectiveness/
* URL works: YES — the link works fine
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO — the "[Archived: Link may be unavailable]" disclaimer is inaccurate and not used elsewhere on the site
* Action required: **Remove the inaccurate disclaimer** since the link is live
* Confidence: HIGH

#### Reference [3]
* Current text: Hamming, R. W. (1980). The Unreasonable Effectiveness of Mathematics. The American Mathematical Monthly.
* Source identified: Same — confirmed by directly reading PDF; AMM Vol. 87, No. 2 (Feb. 1980), pp. 81–90
* Source exists: YES
* Source verified: YES
* Current URL: https://web.njit.edu/~akansu/PAPERS/The%20Unreasonable%20Effectiveness%20of%20Mathematics%20(RW%20Hamming).pdf
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: Close
* Action required: None substantive
* Confidence: HIGH

#### Reference [4]
* Current text: Tegmark, M. (2007). The Mathematical Universe. Foundations of Physics.
* Source identified: Same — confirmed via direct PDF read, arXiv:0704.0646
* Source exists: YES
* Source verified: YES
* Current URL: https://arxiv.org/pdf/0704.0646
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same, though DOI to Foundations of Physics 38(2):101–150 would be more precise
* Formatting consistent with post2.html: Close
* Action required: Minor — journal publication appeared in 2008, not 2007; the cited year reflects arXiv posting
* Confidence: HIGH

#### Reference [5]
* Current text: Colyvan, M. (2019). The Indispensability of Mathematics. Stanford Encyclopedia of Philosophy.
* Source identified: Mark Colyvan, "Indispensability Arguments in the Philosophy of Mathematics," SEP — author confirmed correct
* Source exists: YES
* Source verified: YES
* Current URL: https://plato.stanford.edu/entries/mathphil-indis/
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: Close
* Action required: Minor — cited title is a paraphrase; actual title is "Indispensability Arguments in the Philosophy of Mathematics"
* Confidence: HIGH

#### Reference [6]
* Current text: Mortensen, C. (2019). Inconsistent Mathematics. Stanford Encyclopedia of Philosophy.
* Source identified: Chris Mortensen, same title, SEP — exact match confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://plato.stanford.edu/entries/mathematics-inconsistent/
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: Close
* Action required: None
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: Wigner's 1960 paper reflected on mathematics' capacity to describe the laws of nature
* Location: Paragraph 1
* Source found: Confirmed directly from the full text of Wigner's paper
* Verification: Accurate paraphrase
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: Karpathy's RNN essay marveled at simple structures generating coherent sequences
* Location: Paragraph 2
* Source found: Confirmed via direct fetch of the blog post
* Verification: Accurate
* Confidence: HIGH
* Action: None

#### Claim 3
* Claim: Tegmark argues for a "mathematical universe" where physical existence is mathematical structure
* Location: Paragraph 4
* Source found: Confirmed directly from Tegmark's paper text
* Verification: Accurate
* Confidence: HIGH
* Action: None

### Quotations
None found (only paraphrased summaries).

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: **This is the strongest-sourced post in the entire audit** — all 6 references verified real, correctly attributed, and correctly linked. Citation markers use parenthetical style rather than `<sup>`, a minor formatting deviation. Ref2's disclaimer should be removed.

---

## `posts/post15.html`

### Metadata
* Title: Econophysics: Bridging Economics and Physics
* Date: December 15, 2024
* References found: 5
* Hyperlinks found: 3 inline (Fisher, Tinbergen, Haavelmo) + 5 in References
* References section exists: YES

### References

#### Reference [1]
* Current text: H. E. Stanley et al., "Scale invariance and universality in economic phenomena," J. Phys.: Condens. Matter 14(19), 2002.
* Source identified: Same — confirmed via direct PDF read; matches title, authors, journal, volume, pages exactly
* Source exists: YES
* Source verified: YES
* Current URL: https://amaral.northwestern.edu/media/publication_pdfs/Stanley-2002-J.Phys.-Condes.Matter-14-2121.pdf
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO (raw citation string, whole entry in one link)
* Action required: None substantive
* Confidence: HIGH

#### Reference [2]
* Current text: I. Fisher, The Theory of Interest, 1930.
* Source identified: Irving Fisher, Macmillan, 1930
* Source exists: YES
* Source verified: YES — confirmed via Online Library of Liberty
* Current URL: https://oll.libertyfund.org/titles/fisher-the-theory-of-interest
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: None substantive
* Confidence: HIGH

#### Reference [3]
* Current text: J. Tinbergen, Econometrics, 1951.
* Source identified: Jan Tinbergen, The Blakiston Company, 1951
* Source exists: YES
* Source verified: YES — confirmed via Erasmus University repository
* Current URL: http://hdl.handle.net/1765/14856
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: None substantive
* Confidence: HIGH

#### Reference [4]
* Current text: C. Castellano et al., "Statistical physics of social dynamics," Rev. Mod. Phys. 81, 591–646 (2009).
* Source identified: Same — matches exactly per multiple independent sources
* Source exists: YES
* Source verified: YES
* Current URL: https://journals.aps.org/rmp/pdf/10.1103/RevModPhys.81.591
* URL works: UNCERTAIN (403, likely just APS's access wall)
* URL points to correct source: YES (DOI matches exactly)
* Preferred URL: same, or DOI link
* Formatting consistent with post2.html: NO
* Action required: None substantive
* Confidence: HIGH

#### Reference [5]
* Current text: T. Haavelmo, "Statistical Testing of Business-Cycle Theories," Review of Economics and Statistics, Vol. 25, No. 1 (1943), pp. 13-18.
* Source identified: Same — confirmed via JSTOR listing and search results
* Source exists: YES
* Source verified: YES
* Current URL: https://www.jstor.org/stable/1924542?seq=1
* URL works: UNCERTAIN (403, typical JSTOR restriction)
* URL points to correct source: YES (stable ID matches)
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: None substantive
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "The term [econophysics] was introduced in the 1990s by H. Eugene Stanley."
* Location: Paragraph 1
* Source found: Multiple independent sources confirm Stanley coined "econophysics" in 1995
* Verification: Confirmed accurate
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: "Pioneers such as Irving Fisher, Jan Tinbergen, and Trygve Haavelmo bridged economics and the physical sciences"
* Location: Paragraph 2
* Source found: All three are real major figures in mathematical economics/econometrics, but no source describes them specifically as "econophysics" pioneers — the post's own ref1 attributes that term specifically to physicists like Stanley in the 1990s
* Verification: The underlying biographical facts are accurate, but the framing conflates econometrics with econophysics — two related but distinct traditions
* Confidence: LOW (for the "bridged... physical sciences" framing) / HIGH (for the underlying biographical facts)
* Action: Soften the claim or distinguish "econometrics pioneers" from "econophysics pioneers"

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: `<sup>[N]</sup>` markers plain text, not linked. Strongest reference record alongside post14 — all 5 references verified real and correctly linked — but the Fisher/Tinbergen/Haavelmo "econophysics pioneers" framing editorially overreaches relative to what the cited sources establish.

---

## `posts/post16.html`

### Metadata
* Title: Understanding Distributions: When to Use Which
* Date: December 20, 2024
* References found: 5
* Hyperlinks found: 5 (all in References; 0 inline)
* References section exists: YES

### References

#### Reference [1]
* Current text: "Normal Distribution - Wikipedia"
* Source identified: Wikipedia, "Normal distribution"
* Source exists: YES
* Source verified: PARTIAL (adequate for a low-stakes definitional claim, not a scholarly source)
* Current URL: https://en.wikipedia.org/wiki/Normal_distribution
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO — no Author/Year, no inline hyperlink, `<sup>[1]</sup>` not linked
* Action required: Add inline hyperlink, make `[1]` a working anchor, reformat entry
* Confidence: HIGH (page content) / MEDIUM (adequacy as a citation)

#### Reference [2]
* Current text: "Pareto Distribution - Wikipedia"
* Source identified: Wikipedia, "Pareto distribution"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Pareto_distribution
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Same as ref1
* Confidence: HIGH / MEDIUM

#### Reference [3]
* Current text: "Binomial Distribution - Wikipedia"
* Source identified: Wikipedia, "Binomial distribution"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Binomial_distribution
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Same as ref1
* Confidence: HIGH / MEDIUM

#### Reference [4]
* Current text: "Poisson Distribution - Wikipedia"
* Source identified: Wikipedia, "Poisson distribution"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Poisson_distribution
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Same as ref1
* Confidence: HIGH / MEDIUM

#### Reference [5]
* Current text: "Beta Distribution - Wikipedia"
* Source identified: Wikipedia, "Beta distribution"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Beta_distribution
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Same as ref1
* Confidence: HIGH / MEDIUM

### Claims requiring verification

#### Claim 1
* Claim: The normal distribution is symmetric about the mean
* Location: Paragraph 2
* Source found: Standard statistics fact
* Verification: Correct
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: Pareto distribution models income/wealth inequality
* Location: Paragraph 3
* Source found: Standard economics/statistics fact
* Verification: Correct
* Confidence: HIGH
* Action: None

#### Claim 3
* Claim: Beta distribution is bounded [0,1], used for proportions/probabilities
* Location: Paragraph 5
* Source found: Standard statistics fact
* Verification: Correct
* Confidence: HIGH
* Action: None

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: No markers are broken, but none are hyperlinked
* Orphan reference: None — all 5 cited in order
* Numbering issue: None
* Raw URL: None
* Other: Zero inline hyperlinks in prose. Reference entries are bare "Title - Wikipedia" text rather than Author/Year/Title/Venue. All 5 references are Wikipedia-only — a thin sourcing base for specific technical claims.

---

## `posts/post17.html`

### Metadata
* Title: There is always an ε: On the existence of God
* Date: January 15, 2025
* References found: 6 list items, but only 5 distinct topics — `id="ref4"` appears **twice** (duplicate), and `ref6` is missing entirely (the sixth item is mislabeled `ref7`)
* Hyperlinks found: 6 (all in References; 0 inline)
* References section exists: YES

### References

#### Reference [1]
* Current text: "Ontological Argument - Wikipedia"
* Source identified: Wikipedia, "Ontological argument"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Ontological_argument
* URL works: YES
* URL points to correct source: YES
* Preferred URL: SEP "Ontological Arguments" would be a stronger scholarly source
* Formatting consistent with post2.html: NO
* Action required: Reformat; consider upgrading to SEP
* Confidence: HIGH

#### Reference [2]
* Current text: "Cosmological Argument - Wikipedia"
* Source identified: Wikipedia, "Cosmological argument"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Cosmological_argument
* URL works: YES
* URL points to correct source: YES
* Preferred URL: SEP "Cosmological Argument" entry
* Formatting consistent with post2.html: NO
* Action required: Reformat
* Confidence: HIGH

#### Reference [3]
* Current text: "Teleological Argument - Wikipedia"
* Source identified: Wikipedia, "Teleological argument"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Teleological_argument
* URL works: YES
* URL points to correct source: YES
* Preferred URL: SEP "Design Arguments for the Existence of God"
* Formatting consistent with post2.html: NO
* Action required: Reformat
* Confidence: HIGH

#### Reference [4] (appears twice — duplicate `id="ref4"`)
* Current text: "Problem of Evil - Wikipedia" (listed identically twice)
* Source identified: Wikipedia, "Problem of evil"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Problem_of_evil
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same, or SEP "The Evidential Problem of Evil"
* Formatting consistent with post2.html: NO
* Action required: **Remove the duplicate `<li id="ref4">` entry — invalid HTML (duplicate id).** Also never cited in prose (orphan).
* Confidence: HIGH (bug confirmed by direct inspection)

#### Reference [5]
* Current text: "Pascal's Wager - Wikipedia"
* Source identified: Wikipedia, "Pascal's Wager"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Pascal%27s_Wager
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO
* Action required: Never cited in prose (orphan). Reformat.
* Confidence: HIGH

#### Reference [7] (labeled 7, but is the 6th and last `<li>` — no `ref6` exists anywhere)
* Current text: "Norbert Wiener on God & Golem, Inc. - Wikipedia"
* Source identified: Wikipedia article on Wiener's 1964 book *God & Golem, Inc.* (MIT Press, 1964; 1965 National Book Award winner)
* Source exists: YES — verified via fetch
* Source verified: YES
* Current URL: https://en.wikipedia.org/wiki/God_%26_Golem%2C_Inc.
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same, or a link to the book itself
* Formatting consistent with post2.html: NO
* Action required: **Numbering bug** — labeled `[7]` but is the 6th item; renumber to `ref6`. Also never cited in prose (orphan).
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "The Ontological Argument... was first proposed by St. Anselm in the 11th century."
* Location: Paragraph 2
* Source found: SEP "Ontological Arguments"; IEP "Anselm: Ontological Argument"
* Verification: CONFIRMED — Anselm's *Proslogion*, written 1077–1078
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: Cosmological Argument supported by Aquinas and Leibniz
* Location: Paragraph 3
* Source found: General philosophical consensus (Aquinas's Five Ways; Leibniz's Principle of Sufficient Reason)
* Verification: CONFIRMED
* Confidence: HIGH
* Action: None

#### Claim 3
* Claim: Teleological Argument "bolstered by discoveries in modern science, such as fine-tuning"
* Location: Paragraph 4
* Source found: Standard in philosophy-of-religion literature
* Verification: Accurate as description of a live position, not an endorsement of its soundness
* Confidence: MEDIUM
* Action: None required, but could be worded more carefully

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: `ref6` is missing (jump from ref5 to ref7)
* Orphan reference: ref4, ref5, and ref7 (Wiener) are never cited — only `[1]`, `[2]`, `[3]` appear in body text
* Numbering issue: **YES** — duplicate `id="ref4"` (invalid HTML) AND a gap where ref6 should be
* Raw URL: None
* Other: Zero inline hyperlinks in prose. `<sup>[N]</sup>` markers not hyperlinked.

---

## `posts/post18.html`

### Metadata
* Title: Sticky Path Dependency: On progress, stagnation and hope for the future
* Date: January 22, 2025
* References found: 3
* Hyperlinks found: 3 (all in References; 0 inline)
* References section exists: YES

### References

#### Reference [1]
* Current text: "Path Dependence - Wikipedia"
* Source identified: Wikipedia, "Path dependence"
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://en.wikipedia.org/wiki/Path_dependence
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same, or Paul David's own working paper as a primary source
* Formatting consistent with post2.html: NO
* Action required: Reformat; add inline hyperlink
* Confidence: HIGH

#### Reference [2]
* Current text: David, P. A. (2001). Path dependence, its critics and the quest for 'historical economics'. Science Direct.
* Source identified: Paul A. David's actual 2001 work was published as a chapter in *Evolution and Path Dependence in Economic Ideas* (Garrouste & Ioannides, eds., Edward Elgar, 2001), pp. 15–40, and also circulated as a Stanford/SIEPR working paper — **not** published as a standalone Elsevier/ScienceDirect journal article
* Source exists: YES (paper exists), but the claimed venue ("Science Direct") appears incorrect
* Source verified: PARTIAL — author/year/title accurate, venue likely wrong
* Current URL: https://www.sciencedirect.com/science/article/pii/S0048733302000625
* URL works: UNCERTAIN — 403 to automated fetch, and this exact PII could not be corroborated anywhere else on the open web
* URL points to correct source: NO / UNCERTAIN
* Preferred URL: https://faculty.sites.iastate.edu/tesfatsi/archive/tesfatsi/pathdep.pdavid.pdf (working paper PDF) or the Edward Elgar chapter record
* Formatting consistent with post2.html: PARTIAL
* Action required: Verify and likely replace URL and venue
* Confidence: LOW (URL/venue) / MEDIUM (author/title/year, correct)

#### Reference [3]
* Current text: Arthur, W. B. (2021). Complexity economics: path dependence and the evolution of economic systems. Nature.
* Source identified: Arthur's actual 2021 publication is titled **"Foundations of Complexity Economics"**, published in **Nature Reviews Physics**, vol. 3, pp. 136–145 — not simply "Nature," and not under the title given
* Source exists: YES (a genuine 2021 Arthur paper exists), but title/venue as cited are inaccurate
* Source verified: PARTIAL
* Current URL: https://www.nature.com/articles/d41586-021-02107-2
* URL works: UNCERTAIN (auth redirect loop)
* URL points to correct source: LIKELY NO — the "d41586" DOI prefix is Nature's standard prefix for News/Comment pieces, not Nature Reviews Physics research articles (which use "s42254"), strongly suggesting this URL points to an unrelated Nature news item
* Preferred URL: https://www.nature.com/articles/s42254-020-00273-3
* Formatting consistent with post2.html: PARTIAL
* Action required: Correct title to "Foundations of complexity economics," venue to "Nature Reviews Physics," and replace the URL
* Confidence: LOW (title/venue/URL) / MEDIUM (that a genuine 2021 Arthur paper on this topic exists)

### Claims requiring verification

#### Claim 1
* Claim: QWERTY, fossil-fuel reliance, and educational structures are residue of historical contingencies reinforced by network effects
* Location: Paragraph 2
* Source found: Standard path-dependence/lock-in literature (Paul David's QWERTY paper, 1985)
* Verification: Broadly accurate, though the QWERTY-as-proof-of-inefficiency framing has been challenged in the literature (Liebowitz & Margolis)
* Confidence: MEDIUM
* Action: Consider softening the claim or noting the debate

#### Claim 2
* Claim: "The 1969 Moon landing stands as a paradigmatic example [of breaking path dependence]"
* Location: Paragraph 3
* Source found: Apollo 11, July 20, 1969
* Verification: Date correct; framing is the author's own interpretive claim
* Confidence: HIGH (date); N/A (interpretive framing)
* Action: None

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None
* Numbering issue: None
* Raw URL: None
* Other: `<sup>[N]</sup>` markers not hyperlinked. No inline hyperlinks in prose. Two of three references (2 and 3) have title/venue accuracy problems — the most substantive sourcing issue in this post.

---

## `posts/post19.html`

### Metadata
* Title: Short Selling: The Market's Unloved Watchdog
* Date: January 22, 2025
* References found: 1
* Hyperlinks found: 1 inline citation link — the only post in the batch that correctly hyperlinks its citation marker, matching post2's style
* References section exists: YES

### References

#### Reference [1]
* Current text: "Staley, K. (1997). The Art of Short Selling. John Wiley & Sons."
* Source identified: Kathryn F. Staley, same title, John Wiley & Sons — confirmed via Wiley's product page, Internet Archive, and multiple bookseller listings (ISBN 9780471146322)
* Source exists: YES
* Source verified: PARTIAL — book confirmed real; publication year disputed. Most retailer/library records (Amazon, Wiley, AbeBooks) list **December 1996**, though some library catalogs list 1997.
* Current URL: (none provided — no hyperlink)
* URL works: N/A
* URL points to correct source: N/A
* Preferred URL: https://archive.org/details/artofshortsellin00stal or https://www.wiley.com/en-us/the-art-of-short-selling-p-9780471146322
* Formatting consistent with post2.html: PARTIAL — Author/Year/Title/Publisher format matches, but no link at all
* Action required: Add a URL; verify/reconcile 1996 vs. 1997
* Confidence: MEDIUM (book/author/publisher HIGH; exact year LOW-MEDIUM)

### Claims requiring verification

#### Claim 1
* Claim: Bill Ackman bet ~$1 billion against Herbalife in December 2012 via a lengthy slide presentation ("300-slide deck")
* Location: "Case Study #1 — Ackman vs. Icahn (Herbalife)"
* Source found: Multiple business-press sources confirm December 20, 2012, ~$1B (20 million shares), and a deck widely reported as 334 slides
* Verification: CONFIRMED (core facts); the "300-slide" figure is an approximation of the commonly reported 334
* Confidence: MEDIUM-HIGH
* Action: Consider correcting to ~334 slides, or hedge as "300+"

#### Claim 2
* Claim: Icahn took the opposite side, clashed with Ackman on CNBC; Ackman closed his position in 2018 at a loss
* Location: Same case study
* Source found: CNN Money, "Bill Ackman's Herbalife disaster is finally over" (March 2018)
* Verification: CONFIRMED
* Confidence: MEDIUM-HIGH
* Action: None major; see quotation note below

#### Claim 3
* Claim: Hindenburg Research's January 2023 report accused Adani of "the largest corporate con in history"; Adani lost over $100 billion
* Location: "Case Study #2 — Hindenburg vs. Adani Group"
* Source found: Multiple sources confirm the January 24, 2023 report and loss figures in the $100–150 billion range
* Verification: CONFIRMED
* Confidence: HIGH
* Action: None

#### Claim 4
* Claim: Wirecard's 2020 collapse revealed €1.9 billion missing from its accounts
* Location: "Case Study #3 — Wirecard"
* Source found: Multiple sources confirm this figure and the June 2020 timeline
* Verification: CONFIRMED
* Confidence: HIGH
* Action: None

#### Claim 5
* Claim: Jim Chanos on Enron; Carson Block on Luckin Coffee/Sino-Forest; Andrew Left on Valeant/Jumia
* Location: "Who's Who" aside box
* Source found: General financial-press consensus
* Verification: Broadly accurate, not individually re-verified against primary sources
* Confidence: MEDIUM
* Action: None required, but none of these are cited to any source

### Quotations

#### Quote 1
* Quotation: "You are a crybaby in the schoolyard!" (attributed to Carl Icahn on CNBC)
* Attribution: Carl Icahn, live CNBC interview, January 2013
* Original source: Widely repeated in financial press coverage of the Icahn/Ackman CNBC exchange
* Verified: UNCERTAIN — not independently re-verified word-for-word against a transcript; treat as REQUIRES MANUAL REVIEW
* Notes: Not cited to any source in the post

#### Quote 2
* Quotation: "...as Staley reminds us, sunlight is the best disinfectant."
* Attribution: Presented as something "Staley reminds us" (her own book)
* Original source: The phrase originates with **Louis Brandeis**, 1913 Harper's Weekly article "What Publicity Can Do" (later in *Other People's Money*, 1914)
* Verified: NO (as an original Staley formulation) — the phrase's original attribution is Brandeis, not Staley
* Notes: **Misattribution-by-omission** — the post should credit Brandeis directly or make the chain of attribution explicit

### Structural issues
* Missing References section: No
* Missing citation: Only 1 of many verifiable factual claims (Ackman/Herbalife, Hindenburg/Adani, Wirecard, all "Who's Who" attributions) is backed by a formal reference
* Orphan reference: None (the one reference is cited)
* Numbering issue: None
* Raw URL: None
* Other: Closest post in the batch to post2's inline-citation-link style, but under-cites relative to the density of checkable factual claims it makes.

---

## `posts/post20.html`

### Metadata
* Title: Self-Reference: The Foundation and the Limit of Intelligence
* Date: January 30, 2025
* References found: 10 (ref1–ref10)
* Hyperlinks found: 0 — every reference entry is plain, unlinked IEEE-style text
* References section exists: YES (but zero hyperlinks and zero inline `[N]` citation markers anywhere)

### References

#### Reference [1]
* Current text: K. Gödel, "Über formal unentscheidbare Sätze..." Monatshefte für Mathematik und Physik, vol. 38, pp. 173–198, 1931.
* Source identified: Gödel's 1931 incompleteness theorems paper
* Source exists: YES
* Source verified: YES — standard, correct bibliographic details
* Current URL: none
* Formatting consistent with post2.html: NO — IEEE numeric style, no hyperlink at all
* Action required: Add a hyperlink; not cited anywhere in prose
* Confidence: HIGH

#### Reference [2]
* Current text: A. Tarski, "The Concept of Truth in Formalized Languages," in Logic, Semantics, Metamathematics, Oxford: Clarendon Press, 1944.
* Source identified: The essay/collection is real, but the collection was published **1956**, not 1944 (Tarski's original Polish monograph was 1933; a related but distinct 1944 paper exists in Philosophy and Phenomenological Research — the post appears to conflate the two)
* Source exists: YES, but the year is wrong
* Source verified: PARTIAL
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: **Correct the year to 1956**, or correct the title/venue if the 1944 essay was intended
* Confidence: HIGH (that there is an error); MEDIUM (which correction was intended)

#### Reference [3]
* Current text: A. M. Turing, "On Computable Numbers..." Proc. London Math. Soc., vol. 42, pp. 230–265, 1936.
* Source identified: Standard citation for Turing's 1936 paper
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink; not cited in prose
* Confidence: HIGH

#### Reference [4]
* Current text: S. C. Kleene, "On Notation for Ordinal Numbers," J. Symb. Logic, vol. 3, pp. 150–155, 1938.
* Source identified: Kleene's 1938 paper — confirmed matching journal/volume/pages
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink; not cited in prose
* Confidence: HIGH

#### Reference [5]
* Current text: M. H. Löb, "Solution of a Problem of Leon Henkin," J. Symb. Logic, vol. 20, no. 2, pp. 115–118, 1955.
* Source identified: Löb's 1955 paper — standard, well-known citation
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink; not cited in prose
* Confidence: HIGH

#### Reference [6]
* Current text: D. R. Hofstadter, Gödel, Escher, Bach: An Eternal Golden Braid, New York: Basic Books, 1979.
* Source identified: Hofstadter's 1979 book — correct title, publisher, year
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink; not cited in prose
* Confidence: HIGH

#### Reference [7]
* Current text: B. Soares and F. Fallenstein, "Toward Idealized Decision Theory," MIRI Technical Report, 2014.
* Source identified: Real authors are **Nate Soares** ("N. Soares") and **Benja Fallenstein** ("B. Fallenstein") — the initials appear swapped/scrambled
* Source exists: YES, but author initials are wrong
* Source verified: PARTIAL
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: **Correct to "N. Soares and B. Fallenstein"**
* Confidence: HIGH

#### Reference [8]
* Current text: S. Garrabrant and B. Demski, "Embedded Agency," MIRI Technical Report, 2018.
* Source identified: Real co-author is **Abram Demski** ("A. Demski"), not "B. Demski"
* Source exists: YES, but an author initial is wrong
* Source verified: PARTIAL
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: **Correct to "S. Garrabrant and A. Demski"**
* Confidence: HIGH

#### Reference [9]
* Current text: T. Bolander, "Self-Reference and Logic," Technical Report, DTU Compute, 2005.
* Source identified: A matching essay by Thomas Bolander (dated August 22, 2005) was located on his DTU personal page, but it appears to be a personal essay/PDF rather than a formally issued DTU Compute technical report
* Source exists: YES
* Source verified: PARTIAL — venue attribution should be treated with caution
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Verify formal report status; consider linking https://www.imm.dtu.dk/~tobo/essay.pdf
* Confidence: MEDIUM

#### Reference [10]
* Current text: F. J. Varela, E. Thompson, and E. Rosch, The Embodied Mind: Cognitive Science and Human Experience, Cambridge: MIT Press, 1991.
* Source identified: Same — standard, correct citation
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink; not cited in prose
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "Gödel first revealed this duality in 1931, when he encoded a statement that effectively said, 'This statement is not provable.'"
* Location: Paragraph 2
* Source found: Standard account of Gödel's First Incompleteness Theorem
* Verification: CONFIRMED
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: "A few years later, Alan Turing showed an equivalent result... with the Halting Problem."
* Location: Paragraph 2
* Source found: Turing (1936), 5 years after Gödel (1931)
* Verification: CONFIRMED
* Confidence: HIGH
* Action: None

#### Claim 3
* Claim: "Tarski later complemented this result with his Undefinability Theorem..."
* Location: Paragraph 3
* Source found: Standard account
* Verification: CONFIRMED as an accurate statement of the theorem (citation year issue noted separately, ref2)
* Confidence: HIGH
* Action: None

#### Claim 4
* Claim: "Kleene's Recursion Theorem showed that every computable function can produce a description of itself..."
* Location: Paragraph 4
* Source found: Standard account
* Verification: CONFIRMED
* Confidence: HIGH
* Action: None

#### Claim 5
* Claim: Hofstadter's GEB reframes these results as a "strange loop"
* Location: Paragraph 5
* Source found: Hofstadter (1979)
* Verification: CONFIRMED — "strange loop" is indeed Hofstadter's central concept
* Confidence: HIGH
* Action: None

#### Claim 6
* Claim: "Löb's theorem formalizes this tension: if an agent assumes everything it can prove about its correctness is true, it risks endorsing falsehoods."
* Location: Paragraph 6
* Source found: Standard account, consistent with AI-safety self-trust literature (refs 7, 8)
* Verification: CONFIRMED as a reasonable characterization
* Confidence: MEDIUM-HIGH
* Action: None

### Quotations

#### Quote 1
* Quotation: "This statement is not provable."
* Attribution: Presented as a paraphrase of the Gödel sentence, not a direct quotation
* Original source: Paraphrase of Gödel (1931)
* Verified: YES as an accurate paraphrase (post does not claim this is a literal translation)
* Notes: Fine as written, clearly a paraphrase

### Structural issues
* Missing References section: No
* Missing citation: **Every one of the 10 references is an orphan** — not one `[N]` or `<sup>` marker exists anywhere in the article body
* Orphan reference: All 10
* Numbering issue: None in sequence (1–10, no gaps/duplicates)
* Raw URL: None (also zero hyperlinks at all — the most extreme case of deviation from post2's "link everything" convention)
* Other: IEEE numeric citation style rather than post2's APA-like style. Ref2 (Tarski) has a wrong year; ref7 (Soares/Fallenstein) has swapped author initials; ref8 (Garrabrant/Demski) has a wrong author initial.

---

## `posts/post21.html`

### Metadata
* Title: "Never Vote for a Lawyer: An Economic Argument Based on the Historical Evolution of Society"
* Date: November 13, 2024
* References found: 4
* Hyperlinks found: 4 (all in References; 0 inline)
* References section exists: YES

### References

#### Reference [1]
* Current text: Harari, Y. N. (2015). Sapiens: A Brief History of Humankind. Harper. [Link]
* Source identified: Yuval Noah Harari, same title, English ed., Harper, 2015
* Source exists: YES
* Source verified: PARTIAL (bibliographic facts correct; the specific product URL could not be fetched — blocked)
* Current URL: https://www.harpercollins.com/products/sapiens-yuval-noah-harari?variant=32205665865762
* URL works: UNCERTAIN
* URL points to correct source: UNCERTAIN
* Preferred URL: Publisher's canonical page, or ynharari.com
* Formatting consistent with post2.html: PARTIAL — bibliographic format matches, but bare "Link" text rather than hyperlinked title; no inline citation marker in prose
* Action required: Verify URL manually; align inline-citation style with post2
* Confidence: MEDIUM

#### Reference [2]
* Current text: Smith, A. (1776). The Wealth of Nations. W. Strahan and T. Cadell. [Link]
* Source identified: Adam Smith, 1776, originally printed for W. Strahan and T. Cadell
* Source exists: YES
* Source verified: YES
* Current URL: https://www.gutenberg.org/ebooks/3300
* URL works: YES — confirmed to be Project Gutenberg's edition
* URL points to correct source: YES
* Preferred URL: current URL is fine
* Formatting consistent with post2.html: PARTIAL — bare "Link" text; no inline citation marker
* Action required: None substantive; optionally restyle link and add inline citation marker
* Confidence: HIGH

#### Reference [3]
* Current text: Acemoglu, D., & Robinson, J. A. (2012). Why Nations Fail... Crown Business. [Link]
* Source identified: Same — bibliographic facts correct
* Source exists: YES
* Source verified: PARTIAL (URL broken)
* Current URL: https://www.penguinrandomhouse.com/books/220816/why-nations-fail-by-daron-acemoglu-and-james-a-robinson/
* URL works: **NO — HTTP 404** (confirmed via fetch)
* URL points to correct source: NO (dead link)
* Preferred URL: Current PRH catalog page for the book (needs re-lookup), or publisher's official page
* Formatting consistent with post2.html: PARTIAL
* Action required: Fix dead link (404)
* Confidence: HIGH (that the link is broken)

#### Reference [4]
* Current text: Lindsey, I. (2024). Breakneck: China's Quest to Engineer the Future. Wikipedia.
* Source identified: The actual book is by **Dan Wang**, published by W. W. Norton & Company in **August 2025** — not "Lindsey, I. (2024)"
* Source exists: YES (the book exists), but the cited "author" is WRONG
* Source verified: NO — attribution and year do not match; the reference cites Wikipedia as if it were the primary source rather than the book itself
* Current URL: https://en.wikipedia.org/wiki/Breakneck:_China%27s_Quest_to_Engineer_the_Future
* URL works: YES
* URL points to correct source: PARTIAL — legitimate Wikipedia article about the correct book, but the stated author/year are wrong
* Preferred URL: Cite the book directly (Dan Wang, W. W. Norton, 2025), optionally linking danwang.co/breakneck/
* Formatting consistent with post2.html: NO — post2 never cites Wikipedia as a primary source
* Action required: **Correct the author to Dan Wang and the year to 2025; cite the book itself**
* Confidence: HIGH (that the current attribution is wrong)

### Claims requiring verification

#### Claim 1
* Claim: "China provides a very different, modern illustration... a willingness to pursue institutional experimentation and rapid, sometimes breakneck, engineering..." (cited to ref4)
* Location: Paragraph 3
* Source found: Dan Wang, *Breakneck* (2025) — thesis is "America is run by lawyers, and China is run by engineers"
* Verification: The general characterization is consistent with the book's reported thesis, but the underlying reference misattributes authorship
* Confidence: LOW (opinion/synthesis claim; supporting reference is faulty)
* Action: Fix reference 4 attribution

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: Only reference [4] is ever cited inline; references [1], [2], [3] are never cited
* Orphan reference: References [1], [2], [3]
* Numbering issue: None
* Raw URL: None
* Other: Link text throughout is generic "Link" rather than hyperlinked title/author; no inline hyperlinks on proper nouns anywhere in the body.

---

## `posts/post25.html`

### Metadata
* Title: "Kolmogorov Complexity and Fractal Geometry: Information as Dimension"
* Date: October 26, 2025
* References found: 7
* Hyperlinks found: 0 (zero `<a href>` tags anywhere in the body or References)
* References section exists: YES

### References

#### Reference [1]
* Current text: A. N. Kolmogorov, "Three approaches to the quantitative definition of information," Problems of Information Transmission, 1965.
* Source identified: Same — journal, volume, year match multiple scholarly sources
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO — no hyperlink, no inline citation marker
* Action required: Add hyperlink; add inline citation marker
* Confidence: HIGH

#### Reference [2]
* Current text: G. J. Chaitin, Algorithmic Information Theory, Cambridge University Press, 1987.
* Source identified: Same — ISBN 0521343062
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink; add inline citation marker
* Confidence: HIGH

#### Reference [3]
* Current text: K. Falconer, Fractal Geometry: Mathematical Foundations and Applications, Wiley, 3rd ed., 2014.
* Source identified: Same — Wiley, 3rd ed., 2014
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink; add inline citation marker
* Confidence: HIGH

#### Reference [4]
* Current text: J. H. Lutz, "Dimension in complexity classes," in Proceedings of the 15th Annual IEEE Conference on Computational Complexity, 2000.
* Source identified: Same — confirmed
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink (e.g. arxiv.org/abs/cs/0203016); add inline citation marker
* Confidence: HIGH

#### Reference [5]
* Current text: E. Mayordomo, "A Kolmogorov complexity characterization of constructive Hausdorff dimension," Information Processing Letters, 84(1):1–3, 2002.
* Source identified: Same — volume, issue, pages match exactly, DOI 10.1016/S0020-0190(02)00343-5
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink; add inline citation marker
* Confidence: HIGH

#### Reference [6]
* Current text: J. Reimann, "Computability and fractal dimension," in New Computational Paradigms, Springer, 2008.
* Source identified: Reimann's work by this title is actually his **PhD thesis**, University of Heidelberg, 2004 — it is NOT a chapter in the 2008 Springer volume. The actual chapter on this topic in that book is by **E. Mayordomo**, "Effective Fractal Dimension in Algorithmic Information Theory."
* Source exists: YES (Reimann's thesis exists), but this citation conflates two different works/authors
* Source verified: NO
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: **Correct venue/attribution** — cite Reimann's actual 2004 Heidelberg thesis, or correctly cite Mayordomo's 2008 Springer chapter if that was intended
* Confidence: HIGH (that the current citation is incorrect)

#### Reference [7]
* Current text: B. Mandelbrot, The Fractal Geometry of Nature, W. H. Freeman, 1982.
* Source identified: Same — confirmed
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink; add inline citation marker
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: Definitions/formulas for Kolmogorov complexity, box-counting/Hausdorff dimension, and "for many computable self-similar fractals, dim_A(x) equals the classical Hausdorff dimension for 'typical' points"
* Location: Sections 1–3
* Source found: Standard, consistent with the cited literature (Mayordomo 2002, Lutz 2000, Reimann's thesis)
* Verification: Technically sound and consistent with the literature it cites (independent of the citation-attribution issues above)
* Confidence: MEDIUM
* Action: None required

#### Claim 2
* Claim: "The Mandelbrot iteration z_{n+1}=z_n^2+c has a very low description length, yet its boundary exhibits unbounded geometric intricacy."
* Location: Section 4
* Source found: Standard fact about the Mandelbrot set
* Verification: Not disputed
* Confidence: HIGH
* Action: None

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: **All seven references are never cited inline anywhere** — a complete breakdown of the citation-linking convention
* Orphan reference: All 7
* Numbering issue: None (sequential, but moot since none are cited)
* Raw URL: None (no URLs at all)
* Other: Zero hyperlinks anywhere in the document. Reference [6] contains a clear misattribution.

---

## `posts/post26.html`

### Metadata
* Title: "On the Information Bottleneck Principle"
* Date: November 15, 2025
* References found: 6
* Hyperlinks found: 3 (on refs 1, 4, 5 only; none inline)
* References section exists: YES

### References

#### Reference [1]
* Current text: N. Tishby, F. C. Pereira, and W. Bialek, "The Information Bottleneck Method," Proc. 37th Annual Allerton Conf., 1999. [arXiv]
* Source identified: Same — arXiv:physics/0004057; confirmed title/authors match
* Source exists: YES
* Source verified: YES
* Current URL: https://arxiv.org/abs/physics/0004057
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: PARTIAL — correct link, but bare "arXiv" text rather than hyperlinked title; no inline citation marker despite the concept being discussed extensively in prose
* Action required: Add inline citation marker; hyperlink the title text
* Confidence: HIGH

#### Reference [2]
* Current text: C. E. Shannon, "A Mathematical Theory of Communication," Bell System Technical Journal, vol. 27, pp. 379–423, 1948.
* Source identified: Same — canonical, extremely well-documented reference
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO — no hyperlink
* Action required: Add hyperlink; add proper inline citation marker
* Confidence: HIGH

#### Reference [3]
* Current text: R. Gilad-Bachrach, N. Tishby, and A. Navot, "The Clustering Information Bottleneck," in NIPS, 2002.
* Source identified: **No matching paper found.** The genuine paper co-authored by Gilad-Bachrach, Navot, and Tishby is "An Information Theoretic Tradeoff between Complexity and Accuracy," COLT/Kernel Workshop 2003 (LNCS vol. 2777) — different title, venue, year. Separately, the well-known IB clustering paper is Slonim & Tishby's "Agglomerative Information Bottleneck," NIPS 1999 — different authors entirely.
* Source exists: NO clear match found — this citation appears to conflate two distinct real papers
* Source verified: NO
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: **Correct or replace — does not match any real, verifiable publication as currently titled/dated/venued**
* Confidence: LOW (could not verify existence of the cited work as described)

#### Reference [4]
* Current text: A. Alemi, I. Fischer, J. Dillon, and K. Murphy, "Deep Variational Information Bottleneck," ICLR 2017. [arXiv]
* Source identified: Same — arXiv:1612.00410, confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://arxiv.org/abs/1612.00410
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: PARTIAL — bare "arXiv" link text; no inline citation marker
* Action required: Add inline citation marker; restyle link text
* Confidence: HIGH

#### Reference [5]
* Current text: N. Tishby and N. Zaslavsky, "Deep Learning and the Information Bottleneck Principle," 2015. [arXiv]
* Source identified: Same — arXiv:1503.02406, confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://arxiv.org/abs/1503.02406
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: PARTIAL — bare "arXiv" text; no inline `[5]` marker even though this exact work is discussed by name in Section 4
* Action required: Add inline citation marker at the point of discussion
* Confidence: HIGH

#### Reference [6]
* Current text: D. Barber and F. Agakov, "The IM Algorithm: A Variational Approach to Information Maximization," NIPS, 2003.
* Source identified: Same — confirmed via NeurIPS 2003 proceedings
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO — no hyperlink
* Action required: Add hyperlink; add inline citation marker
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "The Information Bottleneck (IB) principle... Introduced by Naftali Tishby and colleagues in 1999..."
* Location: Introductory paragraph
* Source found: Matches Reference [1]
* Verification: YES — consistent and well documented
* Confidence: HIGH
* Action: None; consider adding inline citation marker

#### Claim 2
* Claim: "Tishby and Zaslavsky (2015) proposed that deep neural networks learn representations that implicitly obey the IB principle."
* Location: Section 4 (Applications)
* Source found: Matches Reference [5]
* Verification: YES
* Confidence: HIGH
* Action: Add inline citation marker

#### Claim 3
* Claim: IB leads to "information bottleneck clustering" (implicitly tied to Reference [3])
* Location: Section 4, Clustering bullet
* Source found: Real IB clustering work exists (Slonim & Tishby, NIPS 1999), but Reference [3] as written does not correctly cite it
* Verification: PARTIAL — general claim true; specific citation unverifiable
* Confidence: LOW (citation) / MEDIUM (general claim)
* Action: Fix Reference [3]

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: No inline `[N]` markers appear anywhere in the prose despite 6 numbered references existing
* Orphan reference: All 6
* Numbering issue: Sequential 1–6, no gaps; moot since none cited in-text
* Raw URL: None
* Other: Only 3 of 6 references have any hyperlink at all. Reference [3] is the single most serious finding in this batch — could not be matched to a real publication.

---

## `posts/post27.html`

### Metadata
* Title: "Ambit Causality: Continuous Markov Blankets in Space–Time"
* Date: October 27, 2025
* References found: 6 (unordered `<ol>` list items, no `id="refN"` anchors — this post uses a "Further Reading" list, not post2's `id="refN"` scheme)
* Hyperlinks found: 2 (on the last two "Further Reading" items only)
* References section exists: YES, but titled "Further Reading" (not "References"), and citations in prose use unlinked author-year style ("Sokol & Hansen (2013)") rather than post2's numbered convention

### References

#### Reference [1]
* Current text: O.E. Barndorff-Nielsen & J. Schmiegel, Ambit Stochastics (Thiele Research Report 2015-03)
* Source identified: The actual report is titled **"Some Recent Developments in Ambit Stochastics"**, authored by **Ole E. Barndorff-Nielsen, Emil Hedevang, Jürgen Schmiegel, and Benedykt Szozda** — the title given is wrong and two of four actual authors (Hedevang, Szozda) are omitted
* Source exists: YES (the underlying report exists), but title and author list are both inaccurate
* Source verified: PARTIAL/NO
* Current URL: none (this entry is unlinked; the same document IS linked separately as item 6, creating an unintentional duplicate)
* Formatting consistent with post2.html: NO
* Action required: Correct title to "Some Recent Developments in Ambit Stochastics"; add missing co-authors; merge with/remove the duplicate (item 6)
* Confidence: HIGH (that title/authors as given are inaccurate)

#### Reference [2]
* Current text: O. Kallenberg, Foundations of Modern Probability
* Source identified: Olav Kallenberg, same title, Springer
* Source exists: YES
* Source verified: YES (author, title, publisher all correct; no specific edition claimed, so no mismatch)
* Current URL: none
* Formatting consistent with post2.html: NO — no hyperlink, year, or publisher given
* Action required: Add hyperlink, year, publisher
* Confidence: HIGH

#### Reference [3]
* Current text: J. Peters, D. Janzing, B. Schölkopf, Elements of Causal Inference
* Source identified: Same — MIT Press, 2017
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add hyperlink, year (2017), publisher (MIT Press)
* Confidence: HIGH

#### Reference [4]
* Current text: K. Friston, "Markov Blankets in the Brain," Nature Reviews Neuroscience (2019)
* Source identified: **No paper matching this exact title, sole authorship, journal, and year could be located.** Closest real works: Hipólito et al., "Markov blankets in the brain," Neuroscience & Biobehavioral Reviews (2021, multi-author, different journal); Friston et al., "Parcels and particles: Markov blankets in the brain," Network Neuroscience (2021); Kirchhoff et al., "The Markov blankets of life," J. R. Soc. Interface (2018); Friston, "The free-energy principle: a unified brain theory?," Nature Reviews Neuroscience (2010, correct journal, wrong title/year/topic).
* Source exists: NO clear match as titled/dated/venued/authored
* Source verified: NO
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: **Verify and correct — could not be matched to a real publication under the stated combination**
* Confidence: LOW (could not verify existence as described)

#### Reference [5]
* Current text: M. Sokol & N.R. Hansen, "Causal Interpretation of Stochastic Differential Equations," Annals of Statistics (2013), arXiv:1304.0217
* Source identified: The real authors are **Alexander Sokol** and Niels Richard Hansen, published in the **Electronic Journal of Probability**, vol. 19, article 100, 2014 (submitted 2013)
* Source exists: YES
* Source verified: NO as stated — first author's initial wrong ("M." should be "A."); journal wrong ("Annals of Statistics" should be "Electronic Journal of Probability"). The arXiv ID (1304.0217) is correct. **This same error is repeated in the post's own prose** ("Sokol and Hansen (Annals of Statistics, 2013)").
* Current URL: https://arxiv.org/abs/1304.0217
* URL works: YES
* URL points to correct source: YES — only the printed citation metadata is wrong
* Preferred URL: same, could add projecteuclid.org journal link
* Formatting consistent with post2.html: PARTIAL — working hyperlink, but author initial and journal name wrong
* Action required: **Correct "M. Sokol" to "A. Sokol"; correct "Annals of Statistics" to "Electronic Journal of Probability" in both the reference list and the body text where it recurs**
* Confidence: HIGH

#### Reference [6]
* Current text: "Ambit Stochastics — Thiele Reports (PDF)" (generic link text)
* Source identified: Same document as Reference [1] — Barndorff-Nielsen, Hedevang, Schmiegel & Szozda, "Some Recent Developments in Ambit Stochastics"
* Source exists: YES
* Source verified: YES (PDF loads and matches the report described)
* Current URL: https://data.math.au.dk/publications/thiele/2015/math-thiele-2015-03.pdf
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: NO — generic description as link text rather than Author/Year/Title; appears to be an unlabeled duplicate of Reference [1]
* Action required: Merge with Reference [1]; reformat with full author/year/title
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "This notion of intervention parallels the framework of Sokol & Hansen (2013), who defined post-intervention stochastic differential equations... interventions correspond to limits of discrete structural-equation models."
* Location: "Interventions on Regions" section
* Source found: Sokol & Hansen's paper does define post-intervention SDEs via coefficient modification
* Verification: PARTIAL — general description plausible; the specific "limits of discrete structural-equation models" claim was not independently verified against the full paper text
* Confidence: MEDIUM
* Action: Fix author initial/journal (ref 5); consider verifying the specific claim

#### Claim 2
* Claim: "The causal interpretation of SDEs developed by Sokol and Hansen (Annals of Statistics, 2013) showed that stochastic systems can admit well-defined post-intervention dynamics..."
* Location: "Ambit Causality in Today's World" section
* Source found: Same paper; journal is wrong
* Verification: NO (journal attribution incorrect, repeating the ref-5 error)
* Confidence: HIGH (that the journal name is wrong)
* Action: Correct "Annals of Statistics" to "Electronic Journal of Probability" here as well

#### Claim 3
* Claim: The "ambit causality" / Causal Ambit Blanket (CAB) framework is a novel extension of Sokol & Hansen's work to spatial fields
* Location: Throughout
* Source found: N/A — appears to be original synthesis by the post's author
* Verification: N/A (not a checkable external claim)
* Confidence: N/A
* Action: None (out of scope; flagged only for completeness)

### Quotations
None found.

### Structural issues
* Missing References section: Technically present but titled "Further Reading," not "References"; lacks `id="refN"` anchors
* Missing citation: In-text citations use unlinked author-year style rather than post2's numbered convention
* Orphan reference: References 2, 3, 4 (Kallenberg, Peters/Janzing/Schölkopf, Friston) are never mentioned in the body prose at all
* Numbering issue: No numbering scheme exists; note the likely unintentional duplicate between items 1 and 6
* Raw URL: None
* Other: Two clear factual errors (ref 5's author initial and journal name); one likely-fabricated/unverifiable reference (ref 4, Friston); one reference with wrong title and incomplete author list, duplicated (ref 1/ref 6). Most significant citation-accuracy problems in this batch.

---

## `posts/post28.html`

### Metadata
* Title: "Cybernetics: The Science of Systems and Control"
* Date: March 18, 2025
* References found: 5 ("Further Reading" list items; no `id="refN"` anchors)
* Hyperlinks found: 2 (one inline in prose — "complex systems" → Wikipedia; one in the list — final item, "Wikipedia: Cybernetics")
* References section exists: YES, but titled "Further Reading"

### References

#### Reference [1]
* Current text: Norbert Wiener, Cybernetics: Or Control and Communication in the Animal and the Machine (1948)
* Source identified: Same — 1st ed., Hermann & Cie / The Technology Press / John Wiley & Sons, 1948
* Source exists: YES
* Source verified: YES
* Current URL: none
* Formatting consistent with post2.html: NO — no hyperlink, no publisher
* Action required: Add hyperlink and publisher
* Confidence: HIGH

#### Reference [2]
* Current text: Ross Ashby, Introduction to Cybernetics
* Source identified: W. Ross Ashby, **"An** Introduction to Cybernetics," Chapman & Hall, London, 1956 — post omits the leading "An"
* Source exists: YES
* Source verified: PARTIAL — title slightly inaccurate; no year/publisher given
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Correct title to "An Introduction to Cybernetics"; add year (1956), publisher, hyperlink
* Confidence: HIGH

#### Reference [3]
* Current text: Heinz von Foerster, Understanding Understanding
* Source identified: Heinz von Foerster, *Understanding Understanding: Essays on Cybernetics and Cognition*, Springer, 2002 — post gives a shortened title
* Source exists: YES
* Source verified: PARTIAL — subtitle omitted; no year/publisher given
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add full title with subtitle, year, publisher, hyperlink
* Confidence: HIGH

#### Reference [4]
* Current text: Stafford Beer, Brain of the Firm
* Source identified: Same — Allen Lane The Penguin Press (1972, 1st ed.)
* Source exists: YES
* Source verified: YES (title/author correct; no edition claimed, so no mismatch, though ambiguous)
* Current URL: none
* Formatting consistent with post2.html: NO
* Action required: Add year, publisher, hyperlink
* Confidence: HIGH

#### Reference [5]
* Current text: "Wikipedia: Cybernetics"
* Source identified: en.wikipedia.org/wiki/Cybernetics
* Source exists: YES
* Source verified: YES — confirmed via fetch (page correctly describes the field, Wiener's role, 1947 coinage, 1948 book)
* Current URL: https://en.wikipedia.org/wiki/Cybernetics
* URL works: YES
* URL points to correct source: YES
* Preferred URL: fine as a general-audience supplementary link
* Formatting consistent with post2.html: PARTIAL — post2.html never lists Wikipedia itself as a formal numbered reference
* Action required: None critical; consider moving to a "See also" note
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "The term comes from the Greek kybernētēs... popularized in the 1940s by Norbert Wiener in his foundational book..."
* Location: Opening paragraph
* Source found: Confirmed via Wikipedia "Cybernetics" fetch — Wiener coined the term in 1947, popularized via his 1948 book; Greek etymology standard
* Verification: YES
* Confidence: HIGH
* Action: None (minor nuance: sources typically say Wiener *coined*, not merely *popularized*, the term)

#### Claim 2
* Claim: "Many concepts from cybernetics inspired contemporary areas such as systems biology, machine learning, and the study of complex systems."
* Location: "Cybernetics in Today's World" section
* Source found: General, well-established claim consistent with standard intellectual history
* Verification: Broad claim, consistent with mainstream understanding
* Confidence: MEDIUM
* Action: None required

### Quotations
None found.

### Structural issues
* Missing References section: Technically present but titled "Further Reading"; no `id="refN"` anchors
* Missing citation: No inline numbered citation markers appear anywhere
* Orphan reference: Ashby, von Foerster, and Beer are listed but never mentioned or drawn on anywhere in the body prose
* Numbering issue: No numbering scheme used; N/A
* Raw URL: None
* Other: Stylistically closest of the batch to a "further reading" list rather than a scholarly apparatus. Reference [2]'s title is slightly inaccurate.

---

## `posts/post29.html`

### Metadata
* Title: Cylindrical Semi-martingale OT, Measure Contiguity, and Large Financial Markets
* Date: January 14, 2026
* References found: 7
* Hyperlinks found: 7 reference links (+1 extra local PDF mirror on ref2, +1 inline "cf." link to #ref2)
* References section exists: YES

### References

#### Reference [1]
* Current text: Dolinsky, Y., & Soner, H. M. (2015). Martingale optimal transport in the Skorokhod space. Stochastic Processes and their Applications, 125(10), 3893-3931.
* Source identified: Same — confirmed via SSRN, EconPapers, arXiv:1404.1516
* Source exists: YES
* Source verified: YES
* Current URL: https://www.sciencedirect.com/science/article/pii/S0304414915001313
* URL works: PARTIAL (403 to bots; plausibly correct for human browsers, matches PII cross-check)
* URL points to correct source: YES
* Preferred URL: same, or arXiv mirror for open access
* Formatting consistent with post2.html: YES
* Action required: None; optionally add an open-access mirror
* Confidence: HIGH

#### Reference [2]
* Current text: Kabanov, Y., & Kramkov, D. (1994). Large Financial Markets: Asymptotic Arbitrage and Contiguity. Theory of Probability and its Applications, 39(1), 182-187.
* Source identified: Same — confirmed via mathnet.ru and epubs.siam.org
* Source exists: YES
* Source verified: YES
* Current URL: https://epubs.siam.org/doi/10.1137/1139009 (plus local PDF backup at posts/references/post29/KramkovKabanov1994.pdf, confirmed present, 755,736 bytes)
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: PARTIAL — post2 never bundles a local backup PDF alongside the primary link
* Action required: None critical
* Confidence: HIGH

#### Reference [3]
* Current text: Tsirelson, B. S. (2004). Nonclassical stochastic flows and continuous products. Probability Surveys, 1, 173-298.
* Source identified: Same — confirmed via projecteuclid fetch
* Source exists: YES
* Source verified: YES
* Current URL: https://projecteuclid.org/journals/probability-surveys/volume-1/issue-none/Nonclassical-stochastic-flows-and-continuous-products/10.1214/154957804100000042.pdf
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: YES
* Action required: None
* Confidence: HIGH

#### Reference [4]
* Current text: Jacod, J., & Shiryaev, A. N. (2003). Limit Theorems for Stochastic Processes (2nd ed.). Springer.
* Source identified: Same — confirmed via multiple secondary sources; the linked PDF (ETH library TOC scan) could not be text-extracted but downloads successfully
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://toc.library.ethz.ch/objects/pdf/e01_3-540-43932-3_01.pdf
* URL works: YES (~427KB download)
* URL points to correct source: LIKELY YES (ISBN fragment in URL matches 2nd-edition ISBN)
* Preferred URL: Consider linking to a library catalog record instead of a raw scanned TOC PDF
* Formatting consistent with post2.html: YES
* Action required: Optional — manually verify the PDF is the correct book's TOC
* Confidence: MEDIUM

#### Reference [5]
* Current text: Contiguity (probability theory). Wikipedia.
* Source identified: Wikipedia article "Contiguity (probability theory)" — accurately describes contiguity (Le Cam's concept)
* Source exists: YES
* Source verified: YES
* Current URL: https://en.wikipedia.org/wiki/Contiguity_(probability_theory)
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change; could add a primary citation (Le Cam 1960)
* Formatting consistent with post2.html: NO — omits author/year, bare Wikipedia title
* Action required: Reformat, or replace with a primary academic source
* Confidence: HIGH (existence/accuracy); MEDIUM (stylistic fit)

#### Reference [6]
* Current text: No free lunch with vanishing risk. Wikipedia.
* Source identified: Wikipedia article on NFLVR — accurately defines it and its link to the Fundamental Theorem of Asset Pricing
* Source exists: YES
* Source verified: YES
* Current URL: https://en.wikipedia.org/wiki/No_free_lunch_with_vanishing_risk
* URL works: YES
* URL points to correct source: YES
* Preferred URL: could cite Delbaen & Schachermayer (1994) directly
* Formatting consistent with post2.html: NO (same issue as ref 5)
* Action required: Same as ref 5
* Confidence: HIGH / MEDIUM

#### Reference [7]
* Current text: Sigma-martingale. Wikipedia.
* Source identified: Wikipedia article on sigma-martingales (Chou/Émery)
* Source exists: YES
* Source verified: YES
* Current URL: https://en.wikipedia.org/wiki/Sigma-martingale
* URL works: YES
* URL points to correct source: YES
* Preferred URL: could cite Chou (1977) or Émery (1978) directly
* Formatting consistent with post2.html: NO (same issue as refs 5/6)
* Action required: Same as ref 5
* Confidence: HIGH / MEDIUM

### Claims requiring verification

#### Claim 1
* Claim: Cylindrical semimartingales are defined entirely through their finite-dimensional projections and are crucial in SPDEs
* Location: "From Finite Dimensions to Cylindrical Semi-martingales" section
* Source found: Supported generally by ref [3] and standard stochastic-analysis literature
* Verification: Standard, textbook-level framing
* Confidence: MEDIUM
* Action: None required — expository framing, not a priority claim

#### Claim 2
* Claim: The Fundamental Theorem of Asset Pricing for large markets is equivalent to the existence of a contiguous family of equivalent martingale measures
* Location: "Applications in Large Financial Markets" section
* Source found: Connects to ref [2] and the general large-financial-markets literature
* Verification: Directionally consistent with Kabanov & Kramkov (1994), though the specific "iff" framing is the author's own synthesis
* Confidence: MEDIUM
* Action: None required — presented as author's own synthesis

#### Claim 3
* Claim: Open research questions posed in the final "Questions" box
* Location: Final highlighted box
* Source found: N/A — explicitly framed as open questions
* Verification: N/A
* Confidence: N/A
* Action: None

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: None
* Orphan reference: None — all 7 cited in-text
* Numbering issue: None — sequential, no gaps
* Raw URL: None
* Other: Refs 5–7 omit author/date (bare Wikipedia titles). Ref 2 uniquely bundles a local backup PDF. Minor typo in an h3 heading ("OVanishing Risk...").

---

## `posts/post30.html`

### Metadata
* Title: How to Organize an Unforgettable Hackathon
* Date: April 26, 2025
* References found: 0
* Hyperlinks found: 4 (all in a "Further Reading and Resources" list, not a formal References section)
* References section exists: **NO** — genuine structural gap. No `<section id="references">`, no numbered `id="refN"` list, and none of the four links are cited inline anywhere.

### References
Note: post30 has no formal reference list; the 4 items below are the "Further Reading and Resources" entries, evaluated as the only external sources in the post.

#### Reference [1] (unlabeled)
* Current text: "Hackathon Guide (A step-by-step guide by Joshua Tauberer)"
* Source identified: hackathon.guide, authored by Joshua Tauberer
* Source exists: YES
* Source verified: YES — fetch confirmed authorship and content
* Current URL: https://hackathon.guide/
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO — no author/year/venue format, no numbered apparatus
* Action required: Convert to a proper References section with `id="refN"` and inline citations
* Confidence: HIGH

#### Reference [2] (unlabeled)
* Current text: "MLH (Major League Hacking) Organizer Resources"
* Source identified: MLH's official organizer resource guide
* Source exists: YES
* Source verified: YES
* Current URL: https://guide.mlh.io (redirects 302 to https://guide.mlh.com/)
* URL works: YES (redirects to newer domain)
* URL points to correct source: YES
* Preferred URL: https://guide.mlh.com/ (avoids the extra redirect hop)
* Formatting consistent with post2.html: NO
* Action required: Update URL; add to a proper references section
* Confidence: HIGH

#### Reference [3] (unlabeled)
* Current text: "Devpost: Organizing a Hackathon"
* Source identified: Devpost's hackathon planning resources hub
* Source exists: YES
* Source verified: YES
* Current URL: https://info.devpost.com/guides
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: Add to a proper references section
* Confidence: HIGH

#### Reference [4] (unlabeled)
* Current text: "Wikipedia: Hackathon"
* Source identified: Wikipedia article "Hackathon"
* Source exists: YES
* Source verified: YES — confirmed the article's stated 24–48 hour duration matches the post's own claim
* Current URL: https://en.wikipedia.org/wiki/Hackathon
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: Add to a proper references section
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: "A hackathon is a sprint-like event... usually over 24-48 hours"
* Location: "What is a Hackathon?" section
* Source found: Wikipedia "Hackathon" (linked in Further Reading, but not cited at this specific claim)
* Verification: Confirmed
* Confidence: HIGH
* Action: Add an inline citation connecting this claim to the source

### Quotations
None found.

### Structural issues
* Missing References section: **YES — headline structural gap.** No `<section id="references">`, no `id="refN"` list, no inline citations anywhere despite 4 external sources being used.
* Missing citation: All specific/verifiable claims lack any inline citation
* Orphan reference: N/A (no formal reference list exists)
* Numbering issue: N/A
* Raw URL: None
* Other: All content besides the "Further Reading" list is general practical advice, not independently fact-checkable beyond the hackathon-duration claim.

---

## `posts/post31.html`

### Metadata
* Title: Quantum Chromodynamics: Unraveling the Strong Force
* Date: April 26, 2025
* References found: 5 (plain `<li>` items, none with `id="refN"`)
* Hyperlinks found: 4 (refs 1, 2, 4, 5; ref 3 has no link at all)
* References section exists: YES (present, but non-canonical formatting)

### References

#### Reference [1]
* Current text: Pich, A. (1995). Quantum chromodynamics. Reports on Progress in Physics, 58(6), 563-610.
* Source identified: DOI 10.1088/0034-4885/58/6/001 is real, but IOPscience metadata for this exact DOI gives the article's actual title as **"Chiral perturbation theory,"** not "Quantum chromodynamics." A. Pich did separately write lecture notes literally titled "QUANTUM CHROMODYNAMICS" (1994 Sorrento school, arXiv:hep-ph/9505231), but that work carries no Rep. Prog. Phys. 58(6) reference — the citation conflates two distinct Pich works.
* Source exists: YES (the DOI/journal article is real)
* Source verified: PARTIAL/NO — title mismatch confirmed
* Current URL: https://doi.org/10.1088/0034-4885/58/6/001
* URL works: YES
* URL points to correct source: NO, in the sense that the linked article's real title doesn't match the reference's stated title
* Preferred URL: Either correct the title to "Chiral perturbation theory" (keeping this DOI), or replace with the actual "Quantum Chromodynamics" lecture notes (arXiv:hep-ph/9505231)
* Formatting consistent with post2.html: NO — no `id="refN"`, no in-text citation
* Action required: **Fix title/source mismatch — a genuine citation error**
* Confidence: HIGH (on the mismatch)

#### Reference [2]
* Current text: "Lattice QCD resources: lqcd.web.cern.ch"
* Source identified: Purported CERN lattice-QCD resources page
* Source exists: **NO — dead link.** DNS lookup fails (`getaddrinfo ENOTFOUND lqcd.web.cern.ch`) both via HTTPS and HTTP
* Source verified: NO
* Current URL: https://lqcd.web.cern.ch/
* URL works: **NO (DNS does not resolve)**
* URL points to correct source: N/A
* Preferred URL: Wikipedia "Lattice QCD," CERN's PDG lattice-QCD review, or Martin Lüscher's lecture notes
* Formatting consistent with post2.html: NO
* Action required: **Replace dead link**
* Confidence: HIGH (on dead link)

#### Reference [3]
* Current text: Shifman, M. (2012). Quantum Chromodynamics and the Pomeron. Cambridge University Press.
* Source identified: **This appears to be a fabricated/incorrect attribution.** The book "Quantum Chromodynamics and the Pomeron" (Cambridge Lecture Notes in Physics) was written by **J. R. Forshaw and D. A. Ross**, not Shifman. Shifman's actual 2012 CUP book is titled "Advanced Topics in Quantum Field Theory: A Lecture Course." No book by this title under Shifman's authorship was found in any catalog searched. **Notably, the post's own embedded HTML comment claims "'Quantum Chromodynamics and the Pomeron' by M. Shifman does exist" — this in-file claim is itself incorrect.**
* Source verified: NO
* Current URL: (none provided)
* URL works: N/A
* URL points to correct source: N/A
* Preferred URL: If citing Forshaw & Ross's actual book: cambridge.org/core/books/quantum-chromodynamics-at-high-energy; if citing Shifman's real 2012 book, correct the title
* Formatting consistent with post2.html: NO (no link at all)
* Action required: **Correct author/title mismatch — the most serious citation error found across the entire audit**
* Confidence: HIGH (on the fabrication/mismatch)

#### Reference [4]
* Current text: Gross, D. J., & Wilczek, F. (1973). Ultraviolet behavior of non-abelian gauge theories. Physical Review Letters, 30(26), 1343–1346.
* Source identified: Same — one of the two Nobel-Prize-winning (2004) papers establishing asymptotic freedom, confirmed via ADS, APS DOI record
* Source exists: YES
* Source verified: YES
* Current URL: https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.30.1343
* URL works: PARTIAL (403 to bots; details independently confirmed correct)
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO (no `id="refN"`, no in-text citation)
* Action required: None on content; formatting only
* Confidence: HIGH

#### Reference [5]
* Current text: Politzer, H. D. (1973). Reliable perturbative results for strong interactions? Physical Review Letters, 30(26), 1346–1349.
* Source identified: Same — the companion asymptotic-freedom paper, confirmed via Caltech repository, APS DOI, Semantic Scholar
* Source exists: YES
* Source verified: YES
* Current URL: https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.30.1346
* URL works: PARTIAL (403 to bots; metadata independently confirmed)
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: None on content; formatting only
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: General QCD exposition (quarks, gluons, color charge, confinement, asymptotic freedom, quark-gluon plasma, LHC experiments)
* Location: Throughout the body
* Source found: Consistent with standard particle physics and refs 1, 4, 5 (none actually cited inline)
* Verification: Accurate at a textbook level
* Confidence: HIGH (general accuracy); MEDIUM on sourcing since no inline citations exist
* Action: Add inline citations connecting specific claims to refs 4/5

### Quotations
None found.

### Structural issues
* Missing References section: PARTIAL — section exists but with plain `<li>` items, no `id="refN"` anchors, and **zero inline superscript citations anywhere**
* Missing citation: All claims uncited inline
* Orphan reference: All 5 references are effectively orphaned
* Numbering issue: References unnumbered
* Raw URL: None (all use "Link" anchor text, itself a style inconsistency)
* Other: **The References section contains a leftover HTML comment with internal editorial/meta-commentary** ("Adversarially selected references... Factually cross-checked below...") that appears to be leftover audit/testing notes visible in the raw page source. This embedded comment's own fact-check claim about Reference [3] was investigated and found to be **incorrect** — recommend removing this comment from the live page and correcting/removing Reference 3.

---

## `posts/post32.html`

### Metadata
* Title: Generative Models: Foundations, Types, and Applications
* Date: November 13, 2024
* References found: 7 (plain `<li>` items, no `id="refN"`)
* Hyperlinks found: 7 (generic "Link" anchor text)
* References section exists: YES (present, non-canonical formatting)

### References

#### Reference [1]
* Current text: Kingma, D. P., & Welling, M. (2014). Auto-Encoding Variational Bayes. arXiv:1312.6114.
* Source identified: Same — confirmed via arXiv fetch
* Source exists: YES
* Source verified: YES
* Current URL: https://arxiv.org/abs/1312.6114
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO (formatting only)
* Action required: Formatting only
* Confidence: HIGH

#### Reference [2]
* Current text: Goodfellow, I. et al. (2014). Generative adversarial nets. NeurIPS, 27.
* Source identified: Same — confirmed via dblp, ACM DL, SciRP
* Source exists: YES
* Source verified: YES
* Current URL: https://papers.nips.cc/paper/2014/hash/5ca3e9b122f61f8f06494c97b1afccf3-Abstract.html
* URL works: **NO — dead link (HTTP 404).** NeurIPS proceedings have since moved to proceedings.neurips.cc
* URL points to correct source: N/A (dead)
* Preferred URL: Try proceedings.neurips.cc, or cite via DOI 10.5555/2969033.2969125 (ACM DL)
* Formatting consistent with post2.html: NO
* Action required: **Fix broken link — confirmed 404**
* Confidence: HIGH (on brokenness and on the paper's real existence/citation details)

#### Reference [3]
* Current text: Van den Oord, A. et al. (2016). Pixel Recurrent Neural Networks. ICML.
* Source identified: Same — arXiv:1601.06759, confirmed via arXiv
* Source exists: YES
* Source verified: PARTIAL (ICML 2016 venue well-established in citation record, not shown on the raw arXiv page)
* Current URL: https://arxiv.org/abs/1601.06759
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: None on content
* Confidence: HIGH

#### Reference [4]
* Current text: Radford, A., Narasimhan, K., Salimans, T., & Sutskever, I. (2018). Improving Language Understanding by Generative Pre-Training. OpenAI.
* Source identified: The GPT-1 technical report — canonical, widely-used URL for this paper (text extraction failed but file downloads)
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf
* URL works: YES
* URL points to correct source: LIKELY YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: None
* Confidence: MEDIUM

#### Reference [5]
* Current text: Dhariwal, P., & Nichol, A. (2021). Diffusion Models Beat GANs on Image Synthesis. NeurIPS.
* Source identified: Same — arXiv:2105.05233, confirmed
* Source exists: YES
* Source verified: PARTIAL (NeurIPS 2021 venue well-established, not shown on arXiv page itself)
* Current URL: https://arxiv.org/abs/2105.05233
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: None
* Confidence: HIGH

#### Reference [6]
* Current text: Oord, A. v. d., Dieleman, S., & Zen, H. (2016). WaveNet: A Generative Model for Raw Audio. arXiv:1609.03499.
* Source identified: Same — title confirmed via arXiv; full author list has 9 authors, this citation lists only the first 3 without "et al."
* Source exists: YES
* Source verified: PARTIAL — minor citation-completeness issue
* Current URL: https://arxiv.org/abs/1609.03499
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO; author-list truncation without "et al." is inconsistent with convention
* Action required: Consider adding "et al." after the third author
* Confidence: HIGH

#### Reference [7]
* Current text: Ramesh, A., Pavlov, M., Goh, G., et al. (2021). Zero-Shot Text-to-Image Generation. ICML.
* Source identified: Same (DALL-E paper) — arXiv:2102.12092, confirmed; "et al." properly used here unlike ref 6
* Source exists: YES
* Source verified: YES
* Current URL: https://arxiv.org/abs/2102.12092
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: None
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: General technical claims about GMMs, HMMs, VAEs, GANs, autoregressive models, and diffusion models as categories of generative models, and their applications
* Location: Throughout the body
* Source found: Consistent with the 7 references and general, well-established ML knowledge
* Verification: Standard and accurate at a survey level
* Confidence: HIGH
* Action: None required — no fabricated or inaccurate claims identified

### Quotations
None found.

### Structural issues
* Missing References section: PARTIAL — section exists but plain, unnumbered `<li>` items, no `id="refN"`, generic "Link" text
* Missing citation: Zero inline citations connecting specific claims to specific references
* Orphan reference: All 7 references technically orphaned from the prose
* Numbering issue: N/A
* Raw URL: None (generic "Link" anchor text)
* Other: One confirmed dead link (ref 2, GAN paper, 404). Reference 6 truncates a 9-author paper to 3 names without "et al."

---

## `posts/post33.html`

### Metadata
* Title: Understanding Representation Learning: Foundations and Frontiers
* Date: November 13, 2024
* References found: 5 (plain `<li>` items, no `id="refN"`)
* Hyperlinks found: 5 (generic "Link" anchor text)
* References section exists: YES (present, non-canonical formatting)

### References

#### Reference [1]
* Current text: Bengio, Y., Courville, A., & Vincent, P. (2013). Representation learning: A review and new perspectives. IEEE TPAMI, 35(8), 1798-1828.
* Source identified: Same — DOI 10.1109/TPAMI.2013.50 resolves correctly to the correct IEEE Xplore document
* Source exists: YES
* Source verified: YES
* Current URL: https://doi.org/10.1109/TPAMI.2013.50
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO (formatting only)
* Action required: Formatting only
* Confidence: HIGH

#### Reference [2]
* Current text: LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444.
* Source identified: Same — one of the most famous, widely-cited ML papers
* Source exists: YES
* Source verified: PARTIAL (Nature URL redirected to a login/paywall page during audit, not a broken link)
* Current URL: https://www.nature.com/articles/nature14539
* URL works: YES (access-gated, not broken)
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: None
* Confidence: HIGH

#### Reference [3]
* Current text: Mikolov, T., Chen, K., Corrado, G., & Dean, J. (2013). Efficient estimation of word representations in vector space. arXiv:1301.3781.
* Source identified: Same (original word2vec paper) — confirmed via arXiv
* Source exists: YES
* Source verified: YES
* Current URL: https://arxiv.org/abs/1301.3781
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: None
* Confidence: HIGH

#### Reference [4]
* Current text: Devlin, J., Chang, M. W., Lee, K., & Toutanova, K. (2019). BERT... NAACL-HLT.
* Source identified: Same — arXiv:1810.04805, confirmed
* Source exists: YES
* Source verified: PARTIAL (NAACL-HLT 2019 venue well-established, not shown on raw arXiv page)
* Current URL: https://arxiv.org/abs/1810.04805
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: None
* Confidence: HIGH

#### Reference [5]
* Current text: Chen, T., Kornblith, S., Norouzi, M., & Hinton, G. (2020). A Simple Framework for Contrastive Learning of Visual Representations. ICML.
* Source identified: Same (SimCLR) — arXiv:2002.05709, title/authors/venue all confirmed via arXiv
* Source exists: YES
* Source verified: YES
* Current URL: https://arxiv.org/abs/2002.05709
* URL works: YES
* URL points to correct source: YES
* Preferred URL: no change needed
* Formatting consistent with post2.html: NO
* Action required: None
* Confidence: HIGH

### Claims requiring verification

#### Claim 1
* Claim: General technical claims about representation learning — PCA, t-SNE, autoencoders, CNNs, transformers, self-supervised learning
* Location: Throughout the body
* Source found: Consistent with the 5 references and general, well-established ML knowledge
* Verification: Standard and accurate at a survey level; no contested claims identified
* Confidence: HIGH
* Action: None required

### Quotations
None found.

### Structural issues
* Missing References section: PARTIAL — same pattern as post32.html (plain `<li>`, no `id="refN"`, generic "Link" text)
* Missing citation: Zero inline citations
* Orphan reference: All 5 references technically orphaned from the prose
* Numbering issue: N/A
* Raw URL: None
* Other: **Cleanest post in the audit for reference accuracy** — all 5 references verified real, correctly attributed, and working; only issue is the systemic formatting gap shared with post32.html.

---

## `posts/post34.html`

### Metadata
* Title: "Stochastic Thermodynamics: Bridging Fluctuations and the Laws of Physics" (matches both `<title>` and `<h2>`)
* Date: November 13, 2024
* References found: 5 (plain `<li>` items, none carry `id="refN"`)
* Hyperlinks found: 5 (all in References; zero inline)
* References section exists: YES

**Note:** this post is not linked from `blog.html` and is not registered in `js/post-utilities.js` (`postData` or `postOrder`) — it appears to be an orphan post outside the site's navigation and related-posts system.

### References

#### Reference [1]
* Current text: Seifert, U. (2012). Stochastic thermodynamics, fluctuation theorems and molecular machines. Reports on Progress in Physics, 75(12), 126001.
* Source identified: Same — confirmed via direct IOPscience fetch
* Source exists: YES
* Source verified: YES
* Current URL: https://doi.org/10.1088/0034-4885/75/12/126001
* URL works: YES
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: PARTIAL — bare "Link" text rather than hyperlinked title; no `id`/inline citation
* Action required: Add `id="ref1"`, cite inline, use title as hyperlink anchor
* Confidence: HIGH

#### Reference [2]
* Current text: Jarzynski, C. (1997). Nonequilibrium equality for free energy differences. Physical Review Letters, 78(14), 2690–2693.
* Source identified: Same — the well-known Jarzynski equality paper
* Source exists: YES
* Source verified: YES
* Current URL: https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.78.2690
* URL works: PARTIAL (403 to bots; standard APS canonical URL pattern, matches independently-verified data)
* URL points to correct source: YES
* Preferred URL: same, or DOI
* Formatting consistent with post2.html: PARTIAL — same issues as ref [1]
* Action required: Same as ref [1]
* Confidence: HIGH

#### Reference [3]
* Current text: Crooks, G. E. (1999). Entropy production fluctuation theorem... Physical Review E, 60(3), 2721–2726.
* Source identified: Same — independently corroborated
* Source exists: YES
* Source verified: YES
* Current URL: https://journals.aps.org/pre/abstract/10.1103/PhysRevE.60.2721
* URL works: PARTIAL (403 to bots; standard, correct DOI pattern)
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: PARTIAL (same generic issues)
* Action required: Same as above
* Confidence: HIGH

#### Reference [4]
* Current text: Parrondo, J. M. R., Horowitz, J. M., & Sagawa, T. (2015). Thermodynamics of information. Nature Physics, 11(2), 131–139.
* Source identified: Same — author order, volume, pages, DOI all confirmed
* Source exists: YES
* Source verified: YES
* Current URL: https://doi.org/10.1038/nphys3230
* URL works: YES (redirects correctly to nature.com)
* URL points to correct source: YES
* Preferred URL: same
* Formatting consistent with post2.html: PARTIAL (same generic issues)
* Action required: Same as above
* Confidence: HIGH

#### Reference [5]
* Current text: Schmiedl, T., & Seifert, U. (2007). Efficiency of molecular motors at maximum power. EPL (Europhysics Letters), 81(2), 20003.
* Source identified: **Title/volume mismatch.** EPL 81, 20003 (2007) is actually titled "Efficiency at maximum power: An analytically solvable model for stochastic heat engines" (same authors). The paper actually titled "Efficiency of molecular motors at maximum power" is a *different* Schmiedl & Seifert paper, published as EPL 83, 30005 (2008), arXiv:0801.3743.
* Source exists: YES, but the citation conflates two distinct 2007/2008 papers
* Source verified: PARTIAL — URL/volume/issue given (81(2), 20003, 2007) is real but carries the WRONG title
* Current URL: https://iopscience.iop.org/article/10.1209/0295-5075/81/20003
* URL works: YES (confirmed live)
* URL points to correct source: NO — resolves to the "heat engines" paper, not "molecular motors at maximum power" as titled
* Preferred URL: If the "molecular motors" paper was intended: https://doi.org/10.1209/0295-5075/83/30005 (EPL 83, 30005, 2008). If the 2007 heat-engines paper was intended, correct the title text.
* Formatting consistent with post2.html: NO (title/URL mismatch on top of generic formatting issues)
* Action required: **Fix title/volume/URL mismatch — decide which of the two 2007/2008 papers was intended**
* Confidence: HIGH (mismatch); MEDIUM (which paper was truly intended)

### Claims requiring verification

#### Claim 1
* Claim: "Fluctuation theorems: Exact relations such as the Jarzynski equality and Crooks fluctuation theorem quantify the probability of entropy or work fluctuations, generalizing the Second Law to the single-molecule regime."
* Location: "Core Concepts" bullet list
* Source found: Matches refs [2] and [3]
* Verification: Standard, well-established physics
* Confidence: HIGH
* Action: None

#### Claim 2
* Claim: "Closely linked to the physics of information (e.g., Maxwell's Demon), the framework allows for a rigorous thermodynamic treatment of feedback and measurement at the nanoscale."
* Location: "Core Concepts" bullet list
* Source found: Matches ref [4]
* Verification: Standard characterization
* Confidence: HIGH
* Action: None

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: **YES** — none of the 5 references is ever cited inline
* Orphan reference: All 5
* Numbering issue: No `id="refN"` anchors exist on any `<li>`
* Raw URL: None
* Other: No inline hyperlinks anywhere in the prose. Reference list anchor text is the generic word "Link" rather than the article title. Ref [5] has a title/URL mismatch. Post not linked from blog.html / post-utilities.js.

---

## `posts/post35.html`

### Metadata
* Title (`<title>` tag): "'Bit': From Binary Digits to Tukey's Transformative Ideas"; `<h2>` heading: "Bit: From Binary Digits to Transformative Tools" — **does not match the `<title>` tag**
* Date: November 13, 2024
* References found: 6 (list items, none carry `id="refN"`; 2 of 6 have no hyperlink at all)
* Hyperlinks found: 8 total (4 inline in prose + 4 in References; refs 5–6 have no links)
* References section exists: YES (with malformed HTML — see below)

**Note:** not linked from `blog.html` and not registered in `js/post-utilities.js` at all (more orphaned from site navigation than postX.html, even though only postX was flagged by filename convention).

### References

#### Reference [1]
* Current text: "Bit - Wikipedia"
* Source identified: Wikipedia article "Bit" — confirms Tukey/1947 memo content
* Source exists: YES
* Source verified: YES (as a discovery aid, not itself a primary source)
* Current URL: https://en.wikipedia.org/wiki/Bit
* URL works: YES
* URL points to correct source: YES
* Preferred URL: a primary source (Shannon 1948) would be stronger for the coining claim
* Formatting consistent with post2.html: NO — no `id="ref1"`, no inline `[1]` citation; post2 avoids relying on Wikipedia as final authority
* Action required: Replace/supplement with a primary source; add `id`/inline numbering
* Confidence: MEDIUM (as a reference for a specific claim) / HIGH (that the URL works and is topically correct)

#### Reference [2]
* Current text: "John Tukey - Wikipedia"
* Source identified: Wikipedia article "John Tukey"
* Source exists: YES
* Source verified: Standard, well-known page (not independently re-fetched this session)
* Current URL: https://en.wikipedia.org/wiki/John_Tukey
* URL works: Presumed YES
* URL points to correct source: YES (by URL pattern)
* Preferred URL: Consider Brillinger (2002) or an institutional biographical memoir
* Formatting consistent with post2.html: NO; Tukey's name is never actually hyperlinked in the body text despite appearing repeatedly
* Action required: Add id/numbering; consider hyperlinking "John W. Tukey" on first mention
* Confidence: MEDIUM

#### Reference [3]
* Current text: "John W. Tukey: His Life and Professional Contributions (Annals of Statistics, 2002, Vol. 30, No. 6, 1535–1575, by David R. Brillinger, UC Berkeley)"
* Source identified: Same — independently confirmed via Project Euclid: journal, volume 30, issue 6, pages 1535–1575, year 2002 all match exactly
* Source exists: YES
* Source verified: YES
* Current URL: https://www.stat.berkeley.edu/~brill/papers/life.pdf
* URL works: YES (PDF downloads, 437KB)
* URL points to correct source: Very likely YES (author's own hosted copy)
* Preferred URL: same, or Project Euclid DOI page for stability
* Formatting consistent with post2.html: PARTIAL — best-formatted reference in this post, but still lacks `id="refN"` and inline `[N]`
* Action required: Add id/inline numbering; optionally swap to Project Euclid DOI
* Confidence: HIGH

#### Reference [4]
* Current text: "John Tukey Resources Compendium (Wharton)"
* Source identified: J. Michael Steele's Wharton course page — informal personal resource page, not an institutional archive
* Source exists: YES
* Source verified: YES — fetched directly, confirms Tukey biographical claims including "he introduced the terms SOFTWARE and BIT"
* Current URL: http://www-stat.wharton.upenn.edu/~steele/Courses/434/434Context/JohnTukey/IndexTukey.htm
* URL works: YES — **note: this same URL is used identically, with different anchor text, at least 3 times across the post**
* URL points to correct source: YES
* Preferred URL: same; consider archiving (Wayback Machine) given it's a legacy personal academic page
* Formatting consistent with post2.html: NO; URL reused 3x with different link text
* Action required: Consolidate/deduplicate the repeated inline uses; add id/inline citation
* Confidence: HIGH

#### Reference [5]
* Current text: "Cooley, J. W., & Tukey, J. W. (1965). An algorithm for the machine calculation of complex Fourier series. Mathematics of Computation, 19(90), 297-301."
* Source identified: Same — independently confirmed via ADS, SciRP, Semantic Scholar
* Source exists: YES
* Source verified: YES
* Current URL: **NONE — no hyperlink at all**
* Preferred URL: https://doi.org/10.1090/S0025-5718-1965-0178586-1
* Formatting consistent with post2.html: NO — post2 gives every reference a working hyperlink; this one has none
* Action required: Add a hyperlink
* Confidence: HIGH (bibliographic accuracy)

#### Reference [6]
* Current text: "Tukey, J. W. (1977). Exploratory Data Analysis. Addison-Wesley."
* Source identified: Same — standard, well-documented citation
* Source exists: YES
* Source verified: YES
* Current URL: **NONE — no hyperlink**
* Preferred URL: e.g. https://archive.org/details/exploratorydataa0000tuke
* Formatting consistent with post2.html: NO (missing link)
* Action required: Add a hyperlink
* Confidence: HIGH

### Claims requiring verification

#### Claim 1 — the flagged key claim
* Claim: "...he is credited with coining the convenient, clipped term 'bit' in a 1946 memo..."
* Location: Second paragraph
* Source found: Wikipedia "Bit" states the memo was dated **9 January 1947**; corroborated by Shannon's 1948 paper, which credits Tukey for the word
* Verification: **The claimed date is WRONG — the correct year is 1947, not 1946.** Attribution to Tukey (vs. Shannon or Wiener) is correct.
* Confidence: HIGH that the correct year is 1947; MEDIUM on exact memo provenance (primary memo itself not located, relying on well-corroborated secondary/tertiary sources)
* Action: **Correct "1946" to "1947" in the post text**

#### Claim 2
* Claim: "Along with James Cooley, Tukey invented the Fast Fourier Transform in 1965..."
* Location: "Fast Fourier Transform (FFT)" bullet
* Source found: Confirmed via ref [5]
* Verification: The 1965 date is correct. (Historical nuance: Gauss worked out an equivalent algorithm ~1805, unpublished/unrecognized until 1985 scholarship — most popular accounts, including this one, omit this, which is not itself an error.)
* Confidence: HIGH
* Action: Optional caveat about the Gauss precedent

#### Claim 3
* Claim: "His book, Exploratory Data Analysis, was influential in teaching generations to 'let the data speak for themselves'"
* Location: "Exploratory Data Analysis (EDA)" bullet
* Source found: Ref [6]; general characterization standard
* Verification: The phrase is presented in quotation marks but is a paraphrase/common characterization rather than a verified direct quotation traceable to a specific page
* Confidence: LOW/UNCERTAIN on the quoted phrase specifically
* Action: Remove the quotation marks (treat as paraphrase) or cite the specific page if a direct quote is intended

### Quotations

#### Quote 1
* Quotation: "let the data speak for themselves"
* Attribution: Implicitly attributed to Tukey's EDA philosophy
* Original source: Not traced to a specific verbatim passage in Tukey (1977)
* Verified: UNCERTAIN
* Notes: Widely used paraphrase, not a documented direct quotation — treat with caution

### Structural issues
* Missing References section: No
* Missing citation: **YES** — no inline `<sup><a href="#refN">[N]</a></sup>` numbered citations exist anywhere
* Orphan reference: All 6 references are effectively orphaned relative to post2's convention
* Numbering issue: No `id="refN"` anchors on any `<li>`. Also, the References `<ol>` has **malformed/unclosed HTML**: item 3 (Brillinger PDF) is not properly closed with `</li>` before item 4 begins
* Raw URL: None (all links wrapped in anchor tags)
* Other: **Factual date error**: "1946" should be "1947." **Title/H2 mismatch.** Same Wharton URL reused three times with different link text. References [5] and [6] have no hyperlinks at all.

---

## `posts/postX.html`

### Metadata
* Title: "Mathematical Modelling in Stochastic Analysis and Finance" (matches `<h2>` and `<title>`; `<meta name="description">` says "Diogo Franquinho - Blog Post 1," suggesting this file may originally have been intended as "post1")
* Date: November 13, 2024
* References found: 30 (`id="ref1"`–`id="ref30"`, all properly anchored)
* Hyperlinks found: 30 (one per reference; zero inline hyperlinks in prose)
* References section exists: YES

**IMPORTANT STRUCTURAL/NAMING ANOMALY:** This file breaks the site's numeric naming convention (post1.html...post35.html). It is **not linked from `blog.html`** anywhere. It **is** registered in `js/post-utilities.js`'s `postData` object (line 147), which drives the "related posts" widget — but it is **absent from the `postOrder` array** that drives prev/next navigation, so its prev/next links are non-functional placeholders. This strongly suggests postX.html is an orphaned draft, possibly an early draft of what became "post1.html" (the current post1.html has a different title).

**MAJOR CITATION-CONSISTENCY ISSUE:** The prose only contains inline citations `[1]`–`[6]`. References `[7]`–`[30]` — 24 of the 30 listed references, 80% of the list — are **never cited anywhere in the body text**.

**MAJOR FABRICATION FINDINGS:** Several references could not be verified as real publications, and multiple references share suspiciously identical/duplicate placeholder identifiers (ISBNs, DOIs, OCLC numbers) with other, unrelated references in the same list — a strong signature of fabricated bibliographic entries.

### References

#### Reference [1]
* Current text: "Shreve, S. (1998). Brownian motion and stochastic calculus. Springer Science & Business Media."
* Source identified: The real book is Karatzas, I. & Shreve, S.E., *Brownian Motion and Stochastic Calculus*, Springer-Verlag, **1988**
* Source exists: YES (book real), but citation is WRONG
* Source verified: PARTIAL — URL correctly resolves to this book, but citation omits co-author **Ioannis Karatzas** and gives the wrong year (1998 instead of 1988)
* Current URL: https://link.springer.com/book/10.1007/978-1-4612-0949-2
* URL works: YES
* URL points to correct source: YES (book), but printed citation misattributes authorship/date
* Preferred URL: same; fix citation text
* Formatting consistent with post2.html: NO (author/year wrong)
* Action required: Correct author list (add Karatzas) and year (1988, not 1998)
* Confidence: HIGH

#### Reference [2]
* Current text: "Øksendal, B. (2003). Stochastic differential equations. Springer, Berlin, Heidelberg."
* Source identified: Same — confirmed via curl to resolve to a genuine Springer page
* Source exists: YES
* Source verified: YES
* Current URL: https://link.springer.com/chapter/10.1007/978-3-642-14394-6_5
* URL works: YES
* URL points to correct source: YES, though links to a specific chapter rather than the book as a whole
* Preferred URL: book-level DOI (978-3-642-14394-6)
* Formatting consistent with post2.html: PARTIAL (chapter- vs. book-level link mismatch)
* Action required: Point to the book-level DOI
* Confidence: HIGH

#### Reference [3]
* Current text: "Malliavin, P. (1997). Stochastic Analysis. Springer."
* Source identified: Same — standard reference, matches established records
* Source exists: YES
* Source verified: MEDIUM (not independently re-fetched this session)
* Current URL: https://link.springer.com/book/10.1007/978-3-642-59082-4
* Formatting consistent with post2.html: YES
* Action required: None identified
* Confidence: MEDIUM

#### Reference [4]
* Current text: "Villani, C. (2009). Optimal Transport: Old and New. Springer."
* Source identified: Same — well-established
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://link.springer.com/book/10.1007/978-3-540-71050-9
* Formatting consistent with post2.html: YES
* Action required: None identified
* Confidence: MEDIUM

#### Reference [5]
* Current text: "Keynes, J. M. (1936). The General Theory of Employment, Interest, and Money. Macmillan."
* Source identified: Same — extremely well-known work
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://www.marxists.org/reference/subject/economics/keynes/general-theory/
* Formatting consistent with post2.html: YES
* Action required: None required; optionally use a more neutral host
* Confidence: MEDIUM

#### Reference [6]
* Current text: "Filipovic, D. (2009). Term-Structure Models: A Graduate Course. Springer."
* Source identified: Same — independently confirmed via multiple bookseller/Springer listings
* Source exists: YES
* Source verified: YES
* Current URL: https://link.springer.com/book/10.1007/978-3-540-68013-0
* Formatting consistent with post2.html: YES
* Action required: None identified
* Confidence: HIGH

#### Reference [7]
* Current text: "Teichmann, J. (2019). Deep hedging. Quantitative Finance, 19(8), 1271-1291."
* Source identified: Real paper is Buehler, H., Gonon, L., **Teichmann, J.**, & Wood, B. (2019) — Teichmann is the third of four authors, not sole author
* Source exists: YES, but citation is WRONG
* Source verified: PARTIAL — journal/volume/issue/pages correct; lead author Buehler and co-authors Gonon/Wood omitted
* Current URL: https://www.tandfonline.com/doi/full/10.1080/14697688.2019.1571683
* URL points to correct source: YES (paper), author attribution wrong
* Formatting consistent with post2.html: NO (misattribution)
* Action required: Correct author list to "Buehler, H., Gonon, L., Teichmann, J., & Wood, B."
* Confidence: HIGH

#### Reference [8]
* Current text: "Wiener, N. (1948). Cybernetics: Or Control and Communication in the Animal and the Machine. MIT Press."
* Source identified: Jointly published 1948 by Technology Press (MIT)/John Wiley & Sons/Hermann & Cie; "MIT Press" is a reasonable modern shorthand but simplifies the actual joint imprint
* Source exists: YES
* Source verified: PARTIAL — reasonable simplification, not a hard error
* Current URL: https://mitpress.mit.edu/books/cybernetics
* Formatting consistent with post2.html: YES
* Action required: None strictly required
* Confidence: MEDIUM

#### Reference [9]
* Current text: "Sheraiv, A. (2023). Advanced Stochastic Processes. Academic Press."
* Source identified: **NOT FOUND.** No book, author, or publication matching "Sheraiv, A." could be located.
* Source exists: NO / UNCERTAIN — appears fabricated (possibly a corrupted rendering of "Shreve")
* Source verified: NO
* Current URL: https://www.elsevier.com/books/advanced-stochastic-processes/sheraiv/978-0-12-819550-5
* URL points to correct source: NO / UNCERTAIN — the ISBN (978-0-12-819550-5) is **identical** to reference [26]'s ISBN ("Fich, R., Advanced Topics in Stochastic Processes") — two different books cannot share an ISBN
* Action required: **Remove or replace this reference — likely fabricated**
* Confidence: LOW / appears FABRICATED

#### Reference [10]
* Current text: "Frechet, M. (1951). Les Espaces Abstraits. Gauthier-Villars."
* Source identified: M. Fréchet's real book is *Les espaces abstraits...*, Gauthier-Villars, Paris, **1928** (2nd printing 1943) — no 1951 edition found
* Source exists: YES, but the date is WRONG
* Source verified: PARTIAL
* Current URL: https://www.worldcat.org/title/les-espaces-abstraits/oclc/490123
* Action required: Correct the year to 1928 (or verify a specific later printing)
* Confidence: MEDIUM (book real) / LOW (specific year/OCLC as given)

#### Reference [11]
* Current text: "Von Neumann, J. (1958). The Computer and the Brain. Yale University Press."
* Source identified: Same — confirmed publisher, year (1958), posthumous publication
* Source exists: YES
* Source verified: YES
* Current URL: https://yalebooks.yale.edu/book/9780300181111/the-computer-and-the-brain/
* Note: **this same ISBN (9780300181111) is fraudulently reused in reference [29] (Gibbs) below**
* Action required: None on this entry itself (correct), but flag for cross-reference with ref [29]
* Confidence: HIGH

#### Reference [12]
* Current text: "Morgainstein, R. (2024). Quantum Finance: A New Paradigm. Quantum Press."
* Source identified: **NOT FOUND.** No author, book, or publisher matching this entry exists anywhere.
* Source exists: NO / UNCERTAIN — appears entirely fabricated
* Current URL: https://quantumpress.com/quantum-finance ("Quantum Press" does not appear to be a real academic or trade publisher)
* Action required: **Remove — appears fabricated**
* Confidence: LOW / appears FABRICATED

#### Reference [13]
* Current text: "Jean-Paul, E. (2022). Econophysics: A New Approach to Economics. Econophysics Journal, 15(3), 123-145."
* Source identified: **NOT FOUND.** No author, article, or journal called "Econophysics Journal" could be located (note: "Jean-Paul" is typically a first name, implausible as a surname here).
* Source exists: NO / UNCERTAIN — appears fabricated
* Current URL: https://econophysicsjournal.com/article/12345 (generic-looking article ID, unfamiliar journal domain)
* Action required: **Remove — appears fabricated**
* Confidence: LOW / appears FABRICATED

#### Reference [14]
* Current text: "Volterra, V. (1931). Leçons sur la Théorie Mathématique de la Lutte pour la Vie. Gauthier-Villars."
* Source identified: Same — real, foundational mathematical-biology text
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://www.worldcat.org/title/lessons-on-the-mathematical-theory-of-the-struggle-for-life/oclc/123456 — the OCLC number "123456" is a suspiciously generic/round placeholder
* Action required: Replace the OCLC placeholder with a verified library record
* Confidence: MEDIUM (book real) / LOW (URL/OCLC as given)

#### Reference [15]
* Current text: "Pearl, J. (2009). Causality: Models, Reasoning, and Inference. Cambridge University Press."
* Source identified: Same — well-known standard work
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://www.cambridge.org/core/books/causality/123456789 — suspiciously generic/sequential placeholder path
* Action required: Replace placeholder-looking URL with a verified one
* Confidence: MEDIUM (book real) / LOW (URL as given)

#### Reference [16]
* Current text: "Kantorovich, L. V., & Monge, G. (1942). On the Translocation of Masses. Journal of Mathematical Sciences, 1(1), 1-10."
* Source identified: The real paper is L.V. Kantorovich (**sole author**), "On the Translocation of Masses," Doklady Akademii Nauk SSSR, 37, 199–201 (1942); English reprint in Journal of Mathematical Sciences, vol. 133, no. 4, pp. 1381–1382 (2006), not volume 1.
* Source exists: YES (real Kantorovich paper), but this citation is **badly wrong**
* Source verified: NO — **Gaspard Monge died in 1818 and cannot be a co-author of a 1942 paper**; the volume/issue/pages given match neither the 1942 original nor the 2006 reprint
* Current URL: https://www.springer.com/journal/10958 (generic journal homepage, not a specific article)
* Action required: **Fix serious error** — remove Monge as co-author, correct volume/issue/pages, link to a specific article
* Confidence: HIGH that this citation is materially wrong (fabricated/confused co-authorship and data)

#### Reference [17]
* Current text: "Levy, P. (1954). Processus Stochastiques et Mouvement Brownien. Gauthier-Villars."
* Source identified: Real book, but 1st edition **1948**, 2nd edition **1965** — no 1954 edition located
* Source exists: YES, no 1954 edition found
* Source verified: PARTIAL
* Current URL: https://www.worldcat.org/title/stochastic-processes-and-brownian-motion/oclc/123456 — **identical placeholder OCLC number used in refs [14], [28], and [30]** — four different books cannot share the same OCLC number
* Action required: Correct the year (1948 or 1965) and replace the placeholder OCLC number
* Confidence: MEDIUM (book real) / LOW (year and URL as given)

#### Reference [18]
* Current text: "Ito, K. (1951). On Stochastic Differential Equations. Memoirs of the American Mathematical Society, 4, 1-51."
* Source identified: Same — real, foundational paper
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://www.ams.org/books/memo/004
* Action required: None identified
* Confidence: MEDIUM

#### Reference [19]
* Current text: "McKean, H. (1969). Stochastic Integrals. Academic Press."
* Source identified: Same — confirmed via Internet Archive and AMS Chelsea reprint records
* Source exists: YES
* Source verified: YES
* Current URL: https://www.elsevier.com/books/stochastic-integrals/mckean/978-0-12-123456-7 — ISBN contains the suspicious repeating "123456" sequence seen elsewhere, likely a fabricated/placeholder ISBN even though the book itself is real
* Preferred URL: https://archive.org/details/stochasticintegr0000mcke or AMS Chelsea reprint page
* Action required: Replace the placeholder ISBN/URL
* Confidence: HIGH (book real) / LOW (URL as given)

#### Reference [20]
* Current text: "Solomonoff, R. (1964). A Formal Theory of Inductive Inference. Information and Control, 7(1), 1-22."
* Source identified: Same — real, foundational algorithmic information theory paper
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://www.sciencedirect.com/science/article/pii/S0019995864900022
* Action required: None identified
* Confidence: MEDIUM

#### Reference [21]
* Current text: "Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444."
* Source identified: Real paper is **LeCun, Y.**, Bengio, Y., & Hinton, G. (2015) — **Yann LeCun (lead/first author) is omitted entirely**
* Source exists: YES, but citation is WRONG
* Source verified: PARTIAL — journal/volume/issue/pages correct, first author missing
* Current URL: https://www.nature.com/articles/nature14539
* Action required: Add LeCun as first author
* Confidence: HIGH

#### Reference [22]
* Current text: "Einstein, A. (1905). On the Movement of Small Particles Suspended in a Stationary Liquid. Annalen der Physik, 322(8), 549-560."
* Source identified: Same — standard, extremely well-documented citation
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://onlinelibrary.wiley.com/doi/10.1002/andp.19053220806
* Action required: None identified
* Confidence: MEDIUM

#### Reference [23]
* Current text: "Hairer, M. (2014). A Theory of Regularity Structures. Inventiones Mathematicae, 198(2), 269-504."
* Source identified: Same — well-known Fields Medal-associated paper
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://link.springer.com/article/10.1007/s00222-014-0505-4
* Action required: None identified
* Confidence: MEDIUM

#### Reference [24]
* Current text: "Lyons, T. (1998). Differential Equations Driven by Rough Paths. Revista Matemática Iberoamericana, 14(2), 215-310."
* Source identified: Real title is "Differential equations driven by rough **signals**," not "**paths**" — a wording discrepancy not conclusively resolved this session
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://www.ems-ph.org/journals/show_abstract.php?issn=0213-2230&vol=14&iss=2&rank=3
* Action required: Verify exact title wording ("signals" vs. "paths")
* Confidence: MEDIUM

#### Reference [25]
* Current text: "Nash, J. (1950). Equilibrium Points in N-Person Games. Proceedings of the National Academy of Sciences, 36(1), 48-49."
* Source identified: Same — real, famous paper
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://www.pnas.org/content/36/1/48
* Action required: None identified
* Confidence: MEDIUM

#### Reference [26]
* Current text: "Fich, R. (2023). Advanced Topics in Stochastic Processes. Academic Press."
* Source identified: **NOT FOUND.** No book, author, or publication matching this entry could be located.
* Source exists: NO / UNCERTAIN — appears fabricated
* Current URL: https://www.elsevier.com/books/advanced-topics-in-stochastic-processes/fich/978-0-12-819550-5 — **identical ISBN to reference [9]** ("Sheraiv, A.") — two different books sharing one ISBN is not possible
* Action required: **Remove or replace — appears fabricated**
* Confidence: LOW / appears FABRICATED

#### Reference [27]
* Current text: "Hvelmo, T. (2024). Stochastic Calculus for Finance. Springer."
* Source identified: **NOT FOUND.** No author "Hvelmo, T." or matching 2024 Springer title could be located. (Possibly a garbled reference to economist Trygve Haavelmo, who did not author this book.)
* Source exists: NO / UNCERTAIN — appears fabricated
* Current URL: https://link.springer.com/book/10.1007/978-3-642-14394-6 — **identical DOI to reference [2]'s** (Øksendal's book) — two different books sharing an identical DOI is impossible; this URL actually belongs to Øksendal's book
* Action required: **Remove — appears fabricated (and its URL is a duplicate of ref [2]'s)**
* Confidence: LOW / appears FABRICATED

#### Reference [28]
* Current text: "Tinbergen, J. (1939). Statistical Testing of Business-Cycle Theories. League of Nations."
* Source identified: Same — a real, famous early econometrics study
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://www.worldcat.org/title/statistical-testing-of-business-cycle-theories/oclc/123456 — again the identical generic OCLC placeholder seen in refs [14]/[17]/[30]
* Action required: Replace the placeholder OCLC number
* Confidence: MEDIUM (book real) / LOW (URL as given)

#### Reference [29]
* Current text: "Gibbs, J. W. (1902). Elementary Principles in Statistical Mechanics. Yale University Press."
* Source identified: Title/author/year essentially correct (Yale UP has published later reprints)
* Source exists: YES
* Source verified: PARTIAL
* Current URL: https://yalebooks.yale.edu/book/9780300181111/elementary-principles-in-statistical-mechanics/ — **ISBN identical to reference [11]'s** (Von Neumann) — two entirely different books cannot share an ISBN; this ISBN actually belongs to the Von Neumann book
* Action required: **Fix the duplicated ISBN/URL — currently points to the wrong book**
* Confidence: MEDIUM (underlying book real) / LOW (URL as given, confirmed duplicate of ref [11])

#### Reference [30]
* Current text: "Fisher, R. A. (1925). Statistical Methods for Research Workers. Oliver & Boyd."
* Source identified: Same — real, classic statistics text
* Source exists: YES
* Source verified: MEDIUM
* Current URL: https://www.worldcat.org/title/statistical-methods-for-research-workers/oclc/123456 — again the identical generic OCLC placeholder shared with refs [14]/[17]/[28]
* Action required: Replace the placeholder OCLC number
* Confidence: MEDIUM (book real) / LOW (URL as given)

### Claims requiring verification

#### Claim 1
* Claim: "This includes a detailed examination of stochastic differential equations (SDEs) and their role in describing the evolution of asset prices..."
* Location: Paragraph 2
* Source found: Ref [1] (mis-cited, see above)
* Verification: General claim standard; underlying citation has the author/year error noted
* Confidence: MEDIUM (claim); citation flawed
* Action: Fix ref [1]

#### Claim 2
* Claim: "We will also investigate the use of partial differential equations (PDEs) in option pricing and risk management"
* Location: Paragraph 2
* Source found: Ref [2] (Øksendal)
* Verification: Standard, correctly tied to a real relevant text
* Confidence: HIGH
* Action: None (minor chapter-vs-book URL fix noted above)

#### Claim 3
* Claim: Implicit framing that refs [7]–[30] support the project narrative
* Location: Entire References section vs. body text
* Source found: N/A — these 24 references are never invoked by any inline marker
* Verification: Cannot verify relevance; several entries also appear fabricated
* Confidence: UNCERTAIN
* Action: Either add inline citations tying refs [7]–[30] to specific claims, or trim the list to match post2.html's practice of a lean, fully-cited list

### Quotations
None found.

### Structural issues
* Missing References section: No
* Missing citation: **YES** — the prose only cites `[1]`–`[6]`; references `[7]`–`[30]` (24 of 30, 80%) are never cited
* Orphan reference: References `[7]`–`[30]`; several of these are also apparently fabricated
* Numbering issue: None in terms of `id`/ordering
* Raw URL: None (all use `<a>` tags)
* Other: **Systematic duplicate/placeholder identifier pattern**: identical fake OCLC "123456" reused across refs [14], [17], [28], [30]; identical ISBN "978-0-12-819550-5" reused across refs [9] and [26]; identical ISBN "9780300181111" reused across refs [11] and [29]; identical DOI/URL reused across refs [2] and [27]. This pattern across at least 8 references is a strong, systematic signature of fabricated bibliographic entries — the most severe finding of the entire audit. Zero inline hyperlinks in the prose. Naming/linkage anomaly (non-numeric filename, unlinked from blog.html, in postData but not postOrder) is consistent with this being an orphaned draft file.

---

## `posts/post36.html`

### Metadata
* Title: N/A
* Date: N/A
* References found: N/A
* Hyperlinks found: N/A
* References section exists: N/A

### Structural issues
* **This file is 0 bytes — completely empty.** It cannot be audited for content because there is none. It is not linked from `blog.html`. Recommend either populating it with intended content or removing the empty file (a decision for you, not made here since Phase 1 makes no changes).

---

# Notes on scope and methodology

* Every WebSearch/WebFetch/curl request performed during this audit was read-only. No `posts/*.html` file, CSS, JS, image, or configuration file was modified.
* URLs returning HTTP 403 to automated tools (JSTOR, ScienceDirect, APS, UNESCO, EPI, SSRN, and similar publisher/database platforms routinely block bots) were **not** treated as broken; where possible, the underlying bibliographic claim was cross-checked via independent search instead, and the confidence level reflects that distinction.
* Duplicate/near-duplicate post files (post1.html / post22.html / post23.html) and orphaned/unlinked files (post34.html, post35.html, postX.html, and the empty post36.html) were audited individually but are flagged here as a site-wide structural observation for you to weigh before Phase 2: several files exist that are not reachable from `blog.html`'s navigation at all.
* No blog post content, CSS, JavaScript, image, or configuration file was modified in the creation of this report — only this file (`reference-audit.md`) was created. See the `git status --short` output below, captured at the end of Phase 1.

---

# Phase 2 — Corrections applied (2026-08-11)

Following review and approval of the Phase 1 audit above, the documented fixes were applied directly to the affected posts. 29 of the 35 audited posts were edited (post2.html needed no changes as the canonical style reference; post4.html, post15.html, post16.html, post29.html, and post33.html needed no changes since their references were already verified accurate). post36.html remains empty and untouched.

**Reference-accuracy fixes applied:**
* Wrong author/year/title/venue corrected on ~25 reference entries across post1/22/23, post6, post8, post3, post9, post10, post12, post13, post18, post20, post21, post25, post26, post27, post28, post31, post34, post35, and postX.
* Broken (404/DNS-dead) or confirmed-wrong-destination links replaced with verified working URLs: post9 (3 links), post10, post11 (3 links), post21, post31, post32, postX (Kantorovich citation).
* **postX.html**: 5 apparently-fabricated references removed entirely (Sheraiv, Morgainstein, Jean-Paul, Fich, Hvelmo — none locatable anywhere), the remaining 25 references renumbered sequentially, the fabricated Kantorovich–Monge 1942 co-authorship corrected to sole Kantorovich authorship with a real DOI, and several placeholder/duplicate ISBN-OCLC-DOI identifiers removed or replaced with verified ones (refs formerly 11, 14, 15, 17, 19, 28, 29, 30).
* **post31.html**: fabricated "Shifman, Quantum Chromodynamics and the Pomeron" citation corrected to its real authors (Forshaw & Ross); the leftover internal audit-notes HTML comment was removed from the References section.
* **post17.html**: duplicate `id="ref4"` entry removed and the list renumbered sequentially (no ref6 gap remains).
* **post13.html**: dangling `[5]` citation with no corresponding reference removed from the prose.
* **post6.html**: fabricated/unverifiable SEP quotation converted to an unquoted paraphrase; unsupported Hamkins attribution removed from the prose; anachronistic "the global financial crisis" framing around the pre-2008 MacKenzie citation corrected.
* **post19.html**: "sunlight is the best disinfectant" reattributed from Staley to its actual originator, Louis Brandeis.
* **post35.html**: "1946 memo" corrected to the historically accurate "1947 memo" for Tukey's coining of "bit"; `<title>`/`<h2>` mismatch resolved; malformed unclosed `<li>` fixed.
* **post30.html**: converted from an untitled "Further Reading" list into a proper `References` section matching the site's numbered-citation convention, with one inline citation added.
* **post9.html**: two dead AMS links repaired (correct month-folder and archive.org fallback), Dieudonné citation corrected to its real 1970 publication year and venue.
* **post7.html**: case-mismatched local PDF href fixed (was at risk of 404ing on GitHub Pages' case-sensitive filesystem), wrong arXiv ID corrected.
* Citation markers (`<sup>[N]</sup>`) hyperlinked to their reference anchors across roughly a dozen posts that previously used unlinked plain-text markers, to match `post2.html`'s canonical style.
* post5.html: added `id="refN"` anchors and four inline citation markers tying its previously-orphaned reference list to the specific claims each source supports; swapped an unverifiable SSRN URL for the confirmed Springer DOI.

**Verification method:** every replacement or newly-added URL was checked with `curl`/`WebFetch` before being written; unverifiable suggestions were left as unlinked plain-text citations rather than guessed. A post-edit sweep confirmed zero duplicate `id="refN"` values, zero dangling `<sup><a href="#refN">` citations without a matching anchor, and clean HTML tag balance across all 29 modified files. Publisher domains that return HTTP 403 to automated tools (JSTOR, ScienceDirect, APS, AMS, ACM, PNAS, Wiley, Taylor & Francis, INFORMS) were not treated as broken, consistent with the bot-blocking pattern already documented throughout Phase 1.

**Deliberately not addressed** (out of scope for a citation-accuracy pass, flagged for a separate decision):
* The duplicate/near-duplicate post files (post1.html / post22.html / post23.html) were each fixed independently but not merged or deleted.
* postX.html, post34.html, and post35.html remain unlinked from `blog.html`'s navigation and `js/post-utilities.js`'s `postOrder`.
* post36.html remains an empty file.
* Full-prose inline hyperlinking of proper nouns (as seen in post2.html) was not retrofitted onto posts that never had it — this would constitute a larger stylistic rewrite beyond correcting citations, and was left as an optional future style pass.

