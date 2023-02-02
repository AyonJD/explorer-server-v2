const express = require('express');
const { blogCount, getAllBlogWithPegination, getBlogById, updateBlog } = require('../Controllers/Blog.Controller');
const router = express.Router();

router.get('/blogs-count', blogCount);
router.get('/', getAllBlogWithPegination);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.put('/:id', updateBlog);

module.exports = router;