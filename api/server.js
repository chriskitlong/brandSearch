const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
require('dotenv').config({
  path: '../.env'
});

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

app.use(express.static(path.join(__dirname, '../ui/build')))
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

require("./app/routes/brand.routes")(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../ui/build/index.html'))
})
// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});