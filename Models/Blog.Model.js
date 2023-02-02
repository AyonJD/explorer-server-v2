const mongoose = require('mongoose');

const BlogSubSchema = new mongoose.Schema({
    title: String,
    category: String,
    desc: String,
    premium: String,
    tags: Array,
    img: String,
    date: String,
});

const UserSubSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    img: String,
});

const BlogSchema = new mongoose.Schema({
    blogs: [BlogSubSchema],
    signedInUser: UserSubSchema,
    likes: Array,
    comments: Array,
}, { timestamps: true });


const BlogModel = mongoose.model("Blog", BlogSchema);
module.exports = BlogModel;