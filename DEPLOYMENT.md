# Deployment Guide

## Render.com Deployment

This project is configured for deployment on [Render.com](https://render.com). Follow these steps to deploy:

### Prerequisites
1. Create a Render account at https://render.com
2. Connect your GitHub repository to Render
3. Have a PostgreSQL database ready (Render provides free PostgreSQL)

### Deployment Steps

1. **Connect Repository**
   - Go to Render Dashboard
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository: `https://github.com/KL2400030891/review-1`

2. **Configure Services**
   - Render will auto-detect the `render.yaml` file
   - It will automatically create:
     - Backend service (Spring Boot on Java 17)
     - Frontend service (Static site)
     - PostgreSQL database

3. **Set Environment Variables**
   - `JWT_SECRET`: Generate a strong random string for JWT signing
   - `CORS_ALLOWED_ORIGINS`: Your frontend URL (auto-set by render.yaml)
   - Other variables are configured in `render.yaml`

4. **Deploy**
   - Push your code to the `master` branch
   - Render will automatically build and deploy

### Service Details

**Backend Service (placement-system-backend)**
- Runtime: Java 17
- Build: Maven via `mvn clean package`
- Start: `java -jar target/placement-system-1.0.0.jar`
- Port: 10000 (Render assigns dynamically)
- Database: PostgreSQL

**Frontend Service (placement-system-frontend)**
- Build: Vite + React
- Command: `npm install && npm run build`
- Static files served from: `frontend/dist`
- API calls to backend via `VITE_API_URL`

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
