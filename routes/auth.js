import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { sendOTP, sendWelcomeEmail } from '../utils/emailService.js';

const router = express.Router();

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key-change-this', {
    expiresIn: '7d'
  });
};

// Send OTP endpoint
router.post('/send-otp', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Delete any existing OTPs for this email
    await OTP.deleteMany({ email });

    // Save new OTP
    await OTP.create({ email, otp });

    // Send OTP email
    const emailResult = await sendOTP(email, otp, name || 'User');

    if (!emailResult.success) {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send OTP email. Please check your email configuration.' 
      });
    }

    res.json({ 
      success: true, 
      message: 'OTP sent successfully to your email',
      email 
    });

  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send OTP. Please try again.' 
    });
  }
});

// Verify OTP and login
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp, name } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    // Find OTP
    const otpDoc = await OTP.findOne({ email, otp });

    if (!otpDoc) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired OTP. Please request a new one.' 
      });
    }

    // Check if OTP is expired (10 minutes)
    const otpAge = Date.now() - otpDoc.createdAt.getTime();
    if (otpAge > 10 * 60 * 1000) {
      await OTP.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({ 
        success: false, 
        message: 'OTP has expired. Please request a new one.' 
      });
    }

    // Find or create user
    let user = await User.findOne({ email });
    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await User.create({
        userId: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name || email.split('@')[0],
        email,
        provider: 'email',
        isVerified: true
      });

      // Send welcome email to new users
      await sendWelcomeEmail(email, user.name);
    } else {
      // Update last login
      user.lastLogin = new Date();
      user.isVerified = true;
      await user.save();
    }

    // Delete used OTP
    await OTP.deleteOne({ _id: otpDoc._id });

    // Generate JWT token
    const token = generateToken(user.userId);

    // Set session
    req.session.userId = user.userId;

    res.json({
      success: true,
      message: isNewUser ? 'Account created successfully!' : 'Login successful!',
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
        lastLogin: user.lastLogin
      },
      isNewUser
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Verification failed. Please try again.' 
    });
  }
});

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login.html?error=google_failed' }),
  async (req, res) => {
    try {
      const token = generateToken(req.user.userId);
      req.session.userId = req.user.userId;
      
      // Send welcome email for new users
      if (req.user.createdAt > Date.now() - 10000) {
        await sendWelcomeEmail(req.user.email, req.user.name);
      }
      
      res.redirect(`/chat-with-upload.html?token=${token}&provider=google`);
    } catch (error) {
      res.redirect('/login.html?error=auth_failed');
    }
  }
);

// Facebook OAuth routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login.html?error=facebook_failed' }),
  async (req, res) => {
    try {
      const token = generateToken(req.user.userId);
      req.session.userId = req.user.userId;
      
      if (req.user.createdAt > Date.now() - 10000) {
        await sendWelcomeEmail(req.user.email, req.user.name);
      }
      
      res.redirect(`/chat-with-upload.html?token=${token}&provider=facebook`);
    } catch (error) {
      res.redirect('/login.html?error=auth_failed');
    }
  }
);

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login.html?error=github_failed' }),
  async (req, res) => {
    try {
      const token = generateToken(req.user.userId);
      req.session.userId = req.user.userId;
      
      if (req.user.createdAt > Date.now() - 10000) {
        await sendWelcomeEmail(req.user.email, req.user.name);
      }
      
      res.redirect(`/chat-with-upload.html?token=${token}&provider=github`);
    } catch (error) {
      res.redirect('/login.html?error=auth_failed');
    }
  }
);

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
    const user = await User.findOne({ userId: decoded.userId });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        provider: user.provider,
        avatar: user.avatar,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
