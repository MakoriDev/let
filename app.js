const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoDb = process.env.MONGO_URI;

// Import the blogRoutes
const blogRoutes = require('./routes/blogRoutes'); // Adjust the path as necessary

// Create connection to MongoDB
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection err:', err));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use blogRoutes for any requests that start with '/blog'
app.use('/blog', blogRoutes);

// Serve index.ejs for the root route, including dynamic blog data
// Assuming you still want to show recent blogs on the homepage
app.get('/', async (req, res) => {
  const Blog = require('./models/blog'); // Ensure this path is correct
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);
    res.render('index', { blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching blog data');
  }
});

// Dynamically create routes for each page not covered by blogRoutes
const pages = [
  'about',
  'contact',
  'donation',
  'event',
  'event-single',
  'cause-single',
  'confirmation',
  'pricing',
  'service',
  'volunteer',
];

pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.render(page); // Render the page directly without '.html'
  });
});

// Catch-all for 404 Not Found responses
app.use((req, res) => {
  res.status(404).render('404'); // Use render for 404.ejs
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
