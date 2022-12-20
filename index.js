const express = require('express')
require('dotenv').config({ path: './config/.env' })

const app = express()

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
})