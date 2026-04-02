# LSafe - Hostinger Deployment Guide

## Prerequisites
- Hostinger hosting account
- Node.js installed locally (for building)
- FTP client (FileZilla recommended) or access to Hostinger File Manager

## Step 1: Build Production Version

Run the following command in your project directory:

```bash
npm run build
```

This will create a `dist` folder with all optimized production files.

## Step 2: Prepare Files for Upload

After building, you'll have a `dist` folder containing:
- index.html
- assets/ (CSS, JS, images)
- manifest.json
- robots.txt
- sitemap.xml
- sw.js (service worker)
- .htaccess
- LSave4.png (logo)

## Step 3: Upload to Hostinger

### Option A: Using File Manager (Easiest)
1. Log in to your Hostinger control panel (hPanel)
2. Go to **Files** → **File Manager**
3. Navigate to `public_html` directory
4. Delete any existing files (if this is a new site)
5. Upload ALL files from the `dist` folder to `public_html`
6. Ensure `.htaccess` file is uploaded (it may be hidden by default)

### Option B: Using FTP Client
1. Download FileZilla or use your preferred FTP client
2. Get FTP credentials from Hostinger:
   - Host: ftp.yourdomain.com
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21
3. Connect to your server
4. Navigate to `public_html` folder
5. Upload all files from `dist` folder

## Step 4: Configure Domain (if using custom domain)

1. In Hostinger hPanel, go to **Domains**
2. Point your domain to the `public_html` directory
3. Wait for DNS propagation (can take up to 24-48 hours)

## Step 5: Enable SSL Certificate

1. In Hostinger hPanel, go to **SSL**
2. Install free SSL certificate (Let's Encrypt)
3. Enable "Force HTTPS" to redirect all traffic to secure connection

## Step 6: Verify Deployment

Visit your website and check:
- ✅ Homepage loads correctly
- ✅ All navigation links work (Home, About, FAQ, Privacy, Terms)
- ✅ URL scanner functionality works
- ✅ Logo and images display properly
- ✅ HTTPS is enabled (green padlock in browser)

## Important Files for Hostinger

### .htaccess (Already included)
This file ensures proper routing for React single-page application. It redirects all requests to index.html.

## Troubleshooting

### Issue: 404 errors on page refresh
**Solution**: Make sure `.htaccess` file is uploaded to `public_html`

### Issue: Site shows "Index of /" directory listing
**Solution**: Ensure `index.html` is in the root of `public_html`

### Issue: CSS/JS not loading
**Solution**: Check that the `assets` folder uploaded correctly

### Issue: Images not displaying
**Solution**: Verify `LSave4.png` is in the root directory

### Issue: Routing doesn't work
**Solution**: Verify `.htaccess` has correct rewrite rules

## Post-Deployment Checklist

- [ ] Build production version (`npm run build`)
- [ ] Upload all `dist` folder contents to `public_html`
- [ ] Verify `.htaccess` is present
- [ ] Configure domain (if applicable)
- [ ] Enable SSL certificate
- [ ] Test all pages and functionality
- [ ] Submit sitemap to Google Search Console
- [ ] Test on mobile devices
- [ ] Check page load speed

## Performance Optimization (Already Configured)

The deployment includes:
- ✅ Gzip compression
- ✅ Browser caching (1 year for images, 1 month for CSS/JS)
- ✅ Minified CSS and JavaScript
- ✅ Optimized images
- ✅ Security headers

## Support

If you encounter issues:
1. Check Hostinger's knowledge base
2. Contact Hostinger support via live chat
3. Check browser console for JavaScript errors
4. Verify file permissions (should be 644 for files, 755 for folders)

---

**Your LSafe app is now ready for production!** 🚀
