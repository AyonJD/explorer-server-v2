const BlogModel = require('../Models/Blog.Model.js');

module.exports.blogCount = async (req, res) => {
    try {
        const blogsCount = await BlogModel.countDocuments({});
        res.status(200).json({ success: true, message: "Successfully fetched all blogs", blogsCount });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};
