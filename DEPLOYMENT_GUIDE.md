# 🚀 FREE Deployment Guide - SleepyCat Roster Dashboard

## EASIEST METHOD: Vercel (5 Minutes)

### Step 1: Create GitHub Account
1. Go to **https://github.com**
2. Click **"Sign up"**
3. Enter your email, create password
4. Verify your email

### Step 2: Create New Repository
1. Click the **"+"** button (top right) → **"New repository"**
2. Name: `sleepycat-roster`
3. Keep it **Public** (free)
4. Click **"Create repository"**

### Step 3: Upload Files
1. On your new repo page, click **"uploading an existing file"**
2. **Extract the ZIP file** you downloaded
3. **Drag & drop ALL files** from the extracted folder
4. Click **"Commit changes"**

### Step 4: Deploy on Vercel
1. Go to **https://vercel.com**
2. Click **"Sign Up"** → **"Continue with GitHub"**
3. Authorize Vercel
4. Click **"Add New..."** → **"Project"**
5. Find `sleepycat-roster` and click **"Import"**
6. Click **"Deploy"** (keep default settings)
7. Wait 1-2 minutes...
8. **Done!** 🎉

### Your Dashboard URL
After deployment, you'll get a URL like:
```
https://sleepycat-roster.vercel.app
```

Share this URL with your team!

---

## 📱 How Your Team Uses It

1. **Share the URL** with all team members
2. Each person selects their name to login
3. Data saves in **their own browser**

### Important Note:
Currently, each person's data is saved in their own browser.
This means:
- ✅ Their leave requests save on their device
- ✅ Their approved leaves persist
- ⚠️ Data doesn't sync between team members automatically

### For Shared Data (Advanced):
If you want everyone to see the same data, you'll need a database.
Free options:
- **Firebase** - https://firebase.google.com (free tier)
- **Supabase** - https://supabase.com (free tier)

Let me know if you want me to add database support!

---

## 🔧 If Something Goes Wrong

### Build Fails on Vercel?
1. Check that ALL files were uploaded
2. Make sure `package.json` is in the root folder
3. Try clicking "Redeploy"

### Can't See the Site?
1. Wait 2-3 minutes after deploy
2. Clear browser cache (Ctrl+Shift+R)
3. Try incognito mode

### Need Help?
- Vercel Docs: https://vercel.com/docs
- Contact your IT team

---

## 🔄 Making Updates

To update your dashboard:
1. Go to your GitHub repo
2. Edit files or upload new ones
3. Vercel will **automatically redeploy**!

---

## 💰 Cost: Completely FREE!

- GitHub: Free for public repos
- Vercel: Free tier includes:
  - 100GB bandwidth/month
  - Unlimited deployments
  - Custom domain support
  - SSL certificate (https)

This is more than enough for your team!
