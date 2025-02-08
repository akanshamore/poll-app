const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, phone, role, password, } = req.body;
    const user = new User({ name, email, phone, role, password, });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ name, email, phone, role, token, userId: user._id });
};

exports.login = async (req, res) => {
    const { email, password, } = req.body;
    const user = await User.findOne({ email });
    if (!user || password !== user.password) {
        return res.status(422).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.send({ name: user.name, email: user.email, phone: user.phone, role: user.role, token, userId: user._id });
};
