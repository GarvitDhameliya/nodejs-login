require("dotenv").config();
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db/dbConnect");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();

//body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//cookies
app.use(cookieParser());

//views
app.set("view engine", "ejs");

//DB connection
connectDB();

//routes
app.use("/v1", routes);

//ejs pages
app.get("/", (req, res) => {
  res.render("./index");
});

app.get("/login", (req, res) => {
  res.render("./login");
});

app.get("/register", (req, res) => {
  res.render("./register");
});

//server
http.createServer(app).listen(process.env.PORT, () => {
  console.log("server started success on port 3001");
});
