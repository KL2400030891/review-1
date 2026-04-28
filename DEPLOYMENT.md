# Deployment Guide

## Render.com Deployment

This project is configured for deployment on [Render.com](https://render.com). Follow these steps to deploy:

### Prerequisites
1. Create a Render account at https://render.com
2. Connect your GitHub repository to Render
3. Have a PostgreSQL database ready (Render provides free PostgreSQL)

### Important: How Render Detects Services

Render.com reads the `render.yaml` file at the root of your repository to identify and deploy multiple services:

- **Backend Service**: Java 17 + Spring Boot + PostgreSQL
- **Frontend Service**: Node.js 18 + React/Vite + serve
- **Database**: PostgreSQL (automatically provisioned)

The `render.yaml` file specifies:
- Build commands for each service (including `cd` into subdirectories)
- Start commands to run each service
- Environment variables and database connections
- Port configurations and health checks

### Root package.json Role

The root `package.json` file defines this as a monorepo using Node.js workspaces. This prevents Render from attempting to build the root directory as a standalone Node application.

### Deployment Steps

1. **Connect Repository to Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service" or "PostgreSQL"
   - Connect GitHub repository: `https://github.com/KL2400030891/review-1`
   - Choose the `master` branch

2. **Render Auto-Discovery**
   - Render automatically detects `render.yaml`
   - Services are created based on the YAML configuration
   - Database is provisioned with credentials automatically injected

3. **Configure Environment Variables** (Optional - mostly auto-configured)
   - `JWT_SECRET`: Change to a strong random string in production
   - `CORS_ALLOWED_ORIGINS`: Frontend URL (auto-set in render.yaml)
   - All database credentials are auto-injected from the PostgreSQL service
   - Node.js and Java versions are specified in render.yaml

4. **Deploy**
   - Push to `master` branch
   - Render automatically detects changes and redeploys
   - Check logs in Render Dashboard for build/deployment status

### Service Configuration in render.yaml

**Backend Service (placement-system-backend)**
- Runtime: Java 17
- Build Command: `cd backend && mvn clean package -DskipTests`
  - Cleans previous builds, compiles code, and packages into JAR
  - Skips tests for faster deployment
  - Output: `backend/target/placement-system-1.0.0.jar`
- Start Command: `cd backend && java -jar target/placement-system-1.0.0.jar`
  - Runs the Spring Boot application
  - Uses `SPRING_PROFILES_ACTIVE=prod` profile
  - Connects to PostgreSQL database via injected environment variables
- Health Check: `/` endpoint (Spring Boot default)
- Port: Dynamically assigned by Render (set via `SERVER_PORT` env var)

**Frontend Service (placement-system-frontend)**
- Runtime: Node.js 18
- Build Command: `cd frontend && npm ci && npm run build`
  - `npm ci` (clean install) for reproducible builds
  - Runs Vite build process
  - Output: `frontend/dist/` (optimized static files)
- Start Command: `cd frontend && npm install -g serve && serve -s dist -l 3000`
  - Installs `serve` package globally
  - Serves built Vite frontend as static site
  - Port: 3000
- API URL: Points to backend service via `VITE_API_URL` environment variable
- Environment: Production mode (optimized builds)

### Database Configuration

The PostgreSQL database is automatically provisioned and connected via:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

These are injected from the database service defined in `render.yaml`.

### Accessing the Application

Once deployed:
- **Frontend**: https://placement-system-frontend.onrender.com
- **Backend API**: https://placement-system-backend.onrender.com
- **H2 Console**: Disabled in production (use PostgreSQL instead)

### Logs

Monitor your deployment:
1. Go to Render Dashboard
2. Select your service
3. View logs in real-time
4. Check metrics and health status

### Troubleshooting

**Build Fails**
- Check the build logs in Render Dashboard
- Ensure `pom.xml` has correct Java version (17)
- Confirm `package.json` exists in frontend directory

**Database Connection Issues**
- Verify database credentials in environment variables
- Check that PostgreSQL service is running
- Review database connection logs

**Frontend Not Loading**
- Check `VITE_API_URL` is correctly pointing to backend
- Verify backend service is running
- Check browser console for API errors

### Local Development

To test locally before deploying:

```bash
# Backend
cd backend
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"

# Frontend (in another terminal)
cd frontend
npm install
npm run dev
```

Access the app at `http://localhost:5173`.

### Scaling

For production workloads:
1. Upgrade from Free plan to Starter+ plan
2. Increase database connections if needed
3. Enable auto-scaling for backend service
4. Configure CDN for frontend static assets

### Security

Remember to:
- Change `JWT_SECRET` to a strong random value
- Use HTTPS (Render handles this automatically)
- Set `spring.jpa.hibernate.ddl-auto=validate` in production
- Enable rate limiting and CORS properly
- Use environment variables for sensitive data

For more information, visit: https://render.com/docs
