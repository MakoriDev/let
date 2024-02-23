const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  // You can add more fields here
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
