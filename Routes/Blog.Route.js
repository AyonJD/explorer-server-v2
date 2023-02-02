const express = require('express');
const { blogCount, getAllBlogWithPegination } = require('../Controllers/Blog.Controller');
const router = express.Router();

router.get('/blogs-count', blogCount);
router.get('/', getAllBlogWithPegination);

module.exports = router;