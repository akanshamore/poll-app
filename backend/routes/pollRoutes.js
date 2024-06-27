const express = require('express');
const { createPoll, getPolls, voteOnPoll } = require('../controllers/pollController');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.post('/', createPoll);
router.get('/', getPolls);
router.post('/vote/:pollId', voteOnPoll);

module.exports = router;
