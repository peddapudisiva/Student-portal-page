# Deployment Guide - IXL Student Portal

Follow these steps to deploy your portal to the internet (Vercel) and connect it to your live Supabase database.

## 1. Prepare Your Environment
Your portal requires specific environment variables to function in production. 

| Variable | Description | Where to find it? |
|----------|-------------|-------------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase Project URL | Supabase Dashboard -> Settings -> API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase Anon Key | Supabase Dashboard -> Settings -> API |
| `NEXT_PUBLIC_GEMINI_API_KEY` | (Optional) Gemini AI Key | Google AI Studio |

## 2. Deploy to Vercel (Recommended)
1. **Push to GitHub**: Initialize a Git repository in your `student portal` folder and push it to GitHub.
2. **Import to Vercel**: 
   - Go to [vercel.com](https://vercel.com) and click **"Add New" -> "Project"**.
   - Import your GitHub repository.
3. **Configure Environment Variables**:
   - In the Vercel project settings, go to the **"Environment Variables"** tab.
   - Copy the values from your `.env.local` file into Vercel.
4. **Deploy**: Click **"Deploy"**. Your site will be live in ~2 minutes!

## 3. Database Reminders
- Ensure you have applied the schema in `database_production.sql` to your Supabase SQL Editor.
- The portal is currently configured for self-registration. Anyone with the URL can create a student account.

## 4. Troubleshooting
- **Build Errors**: If the build fails, ensure all local changes are committed.
- **Login Stuck**: Check if your Supabase URL/Key match exactly in the Vercel settings.
- **Rate Limits**: If registration fails, it might be due to Supabase's email rate limit. You can disable email confirmation in Supabase Auth -> Providers -> Email -> "Confirm email" (toggle off) for faster testing.

---
*Created by Antigravity for IXL Integrated School.*
