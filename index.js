import session from 'express-session';
const express = require("express");
const cors = require("cors");
const passportSetup = require("./backend/passport");
import { urlencoded, json as _json } from 'body-parser';
const passport = require("passport");
const authRoute = require("./backend/routes/auth").default;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

app.use(session({
   secret: 'somethingsecretgoeshere',
   resave: false,
   saveUninitialized: true,
   cookie: { secure: true }
}));

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen("5000", () => {
  console.log("Server is running!");
});
