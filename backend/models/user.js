const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    role: { type: String, required: true, enum: ['Teacher', 'Student', 'Institute'] },
    password: { type: String, required: true },
});


module.exports = mongoose.model('User', userSchema);
