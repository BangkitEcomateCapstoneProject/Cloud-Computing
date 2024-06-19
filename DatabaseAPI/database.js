const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
}).promise();

// Users
// get all user
async function getUsers() {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        return {
            error: false,
            message: 'Users fetched successfully',
            userList: rows,
        };
    } catch (error) {
        return {
            error: true,
            message: 'Error fetching users',
            userList: [],
        };
    }
}

// get user by userId
async function getUser(userId) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE userId = ?', [userId]);
        if (rows.length > 0) {
            return {
                error: false,
                message: 'User fetched successfully',
                user: rows[0],
            };
        } else {
            return {
                error: true,
                message: 'User not found',
                user: null,
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error fetching user',
            challenge: null,
        };
    }
}

// store user
async function storeUsers(userId, email) {
    try {
        await pool.query('INSERT INTO users(userId, email) VALUES (?, ?)', [userId, email]);
        const user = await getUser(userId);
        return {
            error: false,
            message: 'User Successfully Created',
            user: user.user
        };
    } catch (error) {
        return {
            error: true,
            message: 'Failed to create user',
            user: null
        };
    }
}

// add points
async function addPointsToUser(userId, pointsToAdd) {
    try {
       
        const [rows] = await pool.query('SELECT * FROM users WHERE userId = ?', [userId]);
        const user = rows[0];
        if (!user) {
            console.error('User not found');
            return {
                error: true,
                message: 'User not found',
                user: null
            };
        }

        const currentPoints = user.points;
        const newPoints = currentPoints + parseInt(pointsToAdd, 10);


        await pool.query('UPDATE users SET points = ? WHERE userId = ?', [newPoints, userId]);

        const [updatedRows] = await pool.query('SELECT * FROM users WHERE userId = ?', [userId]);
        const updatedUser = updatedRows[0];

        return {
            error: false,
            message: 'Points added successfully',
            user: updatedUser
        };
    } catch (error) {
        console.error('Error in addPointsToUser:', error);
        return {
            error: true,
            message: 'Failed to add points',
            user: null
        };
    }
}

// Challenges
const validStatuses = ['notStarted', 'inProgress', 'completed'];

// get all challenges based on userId
async function getChallenges(userId) {
    try {
        const [rows] = await pool.query('SELECT * FROM challenges WHERE userId = ?', [userId]);
        return {
            error: false,
            message: 'Challenges fetched successfully',
            challengeList: rows,
        };
    } catch (error) {
        return {
            error: true,
            message: 'Error fetching challenges',
            challengeList: [],
        };
    }
}

// get challenge based on userId
async function getChallenge(userId, challengeId) {
    try {
        const [rows] = await pool.query('SELECT * FROM challenges WHERE userId = ? AND challengeId = ?', [userId, challengeId]);
        if (rows.length > 0) {
            return {
                error: false,
                message: 'Challenge fetched successfully',
                challenge: rows[0],
            };
        } else {
            return {
                error: true,
                message: 'Challenge not found',
                challenge: null,
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error fetching challenge',
            challenge: null,
        };
    }
}

// create challenge
async function createChallenge(userId, challengeTitle, challengeDesc, challengeStatus, challengePoints) {
    if (!validStatuses.includes(challengeStatus)) {
        return {
            error: true,
            message: 'Invalid challenge status',
            challenge: null,
        };
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO challenges(userId, challengeTitle, challengeDesc, challengeStatus, challengePoints) VALUES(?, ?, ?, ?, ?)',
            [userId, challengeTitle, challengeDesc, challengeStatus, challengePoints]
        );
        const challengeId = result.insertId;
        const challenge = await getChallenge(userId, challengeId);
        return {
            error: false,
            message: 'Challenge created successfully',
            challenge: challenge.challenge,
        };
    } catch (error) {
        return {
            error: true,
            message: 'Error creating challenge',
            challenge: null,
        };
    }
}

//update challengeStatus
async function updateChallengeStatus(userId, challengeId, newStatus) {
    if (!validStatuses.includes(newStatus)) {
        return {
            error: true,
            message: 'Invalid challenge status',
            challenge: null,
        };
    }
    try {
        await pool.query('UPDATE challenges SET challengeStatus = ? WHERE userId = ? AND challengeId = ?', [newStatus, userId, challengeId]);
        const challenge = await getChallenge(userId, challengeId);
        if (challenge.error) {
            return {
                error: true,
                message: 'Error updating challenge status or challenge not found',
                challenge: null,
            };
        } else {
            return {
                error: false,
                message: 'Challenge status updated successfully',
                challenge: challenge.challenge,
            };
        }
    } catch (error) {
        return {
            error: true,
            message: 'Error updating challenge status',
            challenge: null,
        };
    }
}

// Trash Detection
// Create Trash Detection
async function createTrashDetection(userId, prediction, probability) {
    try {
        await pool.query('INSERT INTO trashdetection(userId, prediction, probability) VALUES (?, ?, ?)', [userId, prediction, probability]);
        return {
            error: false,
            message: 'Trash Detection Successfully Added',
        };
    } catch (error) {
        return {
            error: true,
            message: 'Error putting data into Trash Detection table',
            details: error.message
        };
    }
}

// get all trash detection data
async function getTrashDetection(userId) {
    try {
        const [rows] = await pool.query('SELECT * FROM trashdetection WHERE userId = ?', [userId]);
        return {
            error: false,
            message: 'Data successfully fetched',
            detectionList: rows
        };
    } catch (error) {
        return {
            error: true,
            message: 'Data failed to fetch',
            detectionList: [],
            details: error.message
        };
    }
}

module.exports = {
    getUsers,
    getUser,
    storeUsers,
    getChallenges,
    getChallenge,
    createChallenge,
    updateChallengeStatus,
    createTrashDetection,
    getTrashDetection,
    addPointsToUser
};
