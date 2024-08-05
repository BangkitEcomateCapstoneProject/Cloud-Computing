const express = require('express')
const router = express.Router()
const {calculateCarbon} = require('./handler')

router.post('/calculate', async (req, res) => {
    const { transportation, electricity, waste } = req.body;
    if (transportation == null || electricity == null || waste == null) {
        return res.status(400).send({ error: true, message: 'Please provide transportation, electricity, and waste data.' });
    }
    try {
        const result = await calculateCarbon(transportation, electricity, waste);
        if (result.error) {
            throw new Error(result.message);
        }
        res.status(200).send({ totalEmission: result.message });
    } catch (error) {
        res.status(500).send({ error: true, message: 'Failed to calculate carbon' });
    }
});


module.exports = router