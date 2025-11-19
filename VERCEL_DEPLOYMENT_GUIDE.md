# Vercel Deployment Guide for Malotec Shop Website

## Quick Deployment Steps

### 1. Login to Vercel
- Go to [vercel.com](https://vercel.com)
- Sign in with your account: devsfolk@gmail.com

### 2. Import Your Repository
- Click "New Project"
- Find and select: `devsfolk/malotec-shop-website`
- Click "Import"

### 3. Configure Project Settings
Vercel will auto-detect most settings since this is a Next.js project:

**Framework Preset**: Next.js
**Root Directory**: `./` (default)
**Build Command**: `npm run build` (auto-detected)
**Output Directory**: `.next` (auto-detected)
**Install Command**: `npm install` (auto-detected)
**Node.js Version**: `18.x` (recommended)

### 4. Environment Variables (Optional)
Your project has one optional environment variable:

**ADMIN_PASSWORD**: Admin dashboard password (default: 'burneymalo')

To add this:
- In Vercel dashboard, go to Project Settings > Environment Variables
- Add: `ADMIN_PASSWORD` = `your-preferred-password`

### 5. Deploy
- Click "Deploy"
- Wait for the build to complete (usually 2-3 minutes)
- Your site will be live at: `https://malotec-shop-website.vercel.app` or similar

## Post-Deployment

### Custom Domain (Optional)
- Go to Project Settings > Domains
- Add your custom domain if you have one

### Continuous Deployment
- Vercel automatically deploys on every push to your GitHub repository
- Main branch deployments go to production
- Other branches create preview deployments

## Project Features Supported
✅ Next.js 15.3.3 with TypeScript
✅ Tailwind CSS
✅ React 18.3.1
✅ Firebase integration
✅ Genkit AI integration
✅ Admin dashboard functionality
✅ E-commerce features
✅ Responsive design

## Build Logs
If deployment fails, check:
1. Build logs in Vercel dashboard
2. Ensure all dependencies are compatible
3. Verify environment variables are set correctly

## Troubleshooting
- **Build fails**: Check if all dependencies in package.json are valid
- **Runtime errors**: Check environment variables and API configurations
- **Slow loading**: Consider enabling Vercel's CDN and image optimization

Your project is fully compatible with Vercel's hosting platform!