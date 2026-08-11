// Site analytics integration layer.
//
// This is the ONLY place analytics logic lives. Every HTML page loads this
// file (after js/analytics-config.js) and gets, in order:
//   1. the Umami tracking script, injected dynamically from config
//   2. a `page_view` event carrying page_type / post_id / post_title
//   3. scroll-depth tracking (scroll_50 / scroll_90) on post pages
//   4. delegated click tracking that classifies links into a small,
//      deliberate vocabulary of events
//
// See analytics/README.md for the full event vocabulary and the privacy
// boundaries this file respects.

(function () {
    'use strict';

    var config = window.ANALYTICS_CONFIG || {};

    // ---------------------------------------------------------------
    // Umami loading
    // ---------------------------------------------------------------

    // Injects the Umami script tag using the values from analytics-config.js.
    // Auto-tracking is disabled (data-auto-track="false") because we track
    // page_view ourselves, with post/page metadata attached. If no config
    // is present yet, `ready` still fires so the rest of the page behaves
    // normally — `track()` just becomes a silent no-op.
    function loadUmami(ready) {
        if (!config.umamiScriptUrl || !config.umamiWebsiteId) {
            ready();
            return;
        }
        var script = document.createElement('script');
        script.src = config.umamiScriptUrl;
        script.async = true;
        script.setAttribute('data-website-id', config.umamiWebsiteId);
        script.setAttribute('data-auto-track', 'false');
        script.onload = ready;
        script.onerror = ready; // never let a failed/blocked analytics load break the page
        document.head.appendChild(script);
    }

    // Sends a custom event to Umami if it has loaded; otherwise no-ops.
    // Never throws — analytics must never be able to break the site.
    function track(eventName, data) {
        try {
            if (window.umami && typeof window.umami.track === 'function') {
                window.umami.track(eventName, data || {});
            }
        } catch (e) {
            /* analytics must never break the page */
        }
    }

    // ---------------------------------------------------------------
    // Page classification
    //
    // Inferred entirely from the current URL and DOM — nothing needs to be
    // hard-coded per post/page.
    // ---------------------------------------------------------------

    var POST_PATH_RE = /\/posts\/(post[A-Za-z0-9_-]*)\.html$/i;

    function classifyPage() {
        var path = window.location.pathname;
        var page_type = 'other';
        var post_id = null;

        var postMatch = path.match(POST_PATH_RE);
        if (path === '/' || /(^|\/)index\.html$/.test(path)) {
            page_type = 'home';
        } else if (/\/blog\.html$/.test(path)) {
            page_type = 'blog';
        } else if (postMatch) {
            page_type = 'post';
            post_id = postMatch[1];
        } else if (/\/book_reviews\//.test(path)) {
            page_type = 'book_review';
        } else if (/\/books\//.test(path)) {
            page_type = 'books';
        } else if (/\/notes\//.test(path)) {
            page_type = 'notes';
        } else if (/\/teaching\.html$/.test(path)) {
            page_type = 'teaching';
        } else if (/\/talks\.html$/.test(path)) {
            page_type = 'talks';
        }

        return { page_type: page_type, post_id: post_id, post_title: getPageTitle() };
    }

    // Prefers og:title, then <title>, then <h1> — in that order, and only
    // uses whichever of those actually exists on the page.
    function getPageTitle() {
        var og = document.querySelector('meta[property="og:title"]');
        if (og && og.content && og.content.trim()) return og.content.trim();

        if (document.title && document.title.trim()) return document.title.trim();

        var h1 = document.querySelector('h1');
        if (h1 && h1.textContent && h1.textContent.trim()) return h1.textContent.trim();

        return null;
    }

    // ---------------------------------------------------------------
    // Reading depth (post pages only)
    // ---------------------------------------------------------------

    function initScrollTracking(pageInfo) {
        if (pageInfo.page_type !== 'post') return;

        var fired50 = false;
        var fired90 = false;
        var ticking = false;

        function checkDepth() {
            ticking = false;
            var scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            var viewport = window.innerHeight || document.documentElement.clientHeight;
            var fullHeight = document.documentElement.scrollHeight;
            if (fullHeight <= viewport) return; // page doesn't scroll; nothing to measure

            var percent = ((scrollTop + viewport) / fullHeight) * 100;

            if (!fired50 && percent >= 50) {
                fired50 = true;
                track('scroll_50', { post_id: pageInfo.post_id, post_title: pageInfo.post_title });
            }
            if (!fired90 && percent >= 90) {
                fired90 = true;
                track('scroll_90', { post_id: pageInfo.post_id, post_title: pageInfo.post_title });
            }
            if (fired50 && fired90) {
                window.removeEventListener('scroll', onScroll);
            }
        }

        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(checkDepth);
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        checkDepth(); // handles short pages that are already "90% visible" on load
    }

    // ---------------------------------------------------------------
    // Link classification (delegated click handling)
    // ---------------------------------------------------------------

    function normalizeHost(hostname) {
        return (hostname || '').replace(/^www\./i, '');
    }

    function extractPostId(pathname) {
        var m = pathname.match(POST_PATH_RE);
        return m ? m[1] : null;
    }

    // Trims free-text event fields to a sane length so we never ship large
    // or accidentally-identifying strings to the analytics backend.
    function truncate(text, max) {
        var clean = (text || '').replace(/\s+/g, ' ').trim();
        return clean.length > max ? clean.slice(0, max).trim() + '…' : clean;
    }

    function initLinkTracking(pageInfo) {
        document.addEventListener('click', function (event) {
            var link = event.target.closest ? event.target.closest('a[href]') : null;
            if (!link) return;

            var hrefAttr = link.getAttribute('href') || '';
            if (!hrefAttr || hrefAttr.charAt(0) === '#') return; // in-page anchors / disabled nav buttons
            if (/^(mailto:|tel:|javascript:)/i.test(hrefAttr)) return;

            var url;
            try {
                url = new URL(link.href, window.location.href);
            } catch (e) {
                return;
            }
            if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

            var isExternal = normalizeHost(url.hostname) !== normalizeHost(window.location.hostname);

            if (!isExternal) {
                // Another post/article — the internal "reading path" signal.
                var destinationPostId = extractPostId(url.pathname);
                if (destinationPostId) {
                    if (pageInfo.page_type === 'post' && destinationPostId !== pageInfo.post_id) {
                        track('related_post_click', {
                            source_post: pageInfo.post_id,
                            destination_post: destinationPostId
                        });
                    }
                    return;
                }

                // Navigating into the book-reviews section from elsewhere on the site.
                if (/\/book_reviews\//i.test(url.pathname) && pageInfo.page_type !== 'book_review') {
                    track('book_review_open', { source_page: pageInfo.page_type });
                    return;
                }

                return; // ordinary internal navigation (nav bar, footer, section jumps): not tracked
            }

            // External destination — classify before falling back to a generic click.
            var referencesContainer = link.closest('#references');
            if (referencesContainer) {
                track('reference_click', {
                    post_id: pageInfo.post_id,
                    reference_text: truncate(link.textContent, 140),
                    destination_domain: normalizeHost(url.hostname)
                });
                return;
            }

            var bookContainer = link.closest('.book-review, [data-book-title]');
            if (bookContainer) {
                var titleAttr = bookContainer.getAttribute('data-book-title');
                var titleEl = bookContainer.querySelector('h2');
                var bookTitle = titleAttr || (titleEl ? titleEl.textContent : link.textContent);
                track('book_click', {
                    book_title: truncate(bookTitle, 140),
                    source_page: pageInfo.page_type
                });
                return;
            }

            track('external_link_click', {
                destination_domain: normalizeHost(url.hostname),
                page_type: pageInfo.page_type
            });
        });
    }

    // ---------------------------------------------------------------
    // Init
    // ---------------------------------------------------------------

    document.addEventListener('DOMContentLoaded', function () {
        var pageInfo = classifyPage();

        // Listeners can attach immediately; track() is a safe no-op until
        // Umami finishes loading.
        initScrollTracking(pageInfo);
        initLinkTracking(pageInfo);

        loadUmami(function () {
            track('page_view', {
                page_type: pageInfo.page_type,
                post_id: pageInfo.post_id,
                post_title: pageInfo.post_title
            });
        });
    });
})();
