const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
//storing session in MongoDB
const methodOverride = require("method-override");
//override methods 
const flash = require("express-flash");
//show notifications for forms 
const logger = require("morgan");
//logger
const connectDB = require("./config/database");
//database
const mainRoutes = require("./routes/main");
//main routes
const itemsRoute = require('./routes/item') 
const bodyParser = require("body-parser")

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use("/public", express.static(__dirname + "/public"));

//Body Parsing pull stuff out of forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB can log in and leave then come back later 
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use('/items', itemsRoute);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
