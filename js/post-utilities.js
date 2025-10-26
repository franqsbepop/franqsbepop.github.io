// Post utilities for reading time, table of contents, and more

// Calculate and display reading time
function calculateReadingTime() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const text = article.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    
    const readingTimeElement = document.getElementById('reading-time');
    if (readingTimeElement) {
        readingTimeElement.textContent = `${readingTimeMinutes} min read`;
    }
}

// Generate table of contents for long posts
function generateTableOfContents() {
    const article = document.querySelector('article');
    if (!article) return;
    
    const headings = article.querySelectorAll('h2, h3, h4');
    if (headings.length < 3) return; // Only generate TOC for posts with 3+ headings
    
    let tocHTML = '<div class="table-of-contents"><h3>Table of Contents</h3><ol>';
    let tocCount = 0;
    
    headings.forEach((heading, index) => {
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const level = heading.tagName.toLowerCase();
        const text = heading.textContent;
        const indent = level === 'h4' ? '20px' : (level === 'h3' ? '10px' : '0');
        
        tocHTML += `<li style="padding-left: ${indent}"><a href="#${heading.id}">${text}</a></li>`;
        tocCount++;
    });
    
    tocHTML += '</ol></div>';
    
    const tocContainer = document.getElementById('table-of-contents-container');
    if (tocContainer && tocCount > 0) {
        tocContainer.innerHTML = tocHTML;
    }
}

// Get post data for navigation
const postOrder = [
    'post1.html',
    'post2.html',
    'post3.html',
    'post4.html',
    'post5.html',
    'post6.html',
    'post7.html',
    'post8.html',
    'post9.html',
    'post10.html',
    'post11.html',
    'post12.html',
    'post13.html',
    'post14.html',
    'post15.html',
    'post16.html',
    'post17.html',
    'post18.html',
    'post19.html',
    'post20.html',
    'post21.html',
    'post22.html',
    'post23.html',
    'post25.html'
];

// Function to get current post index and adjacent posts
function getPostNavigation() {
    const currentPage = window.location.pathname;
    const currentPost = currentPage.split('/').pop();
    const currentIndex = postOrder.indexOf(currentPost);

    if (currentIndex === -1) return null;

    return {
        prev: currentIndex > 0 ? postOrder[currentIndex - 1] : null,
        next: currentIndex < postOrder.length - 1 ? postOrder[currentIndex + 1] : null,
        prevIndex: currentIndex - 1,
        nextIndex: currentIndex + 1
    };
}

// Back-to-top button behaviour
function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;

    button.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
}

