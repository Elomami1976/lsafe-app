# LSafe - Hostinger Deployment Guide

## ✅ Production Build Complete!

Your app has been built and is ready for deployment to Hostinger.

---

## 📦 What Was Built

The `dist/` folder now contains your production-ready files:
- `index.html` - Main HTML file
- `assets/` - Minified CSS and JavaScript files
- `robots.txt`, `sitemap.xml`, `ads.txt` - SEO files
- `.htaccess` - Apache configuration for routing
- `_redirects` - Netlify-style redirects (for compatibility)

---

## ⚠️ IMPORTANT: Backend Limitation

**Your app requires a Node.js backend** (`backend/server.ts`) that:
- Runs on port 5050
- Provides the `/api/v1/scan` endpoint
- Handles rate limiting and security scanning

### Hostinger Options:

#### Option 1: Static Hosting Only (Frontend) ❌ NOT RECOMMENDED
- Upload only the `dist/` folder contents
- **PROBLEM**: The scanning functionality will NOT work because there's no backend API
- Users will get errors when trying to scan URLs

#### Option 2: VPS Hosting ✅ RECOMMENDED
- Get a Hostinger VPS plan
- Deploy both frontend (dist/) AND backend (backend/)
- Install Node.js on the VPS
- Run the backend server continuously using PM2 or systemd

#### Option 3: Separate Backend Hosting ✅ GOOD ALTERNATIVE
- Frontend: Upload `dist/` to Hostinger static hosting
- Backend: Deploy to a service that supports Node.js:
  - Railway.app (free tier available)
  - Render.com (free tier available)  
  - Heroku (paid)
  - DigitalOcean App Platform
- Update `vite.config.ts` proxy target to point to your backend URL

---

## 📤 Deployment Steps for Hostinger

### For Static Hosting (Frontend Only):

1. **Login to Hostinger**
   - Go to hPanel → File Manager

2. **Upload Files**
   - Navigate to `public_html/` folder
   - Delete default files
   - Upload ALL files from `dist/` folder:
     ```
     dist/index.html
     dist/assets/
     dist/*.txt
     dist/*.xml
     dist/*.png
     dist/.htaccess
     ```

3. **Set Permissions**
   - Ensure `.htaccess` is readable (644)
   - All folders should be 755

4. **Test**
   - Visit your domain
   - **NOTE**: URL scanning will NOT work without backend

### For VPS Hosting (Full Stack):

1. **Connect to VPS via SSH**
   ```bash
   ssh root@your-vps-ip
   ```

2. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Upload Your Code**
   ```bash
   # From your local machine
   scp -r lsafe/ root@your-vps-ip:/var/www/
   ```

4. **Install Dependencies**
   ```bash
   cd /var/www/lsafe
   npm install
   ```

5. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

6. **Start Backend**
   ```bash
   cd /var/www/lsafe
   pm2 start backend/server.ts --name lsafe-backend --interpreter npx -- ts-node
   pm2 save
   pm2 startup
   ```

7. **Serve Frontend**
   - Copy `dist/` contents to `/var/www/html/`
   - Configure Nginx or Apache to serve from that directory

8. **Configure Reverse Proxy**
   - Set up Nginx/Apache to proxy `/api` requests to `localhost:5050`

---

## 🔧 Environment Configuration

Create a `.env` file for production:

```env
NODE_ENV=production
PORT=5050
```

Update backend to read from environment variables.

---

## 🌐 DNS Configuration

1. Point your domain A record to your VPS IP
2. Wait for DNS propagation (up to 48 hours)
3. Optional: Set up SSL certificate using Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 📊 Current Build Stats

- Total build size: ~1.3 MB
- Main bundle: 333 KB (94 KB gzipped)
- html2pdf library: 982 KB (285 KB gzipped)
- CSS: 28 KB (5.4 KB gzipped)

---

## 🚀 Quick Deploy Commands

### Upload to Hostinger (Static - No Backend)
```bash
# Zip the dist folder
cd c:\Users\tarik\Desktop\lsafe
Compress-Archive -Path dist\* -DestinationPath lsafe-frontend.zip

# Upload lsafe-frontend.zip to Hostinger File Manager
# Extract in public_html/
```

### Test Locally First
```bash
npm run build
npm run serve
# Visit http://localhost:4173
```

---

## ⚠️ Final Warning

**Without backend deployment, your app will:**
- ✅ Load and display pages correctly
- ❌ Fail when users try to scan URLs
- ❌ Show "Failed to fetch report" errors

**You MUST deploy the backend separately or choose VPS hosting for full functionality.**

---

## 📞 Need Help?

If you need assistance setting up VPS hosting or deploying the backend, consider:
1. Hostinger VPS documentation
2. Railway.app for easy Node.js deployment
3. DigitalOcean App Platform tutorials

---

**Build Date**: January 23, 2026  
**Build Status**: ✅ Success  
**Production Ready**: Yes (Frontend) | Requires Backend Setup
