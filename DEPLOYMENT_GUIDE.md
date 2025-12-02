# Deployment Guide

Complete step-by-step guide to deploy my Accessibility Checker Web Application.

---

## Part 1: Deploy Backend (Flask API) to Render

### Step 1: Sign Up for Render
1. Go to [render.com](https://render.com)
2. Click "Get Started" → Sign up with GitHub
3. Authorize Render to access your GitHub

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub account if prompted
3. Select `accessibility-checker-web` repository
4. Click "Connect"

### Step 3: Configure Service
Fill in these settings:
- **Name:** `accessibility-checker-api` (or any name you like)
- **Region:** Choose closest to you
- **Branch:** `main`
- **Root Directory:** Leave blank
- **Runtime:** `Python 3`
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `gunicorn app:app`

### Step 4: Set Environment Variables
Scroll down to "Environment Variables" and add:
- **Key:** `PYTHON_VERSION` **Value:** `3.11`

### Step 5: Choose Free Plan
- Select **"Free"** plan (no credit card required!)
- Click "Create Web Service"

### Step 6: Wait for Deployment
- Render will build and deploy (takes 2-5 minutes)
- Watch the logs to see progress
- When you see "Your service is live", it's ready!

### Step 7: Get Your API URL
- At the top of the page, you'll see your URL
- It will look like: `https://accessibility-checker-api.onrender.com`
- Copy this URL!

### Step 8: Test Your API
Open in browser: `https://your-app.onrender.com/api/health`

You should see: `{"status": "healthy"}`

**Backend deployed!**

⚠️ **Note:** Free tier sleeps after 15 minutes of inactivity. First request after sleep takes ~30 seconds to wake up.

---

## Part 2: Keep API Awake with UptimeRobot (Optional but Recommended)

Since Render's free tier sleeps after 15 minutes, I can use UptimeRobot to keep my API awake 24/7.

### Step 1: Sign Up for UptimeRobot
1. Go to [uptimerobot.com](https://uptimerobot.com)
2. Click "Register for FREE"
3. Create account with email and password
4. Verify email

### Step 2: Add New Monitor
1. Once logged in, click **"+ Add New Monitor"**
2. Fill in these settings:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** `Accessibility Perspective API`
   - **URL (or IP):** `https://accessibility-checker-api.onrender.com/api/health`
   - **Monitoring Interval:** `5 Minutes` (free tier minimum)

### Step 3: Create Monitor
1. Click **"Create Monitor"**
2. That's it! ✅

### What This Does:
- UptimeRobot pings my API every 5 minutes
- Keeps Render awake and prevents dormancy
- I get email alerts if API goes down
- Completely free for up to 50 monitors

**Why `/api/health`?**
This is a lightweight endpoint that just returns `{"status": "healthy"}`. It's designed for health checks and doesn't waste resources.

**My API now stays warm 24/7!** 🚀

---

## Part 3: Deploy Frontend (React) to Vercel

### Step 1: Update API URL in Code

Before deploying frontend, we need to update it to use your Render API URL.

**Edit `src/App.jsx`:**

Find this line (around line 17):
```javascript
const response = await fetch('http://localhost:5000/api/check', {
```

Replace with your Render URL:
```javascript
const response = await fetch('https://YOUR-RENDER-URL.onrender.com/api/check', {
```

**Commit and push this change:**
```bash
git add src/App.jsx
git commit -m "Update API URL for production"
git push origin main
```

### Step 2: Sign Up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" → Continue with GitHub
3. Authorize Vercel

### Step 3: Import Project
1. Click "Add New..." → "Project"
2. Import `accessibility-checker-web` from GitHub
3. Vercel will auto-detect it's a Vite app

### Step 4: Configure Build Settings
Vercel should auto-detect these, but verify:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Step 5: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. You'll get a URL like: `https://accessibility-checker-web.vercel.app`

 **Frontend deployed!**

---

## Part 4: Test Everything

### Test Your Live App:
1. Visit your Vercel URL
2. Enter a website URL (e.g., `https://example.com`)
3. Click "Scan Website"
4. Verify results appear (first load may take 30s if API was sleeping)

### If it doesn't work:
- Check Render logs for API errors
- Check Vercel logs for frontend errors
- Verify CORS is enabled in Flask
- Make sure API URL is correct in `App.jsx`
- Wait 30 seconds if API is waking from sleep

---

## Part 5: Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS instructions

### For Render (Backend):
1. Go to Settings → Custom Domains
2. Add custom domain (requires paid plan)

---

## Troubleshooting

### Backend Issues:
- **"Application failed to respond"** → Check Render logs
- **CORS errors** → Verify `flask-cors` is installed
- **Module not found** → Check `requirements.txt`
- **Slow first load** → Render free tier sleeps (wait 30s)

### Frontend Issues:
- **"Failed to fetch"** → Check API URL in `App.jsx`
- **Build failed** → Check `package.json` dependencies
- **Blank page** → Check browser console for errors

### Common Fixes:
1. **CORS Error:** Make sure Flask has `CORS(app)` enabled
2. **API Not Found:** Double-check Render URL is correct
3. **Slow First Load:** Render free tier sleeps after 15 min (this is normal!)

---

## Monitoring

### Render:
- View logs: Service → Logs tab
- View metrics: Service → Metrics tab
- View events: Service → Events tab

### Vercel:
- View deployments: Project → Deployments
- View analytics: Project → Analytics

---

## Updating Your App

### Backend Updates:
1. Make changes locally
2. Commit and push to GitHub
3. Render auto-deploys from `main` branch

### Frontend Updates:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel auto-deploys from `main` branch

**Both platforms auto-deploy on every push!** 

---

## Costs

### Render:
- **Free:** 750 hours/month (plenty for this app)
- **Limitation:** Sleeps after 15 min inactivity
- **Paid:** $7/month for always-on service

### Vercel:
- **Free:** Unlimited for personal projects

**Total Cost: $0** (completely free!)

---

## Your Live URLs

After deployment, update these in your README:

- **Live App:** `https://your-app.vercel.app`
- **API:** `https://your-app.onrender.com`


**Congratulations! Your app is live!**

---

## Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Flask Deployment: https://flask.palletsprojects.com/en/latest/deploying/


