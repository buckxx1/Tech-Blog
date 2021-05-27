const express = require("express");
const path = require("path");

// controllers - handlebars - sequelize - session
const controller = require("./controllers");

const exphbs = require("express-handlebars");

const sequelize = require("./config/connection");

const session = require("express-session");

const { Sequelize } = require("sequelize/types");

const sequelizeStore = require("connect-session-sequelize")(session.Store)

// create the session 
const sesh = {
    secret: "super secret secret",
    cookie: {},
    resave: false,
    saveUinitialized: true,
    store: new SequelizeStore ({
        db: sequelize,
    }),
};

//set port 
const app = express();
const PORT = process.env.PORT || 3002;

// midwear

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sesh));

//controllers

app.use("/", controller);

//setup handlebars

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//sync

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`))
})