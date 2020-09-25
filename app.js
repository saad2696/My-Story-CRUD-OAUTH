//setting up express on app
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
//intializing app with express
const app = express();
//load config
dotenv.config({ path: "./config/config.env" });
//getting passport
require("./config/passport")(passport);
//sessions (always above passport middle ware)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }))
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
connectDB(); //from db.js


//process.env is used to acess the links within the config or package files
const PORT = process.env.PORT || 3000;
//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//routes
app.use("/", require("./routes/index"));
app.use('/auth',require('./routes/auth'));
//handlebars
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
//making static folder for css styling etc
app.use(express.static(path.join(__dirname, "public")));

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
