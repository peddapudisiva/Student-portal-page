# IXL Student Portal - Deployment Guide (Vercel)

This project is optimized for deployment on **Vercel**. Follow these steps to take your school portal live.

---

## 🚀 1. Set Up Production Supabase

1.  **Create a New Project**: Go to [Supabase](https://supabase.com) and create a new project called "IXL Production".
2.  **Apply Schema**: 
    - Open the **SQL Editor** in your Supabase dashboard.
    - Copy the contents of **[database_production.sql](file:///c:/Users/user/student%20portal/database_production.sql)**.
    - Paste and click **Run**.
3.  **Get Keys**: 
    - Go to **Project Settings** > **API**.
    - Copy the `Project URL` and `anon public` Key.

---

## ☁️ 2. Deploy to Vercel

1.  **Repo Connection**: Push your latest code to your GitHub repository.
2.  **Import**: In the [Vercel Dashboard](https://vercel.com/new), import your repository.
3.  **Configure Environment Variables**:
    In the "Environment Variables" section of the Vercel setup, add:
    - `NEXT_PUBLIC_SUPABASE_URL` = (Your Production Supabase URL)
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Your Production Anon Key)
    - `NEXT_PUBLIC_GEMINI_API_KEY` = (Your Gemini API Key for the AI Tutor)
4.  **Deploy**: Click **Deploy**. Vercel will build the project and give you a live URL!

---

## 🛠️ 3. Post-Deployment Checklist

- [ ] **Login**: Test the email/password login on the live URL.
- [ ] **Registration**: Create a test student account to verify the profile is saved in your production database.
- [ ] **AI Tutor**: Ask the AI Tutor a question to ensure your Gemini key is working.
- [ ] **Navigation**: Verify all 14+ screens load correctly.

---

## ❓ Troubleshooting

- **Build Failures**: This project has been pre-verified with `npm run build`. If it fails on Vercel, check that your `node` version in Vercel settings is set to **20.x or higher**.
- **Images Not Loading**: Ensure your `public` folder contains all required branding assets.
- **Table Not Found**: Double-check that you ran the SQL script in Step 1.

**Project Status**: READY FOR LIVE ENVIRONMENT
