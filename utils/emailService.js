import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send OTP email
export const sendOTP = async (email, otp, name = 'User') => {
  const mailOptions = {
    from: `"CHATBOT AI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your CHATBOT Login OTP',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
          .container { background: white; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .logo { text-align: center; margin-bottom: 30px; }
          .logo h1 { color: #00d4ff; margin: 0; font-size: 32px; }
          .otp-box { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px; margin: 30px 0; }
          .otp-code { font-size: 36px; font-weight: bold; letter-spacing: 8px; margin: 10px 0; }
          .content { color: #333; line-height: 1.6; }
          .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <h1>🤖 CHATBOT</h1>
            <p style="color: #666; margin: 5px 0;">AI-Powered Assistant</p>
          </div>
          
          <div class="content">
            <h2 style="color: #333;">Hello ${name}!</h2>
            <p>You requested to login to CHATBOT. Use the OTP code below to complete your login:</p>
          </div>
          
          <div class="otp-box">
            <p style="margin: 0; font-size: 14px;">Your OTP Code</p>
            <div class="otp-code">${otp}</div>
            <p style="margin: 0; font-size: 12px; opacity: 0.9;">Valid for 10 minutes</p>
          </div>
          
          <div class="content">
            <p><strong>Important:</strong></p>
            <ul>
              <li>This OTP is valid for <strong>10 minutes</strong></li>
              <li>Do not share this code with anyone</li>
              <li>If you didn't request this, please ignore this email</li>
            </ul>
          </div>
          
          <div class="footer">
            <p>© 2025 CHATBOT AI Assistant. All rights reserved.</p>
            <p>This is an automated message, please do not reply.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

// Send welcome email
export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: `"CHATBOT AI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to CHATBOT! 🎉',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
          .container { background: white; max-width: 600px; margin: 0 auto; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
          .content { color: #333; line-height: 1.8; }
          .features { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .feature-item { padding: 10px 0; }
          .feature-item strong { color: #667eea; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 36px;">🤖 CHATBOT</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">AI-Powered Assistant</p>
          </div>
          
          <div class="content">
            <h2>Welcome, ${name}! 🎉</h2>
            <p>Thank you for joining CHATBOT! We're excited to have you on board.</p>
            
            <div class="features">
              <h3 style="margin-top: 0; color: #333;">What you can do with CHATBOT:</h3>
              <div class="feature-item">
                <strong>💬 Smart Conversations:</strong> Chat naturally with our AI assistant
              </div>
              <div class="feature-item">
                <strong>📁 File Analysis:</strong> Upload images, code files, and documents for instant analysis
              </div>
              <div class="feature-item">
                <strong>🧠 Expert Assistance:</strong> Get help with coding, career advice, fitness, and more
              </div>
              <div class="feature-item">
                <strong>🔒 Secure & Private:</strong> Your conversations are protected
              </div>
            </div>
            
            <p>Ready to get started? Your AI assistant is waiting for you!</p>
            
            <div style="text-align: center;">
              <a href="http://localhost:3001" class="cta-button">Start Chatting Now</a>
            </div>
            
            <p style="margin-top: 30px; color: #666; font-size: 14px;">
              <strong>Need help?</strong> Our AI is here 24/7 to assist you with any questions.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 40px; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
            <p>© 2025 CHATBOT AI Assistant. All rights reserved.</p>
            <p>You're receiving this because you created an account with us.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Welcome email error:', error);
    return { success: false, error: error.message };
  }
};
