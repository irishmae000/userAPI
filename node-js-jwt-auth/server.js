const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
//const Role = db.role;
const user = db.user;
var corsOptions = {
    origin: "http://localhost:5000"
};

db.sequelize.sync();
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
    res.json({ message: "welcome" });
});
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});/**
 * Created by 17-1336 on 5/11/22.
 */
