const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes')
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/api/trashbins', routes)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api/trashbins`);
})