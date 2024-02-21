const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from 'public' directory (for CSS, JS, images, etc.)
app.use(express.static('public'));

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Function to create route handlers for other HTML files
const servePage = (page) => (req, res) => {
  res.sendFile(path.join(__dirname, 'views', `${page}.html`));
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
  'volunteer'
];

// Dynamically create routes for each page
pages.forEach(page => {
  app.get(`/${page}`, servePage(page));
});

// Catch-all for 404 Not Found responses
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
