// Observatory data layer — DEMO DATA ONLY. Preserved prototype/reference
// implementation. analytics/data.js is the real, live implementation used
// by default; this file is only loaded when the dashboard is opened with
// ?demo=1, so the fabricated numbers here can never be mistaken for real
// analytics. See analytics/index.html for how the switch works.
//
// Every function here returns fabricated placeholder numbers. None of it
// comes from Umami. The shape of the data (not the numbers) is what
// mattered when this was the only implementation — analytics/index.html
// was written against this exact six-function API, which is why swapping
// in the real Worker-backed implementation didn't require touching the
// dashboard's markup or rendering code.
//
// Exposed as window.ObservatoryDemoData (not window.ObservatoryData) so it
// never silently shadows the real data layer.

(function () {
    'use strict';

    function demo(value) {
        // Small helper so every mock response is explicitly tagged as such
        // in its own data — not just in the UI copy around it.
        return Promise.resolve(Object.assign({ _source: 'demo' }, value));
    }

    function getOverview() {
        return demo({
            visitors: 1284,
            pageViews: 3910,
            postsRead: 742, // sessions that reached scroll_50 on a post
            referenceClicks: 96
        });
    }

    function getTopPosts() {
        return demo({
            posts: [
                { rank: 1, title: 'There is always an ε', postId: 'post17', views: 412, completionRate: 0.61 },
                { rank: 2, title: 'The weak law of poorly abbreviated large history', postId: 'post2', views: 337, completionRate: 0.54 },
                { rank: 3, title: 'Self-Reference: The Foundation and the Limit of Intelligence', postId: 'post20', views: 298, completionRate: 0.48 },
                { rank: 4, title: 'Grothendieck, von Neumann and Hilbert', postId: 'post9', views: 251, completionRate: 0.57 },
                { rank: 5, title: 'Mathematical Philosophy and Large Language Models', postId: 'post13', views: 219, completionRate: 0.44 }
            ]
        });
    }

    function getReadingMetrics() {
        return demo({
            scroll50Rate: 0.71,
            scroll90Rate: 0.39,
            // Umami's hosted/self-hosted API exposes an aggregate average
            // visit duration per site, but not a per-post median out of the
            // box — a per-post median session duration would need either a
            // custom Umami query or a small aggregation step of our own.
            // Not implemented — flagged rather than faked.
            medianSessionDuration: null
        });
    }

    function getReferenceClicks() {
        return demo({
            references: [
                { text: 'Principia Mathematica', domain: 'archive.org', clicks: 23 },
                { text: "Gödel's Incompleteness Theorems", domain: 'plato.stanford.edu', clicks: 19 },
                { text: 'Théorie de la spéculation (Bachelier, 1900)', domain: 'investmenttheory.org', clicks: 14 },
                { text: 'A Mathematical Theory of Communication', domain: 'ieeexplore.ieee.org', clicks: 11 },
                { text: 'The Lean Startup', domain: 'goodreads.com', clicks: 8 }
            ]
        });
    }

    function getReadingPaths() {
        return demo({
            paths: [
                { from: 'There is always an ε', to: 'Self-Reference: The Foundation and the Limit of Intelligence', count: 34 },
                { from: 'There is always an ε', to: 'Grothendieck, von Neumann and Hilbert', count: 21 },
                { from: 'Grothendieck, von Neumann and Hilbert', to: 'Book Reviews', count: 12 },
                { from: 'The weak law of poorly abbreviated large history', to: 'Mathematical Philosophy and Large Language Models', count: 9 }
            ]
        });
    }

    function getAcquisition() {
        return demo({
            sources: [
                { label: 'Google', share: 0.42 },
                { label: 'Direct', share: 0.27 },
                { label: 'LinkedIn', share: 0.14 },
                { label: 'X', share: 0.09 },
                { label: 'Other', share: 0.08 }
            ]
        });
    }

    window.ObservatoryDemoData = {
        getOverview: getOverview,
        getTopPosts: getTopPosts,
        getReadingMetrics: getReadingMetrics,
        getReferenceClicks: getReferenceClicks,
        getReadingPaths: getReadingPaths,
        getAcquisition: getAcquisition
    };
})();
