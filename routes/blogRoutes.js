const express = require('express');
const Blog = require('../models/blog'); // Adjust the path as necessary
const router = express.Router();

// Display the form for adding a new blog at '/blog/new'
router.get('/new', (req, res) => {
    res.render('blog'); // Render the form located at 'views/blog.ejs'
});

// Handle form submission for adding a new blog at '/blog/new'
router.post('/new', async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
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

// Display all blog posts at '/blog/all'
router.get('/all', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render('all-blogs', { blogs }); // Ensure 'all-blogs.ejs' is in the 'views' directory
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching all blog data');
    }
});

module.exports = router;
