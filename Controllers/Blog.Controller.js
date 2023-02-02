const BlogModel = require('../Models/Blog.Model.js');

module.exports.blogCount = async (req, res) => {
    try {
        const blogsCount = await BlogModel.countDocuments({});
        res.status(200).json({ success: true, message: "Successfully fetched all blogs", blogsCount });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};

module.exports.getAllBlogWithPegination = async (req, res) => {
    const page = parseInt(req.query.page);
    const count = parseInt(req.query.count);
    try {
        let blogs;
        if (page || count) {
            blogs = await BlogModel.find({}).skip(page * count).limit(count);
        } else {
            blogs = await BlogModel.find({});
        }
        res.send(blogs);
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};

module.exports.getBlogById = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await BlogModel.findById(id);
        res.send(blog);
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};