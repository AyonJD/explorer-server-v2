const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
    theme: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const ThemeModel = mongoose.model("Theme", ThemeSchema);
module.exports = ThemeModel;