# Deployment Guide

Complete step-by-step guide to deploy your Accessibility Checker web app.

---

## Part 1: Deploy Backend (Flask API) to Railway

### Step 1: Sign Up for Railway
1. Go to [railway.app](https://railway.app)
2. Click "Login" → Sign in with GitHub
3. Authorize Railway to access your GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `accessibility-checker-web` repository
4. Railway will auto-detect it's a Python app

### Step 3: Configure Environment
1. Click on your service
2. Go to "Variables" tab
3. Add these variables:
   - `PORT` = `5000`
   - `PYTHON_VERSION` = `3.11`

### Step 4: Deploy
1. Railway will automatically deploy
2. Wait 2-3 minutes for build to complete
3. Click "Settings" → "Generate Domain"
4. Copy your API URL (e.g., `https://your-app.railway.app`)

### Step 5: Test Your API
Open in browser: `https://your-app.railway.app/api/health`

You should see: `{"status": "healthy"}`

✅ **Backend deployed!**

---

## Part 2: Deploy Frontend (React) to Vercel

### Step 1: Update API URL in Code

Before deploying frontend, we need to update it to use your Railway API URL.

**Edit `src/App.jsx`:**

Find this line (around line 17):
```javascript
const response = await fetch('http://localhost:5000/api/check', {
```

Replace with your Railway URL:
```javascript
const response = await fetch('https://YOUR-RAILWAY-URL.railway.app/api/check', {
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

✅ **Frontend deployed!**

---

## Part 3: Test Everything

### Test Your Live App:
1. Visit your Vercel URL
2. Enter a website URL (e.g., `https://example.com`)
3. Click "Scan Website"
4. Verify results appear

### If it doesn't work:
- Check Railway logs for API errors
- Check Vercel logs for frontend errors
- Verify CORS is enabled in Flask
- Make sure API URL is correct in `App.jsx`

---

## Part 4: Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS instructions

### For Railway (Backend):
1. Go to Settings → Networking
2. Add custom domain
3. Update DNS records

---

## Troubleshooting

### Backend Issues:
- **"Application failed to respond"** → Check Railway logs
- **CORS errors** → Verify `flask-cors` is installed
- **Module not found** → Check `requirements.txt`

### Frontend Issues:
- **"Failed to fetch"** → Check API URL in `App.jsx`
- **Build failed** → Check `package.json` dependencies
- **Blank page** → Check browser console for errors

### Common Fixes:
1. **CORS Error:** Make sure Flask has `CORS(app)` enabled
2. **API Not Found:** Double-check Railway URL is correct
3. **Slow First Load:** Railway free tier may sleep (wait 30s)

---

## Monitoring

### Railway:
- View logs: Project → Deployments → Logs
- View metrics: Project → Metrics

### Vercel:
- View deployments: Project → Deployments
- View analytics: Project → Analytics

---

## Updating Your App

### Backend Updates:
1. Make changes locally
2. Commit and push to GitHub
3. Railway auto-deploys from `main` branch

### Frontend Updates:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel auto-deploys from `main` branch

**Both platforms auto-deploy on every push!** 🚀

---

## Costs

### Railway:
- **Free:** $5/month credit (enough for this app)
- **Paid:** $5/month for more resources

### Vercel:
- **Free:** Unlimited for personal projects
- **Paid:** $20/month for teams (not needed)

**Total Cost: $0** (free tiers are sufficient!)

---

## Your Live URLs

After deployment, update these in your README:

- **Live App:** `https://your-app.vercel.app`
- **API:** `https://your-app.railway.app`
- **GitHub:** `https://github.com/eriperspective/accessibility-checker-web`

---

## Next Steps

1. ✅ Test your live app thoroughly
2. ✅ Add live URL to your Medium article
3. ✅ Update GitHub README with live demo link
4. ✅ Share on LinkedIn/Twitter
5. ✅ Add to your portfolio

**Congratulations! Your app is live!** 🎉

---

## Need Help?

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Flask Deployment: https://flask.palletsprojects.com/en/latest/deploying/


