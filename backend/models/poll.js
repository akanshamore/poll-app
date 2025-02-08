const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
    title: { type: String, required: true },
    options: [
        {
            optionText: { type: String, required: true },
            votes: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }]
        },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetRole: { type: String, required: true, enum: ['Teacher', 'Student'] },
});

module.exports = mongoose.model('Poll', PollSchema);
