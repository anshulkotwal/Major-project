# Deployment Guide

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB 7+
- OpenAI API key

### Steps

1. Install dependencies:
```bash
npm run install-all
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start MongoDB:
```bash
mongod
```

4. Run development server:
```bash
npm run dev
```

---

## Docker Deployment

### Build and Run

```bash
docker-compose up --build
```

This will:
- Start MongoDB container
- Build and start the application
- Expose ports 5000 (API) and 27017 (MongoDB)

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f app
```

---

## Production Deployment

### Environment Variables

Required environment variables for production:

```env
PORT=5000
MONGODB_URI=mongodb://your-mongo-host:27017/learning-assistant
JWT_SECRET=your-secure-jwt-secret
OPENAI_API_KEY=your-openai-api-key
NODE_ENV=production
CLIENT_URL=https://your-domain.com
```

### Build Frontend

```bash
cd client
npm run build
```

### Serve Static Files

Update `server/index.js` to serve built frontend:

```javascript
const path = require('path');

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}
```

---

## Cloud Deployment Options

### Heroku

1. Create Heroku app:
```bash
heroku create your-app-name
```

2. Add MongoDB addon:
```bash
heroku addons:create mongolab
```

3. Set environment variables:
```bash
heroku config:set JWT_SECRET=your-secret
heroku config:set OPENAI_API_KEY=your-key
```

4. Deploy:
```bash
git push heroku main
```

### AWS EC2

1. Launch EC2 instance (Ubuntu 22.04)
2. Install Node.js and MongoDB
3. Clone repository
4. Configure environment variables
5. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server/index.js --name learning-assistant
pm2 startup
pm2 save
```

### DigitalOcean

1. Create Droplet (Node.js)
2. Setup MongoDB
3. Clone and configure
4. Use Nginx as reverse proxy
5. Setup SSL with Let's Encrypt

### Vercel (Frontend) + MongoDB Atlas (Database)

1. Deploy frontend to Vercel:
```bash
cd client
vercel
```

2. Setup MongoDB Atlas cluster
3. Deploy backend to Heroku/Railway
4. Update CORS and API URLs

---

## Database Setup

### MongoDB Atlas (Cloud)

1. Create cluster at mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Update MONGODB_URI in .env

### Local MongoDB

```bash
# Install MongoDB
# Ubuntu
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Start service
sudo systemctl start mongodb
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt

```bash
sudo apt-get install certbot
sudo certbot --nginx -d your-domain.com
```

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Monitoring

### PM2 Monitoring

```bash
pm2 monit
pm2 logs
pm2 status
```

### Health Check Endpoint

Add to `server/index.js`:

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});
```

---

## Backup Strategy

### MongoDB Backup

```bash
# Backup
mongodump --uri="mongodb://localhost:27017/learning-assistant" --out=/backup

# Restore
mongorestore --uri="mongodb://localhost:27017/learning-assistant" /backup
```

### Automated Backups

Setup cron job:
```bash
0 2 * * * mongodump --uri="mongodb://localhost:27017/learning-assistant" --out=/backup/$(date +\%Y\%m\%d)
```

---

## Performance Optimization

1. Enable gzip compression
2. Use CDN for static assets
3. Implement Redis caching
4. Database indexing
5. Load balancing with multiple instances
6. Monitor with New Relic or DataDog
