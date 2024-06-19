const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/', router);

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('failed to connect');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
