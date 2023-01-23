const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './config/.env' })
require('./config/db')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')

const app = express()

const PORT = process.env.PORT || 5000

// pour pouvoir communiquer avec le PORT du client lors des requêtes à la bdd avec axios
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json())

// routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)

// server
app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
})