# Deployment Guide

This document outlines how to deploy the Greeks Simulator to production using Vercel (frontend) and Railway/Render (backend).

## Frontend Deployment on Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project root
cd New\ Project

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Create new project and select your GitHub repo
4. Configure build settings:
   - Framework: Vite
   - Build Command: `cd frontend && npm run build`
   - Output Directory: `frontend/dist`
5. Add environment variables:
   - `REACT_APP_API_URL`: Your backend API URL

### Vercel Configuration

The `vercel.json` file in the root configures:
- Build command for Vite frontend
- Environment variables
- Output directory

## Backend Deployment on Railway.app

### Setup

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project
4. Select "Deploy from GitHub"
5. Choose your repository

### Configuration

**Environment Variables:**
```
POSTGRES_USER=admin
POSTGRES_PASSWORD=[generate strong password]
POSTGRES_DB=greeks_simulator
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgresql://admin:[password]@[host]:5432/greeks_simulator
```

**Start Command:**
```
cd backend && pip install -r requirements.txt && uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Deployment

1. Connect GitHub repo
2. Select the main branch
3. Add PostgreSQL add-on (Railway provides managed PostgreSQL)
4. Configure build settings
5. Deploy

## Alternative: Deploy on Render.com

### Backend Deployment

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. New → Web Service
4. Connect your repository
5. Configure:
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Database Setup

1. Create PostgreSQL database on Render
2. Copy connection string
3. Add to environment variables as `DATABASE_URL`

### Environment Variables

```
DATABASE_URL=postgresql://[user]:[password]@[host]:[port]/[database]
BACKEND_URL=[your render app url]
```

## Post-Deployment Configuration

### 1. Update Frontend API URL

After backend is deployed, update the frontend:

1. Go to Vercel project settings
2. Add/update environment variable: `REACT_APP_API_URL=https://[your-backend-url].app`
3. Redeploy

### 2. Initialize Database

```bash
# SSH into your backend container or use a migration tool
# Create necessary tables:

# For Railway/Render, you can run:
cd backend
python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

### 3. Test Deployment

1. Visit your Vercel frontend URL
2. Check browser console for errors
3. Test API endpoints:
   - `https://[your-backend-url]/api/calculator/greeks`
   - `https://[your-backend-url]/health`

## Monitoring & Debugging

### Frontend (Vercel)

- View logs: Vercel Dashboard → Deployments → Select Deployment → Logs
- Monitor performance: Vercel Dashboard → Analytics
- Check errors: Browser DevTools Console

### Backend (Railway/Render)

- Real-time logs: Dashboard → Your Project → Logs
- Monitor resources: Dashboard → Resource Usage
- Scale if needed: Dashboard → Settings → Instance Type

## Production Checklist

- [ ] Frontend deployed on Vercel
- [ ] Backend deployed on Railway/Render
- [ ] PostgreSQL database configured
- [ ] Environment variables set correctly
- [ ] CORS configured for production domain
- [ ] API health checks passing
- [ ] Frontend-Backend connectivity verified
- [ ] Analytics/monitoring enabled
- [ ] Backup strategy in place
- [ ] SSL certificates configured (automatic on Vercel/Railway)

## Cost Estimation

- **Vercel**: Free tier supports most applications
- **Railway**: Free tier with $5/month credit, then $0.000694/hour for backend
- **Render**: Free tier with 15min auto-sleep, paid from $7/month
- **PostgreSQL**: Typically included with backend hosting, or $15/month standalone

## Custom Domain Setup

### Vercel

1. Dashboard → Project Settings → Domains
2. Add your domain
3. Update DNS records as shown in Vercel

### Railway/Render

1. Project Settings → Domains
2. Add custom domain
3. Update DNS records accordingly

## Performance Optimization

### Frontend

1. Enable gzip compression (automatic)
2. Optimize bundle size: `npm run build` outputs size analysis
3. Use lazy loading for routes
4. Cache API responses with Zustand

### Backend

1. Add database indexes for frequently queried fields
2. Implement caching for Greeks calculations
3. Use connection pooling for PostgreSQL
4. Monitor response times in logs

## Security Considerations

- [ ] Set strong PostgreSQL password
- [ ] Enable HTTPS (automatic on Vercel/Railway)
- [ ] Configure CORS correctly (only allow frontend domain)
- [ ] Never commit `.env` file
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting on backend (future enhancement)
- [ ] Add API authentication (future enhancement)

## Rollback Procedures

### Vercel

- Dashboard → Deployments → Select previous deployment → Promote to Production

### Railway/Render

- Redeploy from specific commit on GitHub
- Or maintain Docker image registry for quick rollback

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
