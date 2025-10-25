# Blog Tag System Documentation

## Overview
This tag system allows users to filter blog posts by topics they're interested in. The system includes:

- **Visual tag buttons** for filtering
- **Post tags** displayed on each article
- **JavaScript filtering** functionality
- **Responsive design** for mobile devices

## How It Works

### 1. Tag Structure
Each blog post has:
- `data-tags` attribute on the `<article>` element containing comma-separated tag names
- Visual `<div class="post-tags">` with `<span class="post-tag">` elements

### 2. Available Tags
The current tag system includes:
- **Mathematics** - Posts about mathematical concepts, theories, and applications
- **Financial Mathematics** - Posts about finance, stochastic processes, and financial modeling
- **Education** - Posts about teaching, learning, and educational methodologies
- **Philosophy** - Posts about philosophical concepts and mathematical philosophy
- **Machine Learning** - Posts about AI, neural networks, and computational methods
- **Economics** - Posts about economic theory and applications
- **History** - Posts about historical developments and figures
- **Research** - Posts about research methodologies and academic work
- **Technology** - Posts about technology integration and computational tools
- **Society** - Posts about social issues, institutions, and societal development

### 3. User Interaction
- Click any tag button to filter posts by that topic
- Click multiple tags to show posts that match ANY of the selected tags (OR logic)
- Click "All Posts" to show all posts
- Click "Clear Filters" to reset all filters
- The filter info shows which tags are active and how many posts are visible

## Adding New Posts

### Step 1: Add Tags to Article
```html
<article data-tags="mathematics,philosophy">
    <h2>Your Post Title</h2>
    <!-- post content -->
    <div class="post-tags">
        <span class="post-tag">Mathematics</span>
        <span class="post-tag">Philosophy</span>
    </div>
</article>
```

### Step 2: Add New Tag Button (if needed)
If you need a new tag category, add it to the tag buttons section:
```html
<button class="tag-button" data-tag="new-tag">New Tag</button>
```

## Customization

### Adding New Tags
1. Add the tag button to the HTML
2. Use the tag name in `data-tags` attributes
3. Add corresponding `<span class="post-tag">` elements

### Styling
All tag-related styles are in `css/style.css` under the "Tag System Styles" section:
- `.tag-container` - Main container styling
- `.tag-button` - Filter button styling
- `.post-tag` - Individual post tag styling
- `.hidden` - Class for hiding filtered posts

### JavaScript Behavior
The filtering logic uses OR logic - posts matching ANY selected tag will be shown. To change this to AND logic, modify the `hasMatchingTag` condition in the `filterArticles()` function.

## Browser Compatibility
- Modern browsers with ES6 support
- Uses `querySelectorAll`, `addEventListener`, and `Set` objects
- Graceful degradation for older browsers (tags will still display, filtering won't work)

## Future Enhancements
- Add tag counts (e.g., "Mathematics (5 posts)")
- Add URL parameters for bookmarkable filtered views
- Add tag cloud visualization
- Add search functionality within filtered results
