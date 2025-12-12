# SleepyCat CE - Roster Dashboard

A complete roster management system for your CE team with leave management, WFH requests, and monthly scheduling.

## 🚀 Free Deployment Options

### Option 1: Vercel (Recommended - Easiest)

1. **Create GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Upload this project to GitHub**
   - Click "New Repository" on GitHub
   - Name it `sleepycat-roster`
   - Upload all these files

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "Sign up" → "Continue with GitHub"
   - Click "New Project"
   - Import your `sleepycat-roster` repository
   - Click "Deploy"
   - Done! You'll get a URL like: `sleepycat-roster.vercel.app`

### Option 2: Netlify

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy"

### Option 3: GitHub Pages (Free)

1. Push code to GitHub
2. Go to repo Settings → Pages
3. Select "GitHub Actions" as source
4. Create `.github/workflows/deploy.yml` (see below)

---

## 📁 Project Structure

```
sleepycat-roster/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          # Main dashboard component
│   ├── main.jsx         # Entry point
│   └── index.css        # Styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 👥 Team Structure

- **Admin**: Divya
- **Inbound Lead**: Jatin
  - Agents: Bhuvan, Vaishnavi, Suresh, Aliza, Muskan Verma
- **Outbound & Sales Lead**: Muskan Kalra
  - Outbound: Priyanshi, Qurat
  - Sales: Muskan Burman, Sunil, Rakesh, Rohan, Fatima Afzal

## 📱 Features

- ✅ Live Dashboard - Real-time attendance view
- ✅ Monthly Roster - Set week offs for entire month
- ✅ Leave Management - Apply & approve leaves
- ✅ WFH Requests - Work from home approval system
- ✅ Role-based Access - Admin, Lead, Agent views
- ✅ Data Persistence - Saves to browser storage
- ✅ Mobile Responsive - Works on all devices

## 💾 Data Storage

Currently uses browser's localStorage. Data persists on each user's browser.

For shared team data, consider upgrading to:
- Firebase (free tier available)
- Supabase (free tier available)
- MongoDB Atlas (free tier available)

## 📞 Support

For any issues, contact your admin.
