const express = require("express");
const router = express.Router()
const { exphbs } = require("express-handlebars");
const app = express();
const mysql = require('mysql');
require('dotenv').config();
const port = process.env.PORT;

const userRouter = require("./routes/employee")
 
//Parsing Middleware
app.use(express.urlencoded({extended: true}));
//parse application/json
app.use(express.json());
app.use('/',userRouter)
app.listen(port, () => {
    console.log(`Listening on port no. ${port}`);
})