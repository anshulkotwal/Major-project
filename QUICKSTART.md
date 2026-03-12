# Quick Start Guide

Get the Personalized Learning Assistant up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB 7+ installed (or use Docker)
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Installation Steps

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd personalized-learning-assistant

# Install all dependencies
npm run install-all
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learning-assistant
JWT_SECRET=your_random_secret_key_here
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Start MongoDB

**Option A: Using Docker (Recommended)**
```bash
docker-compose up -d mongodb
```

**Option B: Local MongoDB**
```bash
mongod
```

### 4. Run the Application

```bash
npm run dev
```

This starts both frontend and backend:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## First Time Setup

### 1. Create an Account

1. Open http://localhost:5173
2. Click "Get Started" or "Sign Up"
3. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: (min 6 characters)
   - Role: Student
4. Click "Sign Up"

### 2. Explore the Dashboard

After registration, you'll see:
- Performance statistics (initially empty)
- AI Tutor button (top right)
- Recommendations section
- Study path tracker

### 3. Try the AI Tutor

1. Click "AI Tutor" button
2. Ask a question like:
   - "Explain quadratic equations"
   - "Help me understand photosynthesis"
   - "What are the basics of JavaScript?"
3. Get instant AI-powered responses!

### 4. Submit a Quiz (Optional)

To see the recommendation system in action:

```bash
# Use API directly or create a simple form
curl -X POST http://localhost:5000/api/quiz/submit \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Mathematics",
    "score": 45,
    "timeSpent": 1800,
    "questionsAttempted": 20,
    "correctAnswers": 9
  }'
```

This will trigger AI recommendations for weak topics!

## Common Issues

### MongoDB Connection Error

**Error**: `MongooseServerSelectionError`

**Solution**:
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod

# Or use Docker
docker-compose up -d mongodb
```

### OpenAI API Error

**Error**: `Invalid API key`

**Solution**:
1. Get API key from https://platform.openai.com/api-keys
2. Update `.env` file with correct key
3. Restart the server

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
```bash
# Find and kill the process
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### Frontend Not Loading

**Solution**:
```bash
# Clear cache and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Next Steps

1. **Explore Features**
   - Try different AI tutor questions
   - Check performance analytics
   - View recommendations

2. **Read Documentation**
   - [Features Guide](FEATURES.md)
   - [API Documentation](API_DOCUMENTATION.md)
   - [Architecture Overview](ARCHITECTURE.md)

3. **Customize**
   - Modify UI components
   - Add new features
   - Integrate additional AI models

4. **Deploy**
   - Follow [Deployment Guide](DEPLOYMENT.md)
   - Deploy to Heroku, AWS, or Vercel

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Vite HMR (instant updates)
- Backend: Nodemon (auto-restart on changes)

### Debug Mode

```bash
# Backend with debug logs
DEBUG=* npm run server

# Frontend with React DevTools
# Install React DevTools browser extension
```

### Database GUI

Use MongoDB Compass for visual database management:
```
Connection String: mongodb://localhost:27017/learning-assistant
```

## Testing

```bash
# Run tests (when implemented)
npm test

# Check code quality
npm run lint
```

## Getting Help

- Check [README.md](README.md) for detailed documentation
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Open an issue on GitHub for bugs or questions

## Quick Commands Reference

```bash
# Install everything
npm run install-all

# Development mode (both frontend + backend)
npm run dev

# Backend only
npm run server

# Frontend only
npm run client

# Build for production
npm run build

# Docker deployment
docker-compose up --build

# Stop Docker
docker-compose down
```

Happy Learning! 🚀
