import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';

export const setupPassport = () => {
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  // Deserialize user
  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findOne({ userId });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ email: profile.emails[0].value });
            
            if (user) {
              // Update existing user
              user.lastLogin = new Date();
              user.isVerified = true;
              await user.save();
            } else {
              // Create new user
              user = await User.create({
                userId: `google_${profile.id}`,
                name: profile.displayName,
                email: profile.emails[0].value,
                provider: 'google',
                providerId: profile.id,
                avatar: profile.photos[0]?.value,
                isVerified: true
              });
            }
            
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  }

  // Facebook OAuth Strategy
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: '/auth/facebook/callback',
          profileFields: ['id', 'displayName', 'emails', 'photos']
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ email: profile.emails[0].value });
            
            if (user) {
              user.lastLogin = new Date();
              user.isVerified = true;
              await user.save();
            } else {
              user = await User.create({
                userId: `facebook_${profile.id}`,
                name: profile.displayName,
                email: profile.emails[0].value,
                provider: 'facebook',
                providerId: profile.id,
                avatar: profile.photos[0]?.value,
                isVerified: true
              });
            }
            
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  }

  // GitHub OAuth Strategy
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    passport.use(
      new GitHubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
          callbackURL: '/auth/github/callback',
          scope: ['user:email']
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails[0]?.value || `${profile.username}@github.com`;
            let user = await User.findOne({ email });
            
            if (user) {
              user.lastLogin = new Date();
              user.isVerified = true;
              await user.save();
            } else {
              user = await User.create({
                userId: `github_${profile.id}`,
                name: profile.displayName || profile.username,
                email,
                provider: 'github',
                providerId: profile.id,
                avatar: profile.photos[0]?.value,
                isVerified: true
              });
            }
            
            return done(null, user);
          } catch (error) {
            return done(error, null);
          }
        }
      )
    );
  }
};
