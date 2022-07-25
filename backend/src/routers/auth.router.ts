import passport from "passport";
const router = require("express").Router();
import dotenv from 'dotenv';
import User from "../models/User";
dotenv.config();

const { LOGIN_REDIRECT } = process.env;

router.get("/logout", (req: any, res: any) => {
  req.logout();
  res.redirect(LOGIN_REDIRECT);
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: LOGIN_REDIRECT,
    failureRedirect: "/login/failed",
  })
);

router.get("/login/success", (req: any, res: any) => {
  if (req.user) {
    const user: User = {
      fullName: req.user.fullName,
      email: req.user.email,
      picture: req.user.picture,
      googleId: req.user.googleId,
    }

    res.status(200).json({
      success: true,
      message: "successfull",
      user,
    });
  }
});

router.get("/login/failed", (res: any) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req: any, res: any) => {
  req.logout();
  res.redirect(process.env.LOGIN_REDIRECT);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.LOGIN_REDIRECT,
    failureRedirect: "/login/failed",
  })
);

export default router;
