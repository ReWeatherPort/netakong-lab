# 🚀 Deployment Guide - NetaKong Lab

## Current Status
✅ All features implemented and tested locally  
✅ Build successful with 0 errors  
🎯 Ready to deploy to GitHub + Vercel

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables (Optional)
Create `.env.local` file (if needed for future features):
```bash
# Not required for current features, but useful for future:
# SUPABASE_URL=your_supabase_url
# SUPABASE_KEY=your_supabase_key
# GISCUS_REPO_ID=your_repo_id
# GISCUS_CATEGORY_ID=your_category_id
```

### 2. Verify Build
✅ Already done: `npm run build` succeeded

### 3. Update Site URL
After deployment, update RSS feed in `app/rss.xml/route.ts`:
- Line 6: Change `https://netakong.com` to your actual Vercel URL

---

## 🔧 Step 1: Prepare Git Repository

### Check Git Status
```powershell
cd "c:\Users\user\OneDrive\桌面\Python\GitHub\NetaKong Lab\netakong-lab"
git status
```

### Initialize Git (if not already done)
```powershell
# If you see "not a git repository":
git init
git branch -M main
```

### Check Remote Repository
```powershell
git remote -v
```

### Add Remote (if not set)
```powershell
# If no remote is set:
git remote add origin https://github.com/ReWeatherPort/netakong-lab.git
```

### Stage All Changes
```powershell
git add .
```

### Commit Changes
```powershell
git commit -m "feat: Add 9 new features - search, analytics, reading progress, TOC, comments, related posts, RSS feed, OG images, view counter"
```

### Push to GitHub
```powershell
# First time push:
git push -u origin main

# If branch already exists:
git push origin main
```

---

## 🚀 Step 2: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. **Visit Vercel Dashboard**
   - Go to https://vercel.com
   - Log in with GitHub account

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Select **"Import Git Repository"**
   - Choose **ReWeatherPort/netakong-lab**

3. **Configure Project**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **Environment Variables** (Optional)
   - Skip for now (not required)
   - Can add later in Settings → Environment Variables

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build
   - Get your URL: `https://netakong-lab.vercel.app`

### Option B: Vercel CLI

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: netakong-lab
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

---

## 🎯 Step 3: Post-Deployment Configuration

### 1. Update RSS Feed URL

**File:** `app/rss.xml/route.ts`

Replace:
```typescript
const siteUrl = 'https://netakong.com';
```

With your Vercel URL:
```typescript
const siteUrl = 'https://netakong-lab.vercel.app'; // or your custom domain
```

Commit and push:
```powershell
git add app/rss.xml/route.ts
git commit -m "chore: Update RSS feed URL"
git push origin main
```

### 2. Enable Giscus Comments

**Enable GitHub Discussions:**
1. Go to https://github.com/ReWeatherPort/netakong-lab/settings
2. Scroll to **Features**
3. Check ✅ **Discussions**

**Install Giscus App:**
1. Visit https://github.com/apps/giscus
2. Click **Configure**
3. Select **ReWeatherPort/netakong-lab**
4. Click **Install**

**Get Configuration IDs:**
1. Visit https://giscus.app
2. Enter: `ReWeatherPort/netakong-lab`
3. Choose mapping: **pathname**
4. Create categories:
   - "Blog Comments"
   - "Lab Notes Comments"
5. Copy the generated `data-repo-id` and `data-category-id`

**Update Code:**

Edit `app/blog/[slug]/page.tsx`:
```typescript
<GiscusComments
  repo="ReWeatherPort/netakong-lab"
  repoId="R_YOUR_ACTUAL_REPO_ID"  // ← Paste from giscus.app
  category="Blog Comments"
  categoryId="DIC_YOUR_CATEGORY_ID"  // ← Paste from giscus.app
  mapping="pathname"
  lang={language === 'zh-TW' ? 'zh-TW' : 'en'}
/>
```

