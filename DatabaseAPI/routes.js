const express = require('express');
const {
    getUsers, getUser, storeUsers,
    getChallenges, getChallenge, createChallenge,
    updateChallengeStatus, createTrashDetection,
    getTrashDetection, addPointsToUser
} = require('./database');

const router = express.Router();

// Users
// get all users
router.get('/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.send(users);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get users' });
    }
});

// get user by userId
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await getUser(userId);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ error: 'user not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to get user' });
    }
});

// store user
router.post('/storeUser', async (req, res) => {
    const { userId, email } = req.body;
    try {
        const result = await storeUsers(userId, email);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to insert User Data' });
    }
});

// Challenges
// get all challenges based on userId
router.get('/:userId/challenges', async (req, res) => {
    const userId = req.params.userId;
    try {
        const challenges = await getChallenges(userId);
        res.send(challenges);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get challenges' });
    }
});

// get challenge by id
router.get('/:userId/challenges/:challengeId', async (req, res) => {
    const userId = req.params.userId;
    const challengeId = req.params.challengeId;
    try {
        const challenge = await getChallenge(userId, challengeId);
        if (challenge) {
            res.send(challenge);
        } else {
            res.status(404).send({ error: 'Challenge not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to get challenge' });
    }
});

// create challenge
router.post('/:userId/challenges', async (req, res) => {
    const userId = req.params.userId;
    const { challengeTitle, challengeDesc, challengeStatus, challengePoints } = req.body;
    try {
        const create = await createChallenge(userId, challengeTitle, challengeDesc, challengeStatus, challengePoints);
        res.status(201).send(create);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create challenge' });
    }
});

// update challengeStatus
router.put('/:userId/challenges/:challengeId/status', async (req, res) => {
    const userId = req.params.userId;
    const challengeId = req.params.challengeId;
    const { challengeStatus } = req.body;
    try {
        const updatedChallenge = await updateChallengeStatus(userId, challengeId, challengeStatus);
        if (updatedChallenge) {
            res.send(updatedChallenge);
        } else {
            res.status(404).send({ error: 'Challenge not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to update challenge status' });
    }
});

// Trash Detection
// Create Trash Detection
router.post('/:userId/trashDetection', async (req, res) => {
    const userId = req.params.userId;
    const { prediction, probability } = req.body;

    try {
        const createResult = await createTrashDetection(userId, prediction, probability);
        res.status(201).send(createResult);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create trash detection', details: error.message });
    }
});

// get all trash detection data
router.get('/:userId/trashDetection', async (req, res) => {
    const userId = req.params.userId;

    try {
        const getResult = await getTrashDetection(userId);
        res.status(200).send(getResult);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get trash detection data', details: error.message });
    }
});

// routes add point to user 
router.post('/:userId/addPoints', async (req, res) => {
    const userId = req.params.userId;
    const { pointsToAdd } = req.body;

    if (!pointsToAdd || isNaN(pointsToAdd)) {
        return res.status(400).send({ error: 'Invalid points value' });
    }

    try {
        const result = await addPointsToUser(userId, parseInt(pointsToAdd, 10));
        if (result.error) {
            res.status(500).send({ error: result.message });
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        console.error('Error in route handler:', error);
        res.status(500).send({ error: 'Failed to add points', details: error.message });
    }
});

module.exports = router;
