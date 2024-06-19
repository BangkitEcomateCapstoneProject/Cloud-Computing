const express = require('express')
const router = express.Router()
const { getAllTrashBins, searchTrashBins } = require('./handler')

router.get('/', getAllTrashBins)
router.get('/search', searchTrashBins)


module.exports = router;