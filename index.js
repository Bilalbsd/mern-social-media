const express = require('express')
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

// app.get('/', (req, res) => {
//     res.send("Hello World")
// })

// routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// server
app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
})