Edit `app/lab-notes/[slug]/page.tsx`:
```typescript
<GiscusComments
  repo="ReWeatherPort/netakong-lab"
  repoId="R_YOUR_ACTUAL_REPO_ID"  // ← Same as above
  category="Lab Notes Comments"
  categoryId="DIC_YOUR_OTHER_CATEGORY_ID"  // ← Different category
  mapping="pathname"
  lang={language === 'zh-TW' ? 'zh-TW' : 'en'}
/>
```

Commit and deploy:
```powershell
git add .
git commit -m "feat: Configure Giscus comments"
git push origin main
```

### 3. Set Up Custom Domain (Optional)

**In Vercel Dashboard:**
1. Go to project **Settings** → **Domains**
2. Add your domain: `netakong.com`
3. Follow DNS configuration instructions
4. Update all URLs in code after setup

---

## 📊 Step 4: Verify Analytics

**Vercel Analytics:**
1. Go to https://vercel.com/ReWeatherPort/netakong-lab/analytics
2. Wait 24 hours for first data
3. Monitor page views, top pages, visitor countries

**What's Tracked:**
- Page views per route
- Unique visitors
- Performance metrics (Web Vitals)
- Traffic sources
- Device types

---

## 🧪 Step 5: Test Deployed Features

### Test Checklist

1. **Homepage**
   - [ ] Loads correctly
   - [ ] Search bar in header (⌘K/Ctrl+K)
   - [ ] Theme toggle works
   - [ ] Language toggle works

2. **Blog Post**
   - [ ] Visit `/blog/polymarket-trading-strategies-2024`
   - [ ] Reading progress bar visible at top
   - [ ] Table of contents in sidebar (desktop)
   - [ ] View counter increments on refresh
   - [ ] Related posts section appears
   - [ ] Comments section loads (after Giscus setup)

3. **Lab Notes**
   - [ ] Visit `/lab-notes/freqtrade-backtesting-optimization`
   - [ ] Same features as blog posts
   - [ ] Type badge shows correctly
   - [ ] Purple theme instead of blue

4. **Search**
   - [ ] Press ⌘K/Ctrl+K
   - [ ] Search for "Polymarket"
   - [ ] Results appear instantly
   - [ ] Click result navigates correctly

5. **RSS Feed**
   - [ ] Visit `/rss.xml`
   - [ ] XML displays correctly
   - [ ] All posts listed
   - [ ] Try in RSS reader (Feedly, Inoreader)

6. **Open Graph Images**
   - [ ] Share blog post on Twitter/LinkedIn
   - [ ] Preview card shows custom OG image
   - [ ] Direct test: `/blog/[slug]/opengraph-image`

7. **Mobile**
   - [ ] Search works on mobile
   - [ ] Reading progress visible
   - [ ] TOC hidden (desktop only)
   - [ ] Comments load properly

---

## 🔄 Continuous Deployment

Vercel automatically deploys on every push:

```powershell
# Make changes locally
# ... edit files ...

# Commit and push
git add .
git commit -m "feat: Add new blog post"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Builds project
# 3. Deploys to production
# 4. Updates in ~2 minutes
```

**Preview Deployments:**
- Every branch gets a preview URL
- PRs get automatic preview links
- Test before merging to main

---

## 📝 Adding New Content

### New Blog Post

