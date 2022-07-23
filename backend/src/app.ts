import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { urlencoded, json as _json } from 'body-parser';
// import session from 'express-session';
import cookieSession from 'cookie-session';
import passport from "passport";
import "./passport";

import dotenv from 'dotenv';
dotenv.config();

import notFound from './middlewares/not-found';
import errorHandler from './middlewares/error-handler';
import authRouter from './routers/auth.router';

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);


// app.use(session({
//    secret: process.env.SESSION_SECRET || '',
//    resave: false,
//    saveUninitialized: true,
//    cookie: { secure: true }
// }));

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(urlencoded({ extended: true }));
app.use(json());

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.get('/', (res: any) => {
  res.json({
    message: 'Home',
  });
});

app.use("/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
