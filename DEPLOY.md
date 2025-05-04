# Deployment Instructions for Mini Job Board

This document provides step-by-step instructions to deploy the Mini Job Board application to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- A Supabase project already set up with the required schema and policies

## Steps to Deploy

### 1. Push Your Code to GitHub

1. Create a new repository on GitHub
2. Initialize Git in your local project (if not already done):
   ```bash
   git init
   ```
3. Add all files to Git:
   ```bash
   git add .
   ```
4. Commit the changes:
   ```bash
   git commit -m "Initial commit"
   ```
5. Add the GitHub repository as a remote:
   ```bash
   git remote add origin https://github.com/yourusername/mini-job-board.git
   ```
6. Push the code to GitHub:
   ```bash
   git push -u origin main
   ```

### 2. Deploy to Vercel

1. Log in to your Vercel account
2. Click on "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: Leave as default (or select `/mini-job-board` if you pushed the parent directory)
   - Build Command: Leave as default (`next build`)
   - Output Directory: Leave as default (`.next`)
5. Add environment variables:
   - NEXT_PUBLIC_SUPABASE_URL: Your Supabase URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anon key
6. Click "Deploy"

### 3. Verify Deployment

1. Once deployment is complete, Vercel will provide a URL to access your application
2. Click on the URL to verify that the application is working correctly
3. Test the core features:
   - Sign up and sign in
   - Create a job posting
   - Browse job listings
   - Filter jobs
   - View your dashboard

### 4. Configure Custom Domain (Optional)

1. In your Vercel project, go to "Settings" > "Domains"
2. Add your custom domain and follow the instructions to configure DNS settings

### 5. Setup Continuous Deployment

Vercel automatically sets up continuous deployment from your GitHub repository. Any changes pushed to the main branch will trigger a new deployment.

## Troubleshooting

If you encounter any issues during deployment:

1. Check the build logs in Vercel for error messages
2. Verify your environment variables are correctly set
3. Make sure your Supabase project is correctly configured
4. Check if your database schema matches the expected structure

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)
- [Supabase Documentation](https://supabase.com/docs)