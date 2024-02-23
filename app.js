const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('./models/blog'); // Ensure this path is correct based on your project structure
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoDb = process.env.MONGO_URI;

// Create connection
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection err:', err));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from 'public' directory (for CSS, JS, images, etc.)
app.use(express.static('public'));

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve index.ejs for the root route, including dynamic blog data
app.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch blogs from MongoDB
    res.render('index', { blogs }); // Pass blogs data to the index.ejs file
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching blog data');
  }
});

// Route to display the form for adding a new blog
app.get('/blog', (req, res) => {
  res.render('blog'); // Render the form for adding a new blog
});

// Route to handle the form submission for a new blog post
app.post('/blog', async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
    });

    await newBlog.save(); // Save the new blog to MongoDB
    res.render('blog', { message: 'Blog post succesfull!'});
   
  } catch (error) {
    console.error('Error saving new blog:', error);
    res.render('blog', { message: 'Failed to add new blog.'})
    res.status(500).send('Failed to add new blog');
  }
});

// Function to create route handlers for other EJS files
const servePage = (page) => (req, res) => {
  res.render(page); // Render the page without '.html'
};

// Define routes for other pages based on their names and expected URLs
const pages = [
  'about',
  'contact',
  'donation',
  'event',
  'event-single',
  'blog-single',
  'cause-single',
  'confirmation',
  'pricing',
  'service',
  'volunteer',
];

// Dynamically create routes for each page
pages.forEach(page => {
  app.get(`/${page}`, servePage(page));
});

// Catch-all for 404 Not Found responses
app.use((req, res) => {
  res.status(404).render('404'); // Use render for 404.ejs
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
