require("express-async-errors")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, ".env") })
require("./DB/index.js")()
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const morgan = require("morgan")
const { readdirSync } = require("fs")
const errorHandler = require("./middlewares/errorhandler.js")
const AppError = require("./errors/app-error.js")
// require("./cron/crons.js")()

const app = express()

// Middleware
setupMiddleware(app)

// Routes
setupRoutes(app)

// Error handling
setupErrorHandling(app)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(
    `*************************** \nSERVER RUNNING ON PORT ${PORT} \n***************************`
  )
})

function setupMiddleware(app) {
  app.use(cookieParser())
  app.use(cors())
  app.use(morgan("dev"))
  app.use(express.json())
}

function setupRoutes(app) {
  readdirSync("./routes").forEach((r) =>
    app.use("/api/v1", require(`./routes/${r}`))
  )

  app.get("/", (req, res) => {
    res.send("Welcome to Jipende API v1")
  })

  app.all("*", () => {
    throw new AppError("not found", 404)
  })
}

function setupErrorHandling(app) {
  app.use(errorHandler)
}

