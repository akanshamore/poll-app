const Poll = require('../models/poll');

// Create Poll
const createPoll = async (req, res) => {
    if (req.user.role !== 'Institute') return res.status(403).send('Access Denied');
    const { title, options, targetRole } = req.body;

    const poll = new Poll({
        title,
        options: options.map(optionText => ({ optionText })),
        createdBy: req.user._id,
        targetRole,
    });

    try {
        const savedPoll = await poll.save();
        res.send(savedPoll);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Get Polls
const getPolls = async (req, res) => {
    try {
        let polls = []
        if (req.user.role === 'Institute') {
            polls = await Poll.find({});
        }
        else {
            polls = await Poll.find({ targetRole: req.user.role });
        }

        res.json(polls);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Vote on Poll
const voteOnPoll = async (req, res) => {
    const { pollId } = req.params;
    const { optionIndex } = req.body;

    try {
        const poll = await Poll.findById(pollId);
        if (!poll) return res.status(404).send('Poll not found');

        poll.options[optionIndex].votes += 1;
        await poll.save();
        res.send(poll);
    } catch (err) {
        res.status(400).send(err);
    }
};

module.exports = { createPoll, getPolls, voteOnPoll };
