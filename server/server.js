const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
var bodyParser = require('body-parser')
const routes = require('./routes/ToDoRoute');

require('dotenv').config();


const app = express();
const PORT = process.env.port || 4000; 

app.use(express.json())
// app.use(bodyParser.json())
app.use(cors());

mongoose
    .connect("mongodb+srv://todo-app-user:JWuKdWYpaD9saNEE@todo-app-cluster.bhjoey3.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDB...', err));


app.use(routes);

app.listen(PORT, () => console.log("Server running on port:", PORT));

