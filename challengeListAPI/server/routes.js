const express = require('express')
const router = express.Router()
const { getAllChallenges } = require('./handler')

router.get('/', getAllChallenges)

module.exports = router;