1. **Edit** `data/blog-posts.ts`:
```typescript
{
  slug: 'my-new-post',
  title: 'My New Post',
  titleZh: '我的新文章',
  date: '2024-12-12',
  excerpt: 'Post summary',
  excerptZh: '文章摘要',
  category: 'AI',
  categoryZh: '人工智慧',
  tags: ['AI', 'Python'],
  readTime: '10 min read',
  content: `# My New Post\n\nContent here...`,
  contentZh: `# 我的新文章\n\n內容...`,
  author: 'Bryan / Weather',
  published: true,
}
```

2. **Commit and push**:
```powershell
git add data/blog-posts.ts
git commit -m "feat: Add new blog post"
git push origin main
```

3. **Auto-deployed!**
   - RSS feed updates
   - OG image generates
   - Search index updates
   - Related posts recalculate

### New Lab Note

Same process in `data/lab-notes.ts`

---

## 🛠️ Troubleshooting

### Build Fails on Vercel

**Check logs:**
```
Vercel Dashboard → Deployments → Click failed deployment → View logs
```

**Common issues:**
- Missing dependencies: `npm install <package>`
- TypeScript errors: `npm run build` locally first
- Environment variables: Add in Vercel settings

### Comments Not Showing

1. Check Giscus IDs are correct
2. Verify Discussions enabled on GitHub
3. Check browser console for errors
4. Ensure public repository (or private with Giscus)

### Analytics Not Working

- Wait 24 hours for first data
- Verify `<Analytics />` in layout.tsx
- Check Vercel dashboard for integration status

### Search Not Working

- Check Fuse.js installed: `npm list fuse.js`
- Verify data imports in search-bar.tsx
- Check browser console for errors

### OG Images Not Generating

- Verify `@vercel/og` installed
- Check edge runtime enabled
- Test locally: `/blog/[slug]/opengraph-image`

---

## 🔐 Security Best Practices

### Environment Variables
Never commit:
- API keys
- Database URLs
- Secret tokens

Use Vercel environment variables instead.

### Dependencies
Keep updated:
```powershell
npm audit
npm audit fix
npm outdated
npm update
```

### HTTPS
Vercel automatically provides SSL certificates.

---

## 📈 Performance Optimization

Already optimized:
- ✅ Static generation where possible
- ✅ Edge runtime for API routes
- ✅ Image optimization via Next.js
- ✅ Code splitting automatic
- ✅ Tree shaking enabled

**Monitor Web Vitals:**
- Vercel Analytics → Speed Insights
- Target: All metrics "Good"

---

## 🎯 Next Steps After Deployment

1. **Share Your Site**
   - Twitter: Post your Vercel URL
   - LinkedIn: Share a blog post
   - GitHub: Update README with live link

2. **Monitor Analytics**
   - Check daily for first week
   - Identify popular content
   - Optimize based on data

3. **Engage Community**
   - Respond to comments (Giscus)
   - Share on social media
   - Cross-post to Medium/Dev.to

4. **Add More Content**
   - Write new blog posts
   - Document experiments
   - Share on social media

5. **Upgrade View Counter** (Optional)
   - Switch to Vercel KV for persistence
   - Or use Supabase for database storage

---

## 📚 Useful Commands Reference

```powershell
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Run production build

# Git
git status               # Check status
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push origin main     # Push to GitHub
git log --oneline        # View commit history

# Vercel
vercel                   # Deploy preview
vercel --prod            # Deploy production
vercel logs              # View logs
vercel env ls            # List env variables

# Debugging
npm run build            # Check build locally
npm list                 # Check installed packages
npm outdated             # Check outdated packages
```

---

## ✅ Deployment Checklist

Before going live:
- [ ] Run `npm run build` successfully
- [ ] Commit all changes to Git
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Update RSS feed URL
- [ ] Configure Giscus comments
- [ ] Test all features on production
- [ ] Monitor analytics
- [ ] Share on social media!

---

## 🆘 Support Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Giscus Setup:** https://giscus.app
- **GitHub Issues:** https://github.com/ReWeatherPort/netakong-lab/issues

---

## 🎉 You're Ready!

Your NetaKong Lab is production-ready with all 9 features:
1. ✅ Search
2. ✅ Analytics
3. ✅ Reading Progress
4. ✅ Table of Contents
5. ✅ Comments (needs setup)
6. ✅ Related Posts
7. ✅ RSS Feed
8. ✅ OG Images
9. ✅ View Counter

**Time to deploy:** ~10 minutes  
**Estimated traffic:** 100s of visitors/month  
**Zero hosting costs** with Vercel free tier

Good luck! 🚀