// Post data for related posts
const postData = {
    'post1.html': { title: 'Learning via writing', tags: ['research', 'mathematics', 'machine-learning'], date: 'November 13, 2024' },
    'post2.html': { title: 'The weak law of poorly abbreviated large history', tags: ['finance', 'history', 'mathematics'], date: 'November 29, 2024' },
    'post3.html': { title: 'Reducing Bias in Education Evaluation', tags: ['education', 'economics', 'research'], date: 'December 7, 2024' },
    'post4.html': { title: 'Computational Methods in Education', tags: ['education', 'technology'], date: 'December 7, 2024' },
    'post5.html': { title: 'The Philosophy of Financial Markets', tags: ['philosophy', 'finance', 'ethics'], date: 'November 20, 2024' },
    'post6.html': { title: 'The Philosophy of Mathematics in Finance', tags: ['philosophy', 'mathematics', 'finance'], date: 'November 20, 2024' },
    'post7.html': { title: 'Brain-Computer Interfaces', tags: ['technology', 'neuroscience', 'ai'], date: 'December 10, 2024' },
    'post8.html': { title: 'Ethical Implications of Finance in Von Neumann Universes', tags: ['philosophy', 'mathematics', 'ethics'], date: 'November 27, 2024' },
    'post9.html': { title: 'Grothendieck, von Neumann and Hilbert', tags: ['mathematics', 'history'], date: 'November 27, 2024' },
    'post10.html': { title: 'Turing and Shannon: The Mathematical Foundations of Modern Computing', tags: ['mathematics', 'technology', 'history'], date: 'November 28, 2024' },
    'post11.html': { title: 'Mathematical Beauty and Taste', tags: ['mathematics', 'philosophy'], date: 'November 29, 2024' },
    'post12.html': { title: 'Leonard Euler', tags: ['mathematics', 'history'], date: 'December 1, 2024' },
    'post13.html': { title: 'Mathematical Philosophy and Large Language Models', tags: ['philosophy', 'machine-learning', 'mathematics'], date: 'December 2, 2024' },
    'post14.html': { title: 'The unreasonable effectiveness of mathematics: from Wigner to Karpathy', tags: ['philosophy', 'mathematics', 'machine-learning'], date: 'December 4, 2024' },
    'post15.html': { title: 'Econophysics: Bridging Economics and Physics', tags: ['economics', 'finance', 'mathematics'], date: 'December 15, 2024' },
    'post16.html': { title: 'Understanding Distributions', tags: ['mathematics', 'statistics', 'education'], date: 'December 20, 2024' },
    'post17.html': { title: 'There is always an ε', tags: ['mathematics', 'education'], date: 'January 15, 2025' },
    'post18.html': { title: 'Sticky Path Dependency', tags: ['society', 'economics', 'history'], date: 'January 22, 2025' },
    'post19.html': { title: "Short Selling: The Market's Unloved Watchdog", tags: ['finance', 'economics', 'markets'], date: 'January 22, 2025' },
    'post20.html': { title: 'Self-Reference: The Foundation and the Limit of Intelligence', tags: ['philosophy', 'mathematics', 'ai', 'logic'], date: 'January 29, 2025' },
    'post21.html': { title: 'Never vote for a lawyer', tags: ['society', 'economics', 'history'], date: 'November 13, 2024' },
    'post22.html': { title: 'Theoretical Foundations of Data-Driven Stochastic Modelling with Financial Market Applications', tags: ['research', 'mathematics', 'finance'], date: 'November 13, 2024' },
    'post23.html': { title: 'Theoretical Foundations of Data-Driven Stochastic Modelling with Financial Market Applications', tags: ['research', 'mathematics', 'finance'], date: 'November 13, 2024' },
    'post25.html': { title: 'Kolmogorov Complexity and Fractal Geometry', tags: ['mathematics', 'information-theory', 'fractal-geometry'], date: 'October 26, 2025' },
    'postX.html': { title: 'Mathematical Modelling in Stochastic Analysis and Finance', tags: ['research', 'mathematics', 'finance'], date: 'November 13, 2024' }
};

// Get related posts based on current post's tags
function getRelatedPosts(currentPost, maxPosts = 3) {
    if (!postData[currentPost]) return [];
    
    const currentTags = postData[currentPost].tags;
    const related = [];
    
    for (const [file, data] of Object.entries(postData)) {
        if (file === currentPost) continue;
        
        const commonTags = data.tags.filter(tag => currentTags.includes(tag));
        if (commonTags.length > 0) {
            related.push({
                file,
                title: data.title,
                date: data.date,
                commonTags: commonTags.length
            });
        }
    }
    
    // Sort by number of common tags, then by date
    related.sort((a, b) => {
        if (b.commonTags !== a.commonTags) return b.commonTags - a.commonTags;
        return new Date(b.date) - new Date(a.date);
    });
    
    return related.slice(0, maxPosts);
}

// Display related posts
function displayRelatedPosts() {
    const currentPost = window.location.pathname.split('/').pop();
    const relatedPosts = getRelatedPosts(currentPost, 4);
    const container = document.getElementById('related-posts-container');
    
    if (!container || relatedPosts.length === 0) return;
    
    let html = '<div class="related-posts"><h3>Related Posts</h3><div class="related-posts-list">';
    
    relatedPosts.forEach(post => {
        html += `<div class="related-post-item"><a href="${post.file}"><h4>${post.title}</h4></a><div class="post-date">${post.date}</div></div>`;
    });
    
    html += '</div></div>';
    container.innerHTML = html;
}

// Initialize all utilities
document.addEventListener('DOMContentLoaded', function() {
    calculateReadingTime();
    generateTableOfContents();
    displayRelatedPosts();

    const prevButton = document.getElementById('prev-post');
    const nextButton = document.getElementById('next-post');
    const nav = getPostNavigation();

    if (nav) {
        if (prevButton && nav.prev) {
            prevButton.href = nav.prev;
        } else if (prevButton) {
            prevButton.classList.add('disabled');
            prevButton.href = '#';
        }

        if (nextButton && nav.next) {
            nextButton.href = nav.next;
        } else if (nextButton) {
            nextButton.classList.add('disabled');
            nextButton.href = '#';
        }
    } else {
        if (prevButton) {
            prevButton.classList.add('disabled');
            prevButton.href = '#';
        }
        if (nextButton) {
            nextButton.classList.add('disabled');
            nextButton.href = '#';
        }
    }

    initBackToTop();
});
