# 🚀 Vercel Deployment Guide

## Quick Deploy Steps

### 1. Add Environment Variable in Vercel Dashboard

Before deploying, you MUST add your OpenAI API key:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: `your_actual_openai_api_key_here`
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**

### 2. Redeploy

After adding the environment variable:

1. Go to **Deployments** tab
2. Click the **three dots** on the latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

### 3. Test Your App

Once deployed, visit:
- `https://your-app.vercel.app/chat-with-upload.html`

## Troubleshooting

### Still getting 500 error?
- Check Vercel logs: **Deployments** → Click on deployment → **Function Logs**
- Verify `OPENAI_API_KEY` is set correctly
- Make sure the API key has credits

### Chat not working?
- Open browser console (F12)
- Check for errors
- Verify API endpoints are responding

## Files Added for Vercel

- `vercel.json` - Vercel configuration
- Modified `server.js` - Added export for serverless

## Important Notes

⚠️ **Environment Variables**: Always set `OPENAI_API_KEY` in Vercel dashboard, never commit it to git!

✅ **Automatic Deploys**: Every push to GitHub will trigger a new deployment

🔄 **Redeployments**: If you update environment variables, you need to redeploy manually
