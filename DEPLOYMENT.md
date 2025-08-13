# Deployment Guide for Product List App

## Deploying to Render

### Step 1: Deploy JSON Server API

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" and select "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**

   - **Name**: `product-list-api` (or your preferred name)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start:server`
   - **Plan**: Free

5. **Add Environment Variables:**

   - `NODE_ENV`: `production`
   - `PORT`: `10000` (or any port you prefer)

6. **Click "Create Web Service"**

### Step 2: Deploy React Frontend

1. **Click "New +" and select "Static Site"**
2. **Connect your GitHub repository**
3. **Configure the service:**

   - **Name**: `product-list-frontend` (or your preferred name)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

4. **Add Environment Variables:**

   - `VITE_API_BASE_URL`: `https://your-api-name.onrender.com` (replace with your actual API URL)
   - `VITE_DB_URL`: `https://your-api-name.onrender.com` (replace with your actual API URL)

5. **Click "Create Static Site"**

### Step 3: Update Environment Variables

After deployment, update the environment variables in your frontend service with the actual URLs from your API service.

### Important Notes:

- The free plan has limitations:

  - Services may sleep after 15 minutes of inactivity
  - Limited bandwidth and build minutes
  - Services wake up automatically when accessed

- Your JSON server will be accessible at: `https://your-api-name.onrender.com`
- Your React app will be accessible at: `https://your-frontend-name.onrender.com`

### Troubleshooting:

- If the API doesn't work, check that the `start:server` script is working locally
- Ensure your `db.json` file is committed to the repository
- Check Render logs for any build or runtime errors
- The `start:server` script now uses `${PORT:-3001}` which provides a default port if $PORT is not set
- **IMPORTANT**: `json-server` is now in `dependencies` (not `devDependencies`) so it's available in production
