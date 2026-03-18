# Admin Dashboard Guide

## Accessing the Admin Panel

Your CA Insights blog now has a fully functional admin dashboard for managing content.

### Login Credentials

- **URL**: `/admin/login` (or `http://localhost:3000/admin/login` in development)
- **Password**: Check your `.env.local` file for `ADMIN_PASSWORD`
- **Default Password**: `admin123` (change this in production!)

### Quick Start

1. Navigate to `/admin/login`
2. Enter your admin password
3. You'll be redirected to the dashboard at `/admin`

## Dashboard Features

### Overview Stats

The dashboard shows you at a glance:
- **Total Articles**: Total count of all posts
- **Published**: Number of live/visible articles
- **Drafts**: Number of unpublished articles

### Managing Articles

#### Create New Article

1. Click **"+ New Article"** button on the dashboard
2. Fill in the article details:
   - **Title**: Main heading of your article
   - **Excerpt**: Short summary (shown on blog listing cards)
   - **Content**: Write in Markdown format
   - **Date**: Publication date
   - **Tags**: Comma-separated topics (e.g., `income-tax, gst`)
   - **Author**: Your name
   - **Cover Image**: URL to a featured image
3. Use the formatting toolbar to insert Markdown shortcuts
4. Choose to **Save Draft** or **Publish** immediately

#### Edit Existing Article

1. Click **Edit** next to any article in the table
2. Make your changes
3. Save as draft or publish

#### Delete Article

1. Click **Delete** next to the article
2. Confirm the deletion (this cannot be undone!)

## Writing Articles

### Markdown Support

All articles are written in Markdown format. Here's what's supported:

```markdown
# Main Heading
## Section Heading
### Subsection

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Another item

> Blockquote or highlight

`inline code`

[Link text](https://example.com)
```

### Special Components

#### Callout Box (for important notes)

```markdown
<Callout type="info">
Your important note or highlight here.
</Callout>
```

Available types: `info`, `warning`, `success`, `error`

#### Tables

```markdown
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Security Tips

⚠️ **Important for Production**:

1. **Change the password** in `.env.local`:
   ```
   ADMIN_PASSWORD=your-secure-password-here
   ```

2. **Use a strong password** - at least 12 characters with mix of numbers, letters, and symbols

3. **Don't share** the admin URL or password publicly

4. **Session timeout** - Your login session persists. Use "Sign Out" when done

## Publishing Best Practices

### Before Publishing

- ✅ Check for typos and grammar
- ✅ Verify all links work
- ✅ Add a compelling cover image
- ✅ Include relevant tags for categorization
- ✅ Write a clear, engaging excerpt

### SEO Tips

- Use descriptive titles (35-60 characters)
- Include relevant keywords naturally
- Add 2-3 relevant tags
- Write summaries that hook readers
- Link to related articles when relevant

### Scheduling Content

Currently, articles are published immediately when you click "Publish". For future-dated articles:
1. Set the date you want it published
2. Save as Draft
3. Publish when ready

## Troubleshooting

### Can't log in?

- Verify the password matches `.env.local`
- Check if `.env.local` file exists in project root
- Try refreshing the page
- Clear browser cookies and try again

### Articles not appearing on blog?

- Check the **Status** column - must show "Published"
- Verify the date is set correctly
- Refresh the blog homepage (sometimes cache needs clearing)

### Lost your password?

Edit `.env.local` and update the `ADMIN_PASSWORD` value, then restart the dev server.

## Next Steps

- 📝 Write your first article!
- 🏷️ Organize posts with consistent tags
- 📊 Monitor which articles get the most engagement
- 🔄 Update older posts to keep content fresh

Happy writing!
