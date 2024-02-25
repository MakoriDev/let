const express = require('express');
const Blog = require('../models/blog'); // Adjust the path as necessary
const router = express.Router();

// Route to serve a list of blog posts or the main blog page
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render('index', { blogs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching blog data');
    }
});



// Route to display the form for adding a new blog
router.get('/blog', (req, res) => {
    res.render('blog');
});

// Route to handle the form submission for a new blog post
router.post('/blog', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.redirect('/'); // Redirect to the blog list or confirmation page
    } catch (error) {
        console.error('Error saving new blog:', error);
        res.status(500).send('Failed to add new blog');
    }
});

// Route to display an individual blog post
router.get('/blog-single/:id', async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).send('Blog post not found');
        }
        res.render('blog-single', { blog });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/all', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Fetch all blogs
        res.render('all-blogs', { blogs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching all blog data');
    }
});


module.exports = router;
