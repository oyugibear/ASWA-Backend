const express = require('express');
const mongoose = require('mongoose');
// const routes = require('./routes/users');
require('dotenv').config();
const { readdirSync } = require("fs")
const AppError = require("./errors/app-error.js")
const cors = require('cors');


const mongoString = process.env.DATABASE_URL
const app = express();
// app.use('/api/v1', routes)
app.use(cors());
app.use(express.json());
setupRoutes(app)


app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

function setupRoutes(app) {
    readdirSync("./routes").forEach((r) =>
      app.use("/api/v1", require(`./routes/${r}`))
    )
  
    app.get("/", (req, res) => {
      res.send("Welcome to ASWB API v1")
    })
  
    app.all("*", () => {
      throw new AppError("not found", 404)
    })
  }