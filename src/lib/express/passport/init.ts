import session from "express-session";
import passport from "passport";
import OAuth2Strategy from "passport-oauth2";
import request from "request";
import express from "express";
import { app } from "./../express.js";
// App uses
app.use(express.static('public'));
app.use(passport.initialize());
app.use(session({
  secret: "hello",
  saveUninitialized: false,
  resave: false
}))
app.use(passport.session());
const {TWITCH_CLIENT_ID, TWITCH_SECRET, /*TWITCH_SESSION_SECRET*/ TWITCH_CALLBACK_URL} = process.env
// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
  var options = {
    url: 'https://api.twitch.tv/helix/users',
    method: 'GET',
    headers: {
      'Client-ID': TWITCH_CLIENT_ID,
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Authorization': 'Bearer ' + accessToken
    }
  };

  request(options, function (_error, response, body) {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body));
    } else {
      done(JSON.parse(body));
    }
  });
}

passport.serializeUser(function(user: any, done) {
    done(null, user);
});

passport.deserializeUser(function(user: any, done) {
    done(null, user);
});

passport.use('twitch', new OAuth2Strategy({
    authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
    tokenURL: 'https://id.twitch.tv/oauth2/token',
    clientID: String(TWITCH_CLIENT_ID),
    clientSecret: String(TWITCH_SECRET),
    callbackURL: TWITCH_CALLBACK_URL,
  },
  function(accessToken: any, refreshToken: any, profile: any, done: any) {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;
    done(null, profile);
  }
));