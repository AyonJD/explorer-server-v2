const UserModel = require('../Models/User.Model.js')
const jwt = require('jsonwebtoken');

module.exports.createUser = async (req, res) => {
    const { email, password, userName, role } = await req.body;

    const newUser = new UserModel({
        userName,
        email,
        password,
        role
    });

    try {
        const newInitilizer = await req.body.email;
        const userInitilizer = await req.body.userName;
        const roleInitilizer = await req.body.role;
        const isGoogleUserInitilizer = await req.body.isGoogleUser;
        const user = await UserModel.findOne({ email: newInitilizer });

        if (user && isGoogleUserInitilizer) {
            const accessToken = jwt.sign(req.body, process.env.TOKEN, { expiresIn: "1d" });
            res.status(200).json({ success: true, message: "Successfully created user", token: accessToken, result: { userName: userInitilizer, email: newInitilizer, role: roleInitilizer, id: user._id } });
        } else {
            const accessToken = jwt.sign(req.body, process.env.TOKEN, { expiresIn: "1d" });
            const result = await newUser.save();
            const { userName, email, _id } = result;
            res.status(200).json({ success: true, message: "Successfully created user", token: accessToken, result: { userName, email, role, id: _id } });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server errorrrr", error: err.message });
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const result = await UserModel.find();
        res.status(200).json({ success: true, message: "Successfully fetched all users", result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
}

module.exports.loginUser = async (req, res) => {
    const { email, password, userName } = await req.body;
    try {
        const user = await UserModel.findOne({ $or: [{ userName }, { email }] });
        const user_exclude_pass = await UserModel.findOne({ $or: [{ userName }, { email }] }, { password: 0 });
        // const id = user._id.toString().split('"')[0];

        if (user) {
            if (user.password === password) {
                const accessToken = jwt.sign(req.body, process.env.TOKEN, { expiresIn: "1d" });
                res.status(200).json({ status: 200, success: true, message: "Login successfully", token: accessToken, result: { user: user_exclude_pass } });
            } else {
                res.status(401).json({ status: 401, success: false, message: "Invalid password" });
            }
        } else {
            res.status(404).json({ status: 404, success: false, message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ status: 500, success: false, message: "Internal server error", error: err.message });
    }
}

module.exports.getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        // const result = await UserModel.findById(id);
        const user_exclude_pass = await UserModel.findOne({ _id: id }, { password: 0 });
        res.status(200).json({ success: true, message: "Successfully fetched single user", result: { user: user_exclude_pass } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
}

module.exports.updateUser = async (req, res) => {
    const { email } = req.params;
    const { role } = req.body;

    try {
        const result = await UserModel.findOneAndUpdate({
            email: email
        }, {
            role
        }, {
            new: true
        });
        res.status(200).json({ success: true, message: "Successfully updated user", result });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
}