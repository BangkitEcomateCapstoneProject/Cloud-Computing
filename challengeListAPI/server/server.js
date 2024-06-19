const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes')
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/challengeslist', routes)

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}/api/challengeslist`)
})