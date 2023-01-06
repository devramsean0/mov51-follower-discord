// Setup Vars
import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import { generateRoutes } from "./generateRoutes.js";
export const app = express();
const port = process.env.PORT || 3000
app.use(cookieParser())
generateRoutes(app);
// Auth
import "./passport/init.js";
app.get("/twitch", passport.authenticate('twitch', { scope: "user:read:follows"})),
app.get("/twitch/callback", passport.authenticate('twitch', { failureRedirect: '/', successRedirect: '/twitch/success'}))

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});