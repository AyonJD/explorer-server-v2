const ThemeModel = require('../Models/Theme.Model.js');

module.exports.getTheme = async (req, res) => {
    try {
        const result = await ThemeModel.find();
        res.status(200).json({ success: true, message: "Successfully fetched all themes", result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};


module.exports.updateTheme = async (req, res) => {
    const { theme } = await req.body;
    const { id } = await req.params;
    try {
        const result = await ThemeModel.findOneAndUpdate({ _id: id }, { theme });
        res.status(200).json({ success: true, message: "Successfully updated theme", result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
}
