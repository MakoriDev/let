const express = require('express');
const router = express.Router();

module.exports = (pool) => {

    // Display the form for adding a new blog at '/blog/new'
    router.get('/new', (req, res) => {
        res.render('blog'); // Render the form located at 'views/blog.ejs'
    });

    // Handle form submission for adding a new blog at '/blog/new'
router.post('/new', async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const sql = 'INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)';
        
        // Save content as it is, without replacing newline characters
        await pool.query(sql, [title, content, author]);
        res.redirect('/blog/all'); // After adding, redirect to see all blogs
    } catch (error) {
        console.error('Error saving new blog:', error);
        res.status(500).send('Failed to add new blog');
    }
});


    // Display an individual blog post
    router.get('/blog-single/:id', async (req, res) => {
        try {
            const blogId = req.params.id;
            const sql = 'SELECT * FROM blogs WHERE id = ?';
            const [blogs] = await pool.query(sql, [blogId]);
            const blog = blogs[0];
            if (!blog) {
                return res.status(404).send('Blog post not found');
            }
    
            res.render('blog-single', { blog });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });
    
    


    // Display all blog posts at '/blog/all'
   // Display all blog posts at '/blog/all'
// Display all blog posts at '/blog/all'
router.get('/all', async (req, res) => {
    try {
        const sql = 'SELECT * FROM blogs ORDER BY createdAt DESC';
        const [blogs] = await pool.query(sql);

        // Convert newline characters to HTML paragraphs
        blogs.forEach(blog => {
            // Split the content into paragraphs based on newline characters
            // Then wrap each paragraph in <p> tags
            blog.content = blog.content.split("\n").map(paragraph =>
                `<p>${paragraph.trim()}</p>`).join('');
        });

        res.render('all-blogs', { blogs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching all blog data');
    }
});

    return router;
};
