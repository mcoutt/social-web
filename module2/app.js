const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
import initRoutes from './routes/index'

const app = express()
const router = express.Router()

app.listen(3000)
app.use(bodyParser.json())
app.use(cookieParser())


// Routes
app.use(initRoutes(router));
