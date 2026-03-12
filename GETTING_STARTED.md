# Getting Started with Personalized Learning Assistant

Welcome! This guide will help you get the application running in minutes.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 18+** - [Download here](https://nodejs.org/)
- ✅ **MongoDB 7+** - [Download here](https://www.mongodb.com/try/download/community) or use Docker
- ✅ **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
- ✅ **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start (5 Minutes)

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd personalized-learning-assistant

# Run verification script
node verify-setup.js

# Install all dependencies
npm run install-all
```

### Step 2: Configure Environment

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` file with your settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learning-assistant
JWT_SECRET=your_super_secret_jwt_key_change_this
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**Important**: 
- Replace `JWT_SECRET` with a random string (at least 32 characters)
- Add your OpenAI API key from https://platform.openai.com/api-keys

### Step 3: Start MongoDB

**Option A: Using Docker (Recommended)**
```bash
docker-compose up -d mongodb
```

**Option B: Local MongoDB**
```bash
# Start MongoDB service
mongod

# Or on Windows
net start MongoDB

# Or on macOS/Linux
sudo systemctl start mongodb
```

### Step 4: Launch Application

```bash
npm run dev
```

This will start:
- ✅ Backend API on http://localhost:5000
- ✅ Frontend on http://localhost:5173

## 🎯 First Steps

### 1. Open the Application

Navigate to http://localhost:5173 in your browser.

### 2. Create Your Account

1. Click "Get Started" or "Sign Up"
2. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: (minimum 6 characters)
   - Role: Select "Student"
3. Click "Sign Up"

### 3. Explore the Dashboard

After registration, you'll see:
- 📊 Performance statistics
- 🤖 AI Tutor button (top right)
- 📚 Recommendations section
- 📈 Study path tracker

### 4. Try the AI Tutor

1. Click the "AI Tutor" button
2. Ask questions like:
   - "Explain photosynthesis"
   - "Help me understand calculus"
   - "What is machine learning?"
3. Get instant AI-powered responses!

## 📖 Understanding the Interface

### Student Dashboard

**Top Navigation**
- Logo and app name
- Theme toggle (dark/light mode)
- User profile
- Logout button

**Sidebar**
- Dashboard (home)
- Performance (analytics)
- Resources (learning materials)
- Settings

**Main Content**
- Stats cards (score, time, questions, accuracy)
- Performance chart
- Weak topics alert
- Recommendations
- Study path

**AI Chat (Sidebar)**
- Real-time chat interface
- Message history
- Context-aware responses

### Key Features to Try

1. **AI Chat Tutor**
   - Click "AI Tutor" button
   - Ask any educational question
   - Get detailed explanations

2. **Performance Tracking**
   - Submit quiz results via API
   - View analytics charts
   - Track progress over time

3. **Recommendations**
   - Automatically generated based on performance
   - YouTube videos
   - Articles and resources
   - Priority-based sorting

4. **Theme Toggle**
   - Switch between dark and light modes
   - Preference saved automatically

## 🔧 Troubleshooting

### MongoDB Connection Error

**Problem**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution**:
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod

# Or with Docker
docker-compose up -d mongodb

# Verify connection
mongo --eval "db.version()"
```

### OpenAI API Error

**Problem**: `Invalid API key` or `401 Unauthorized`

**Solution**:
1. Get a valid API key from https://platform.openai.com/api-keys
2. Update `.env` file:
   ```env
   OPENAI_API_KEY=sk-your-actual-key-here
   ```
3. Restart the server: `npm run server`

### Port Already in Use

**Problem**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### Dependencies Installation Failed

**Problem**: `npm install` errors

**Solution**:
```bash
# Clear cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json

# Reinstall
npm run install-all
```

### Frontend Not Loading

**Problem**: Blank page or build errors

**Solution**:
```bash
cd client
rm -rf node_modules dist .vite
npm install
npm run dev
```

## 📚 Next Steps

### Learn More

1. **Read Documentation**
   - [Features Guide](FEATURES.md) - Detailed feature descriptions
   - [API Documentation](API_DOCUMENTATION.md) - API reference
   - [Architecture](ARCHITECTURE.md) - System design

2. **Explore Code**
   - Frontend: `client/src/`
   - Backend: `server/`
   - Components: `client/src/components/`

3. **Customize**
   - Modify UI components
   - Add new features
   - Integrate additional APIs

### Development Workflow

```bash
# Start development server
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Build for production
npm run build

# Run with Docker
docker-compose up --build
```

### Testing the API

Use tools like Postman or curl:

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Database Management

Use MongoDB Compass for visual database management:

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to: `mongodb://localhost:27017`
3. Select database: `learning-assistant`
4. View collections: users, performances, recommendations, etc.

## 🎓 Learning Resources

### Project Documentation
- [README.md](README.md) - Main documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [TESTING.md](TESTING.md) - Testing guide

### Technology Stack
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://platform.openai.com/docs)

## 💡 Tips

1. **Keep MongoDB Running**: The app needs MongoDB to be running at all times
2. **API Key Limits**: OpenAI free tier has rate limits
3. **Hot Reload**: Both frontend and backend support hot reload
4. **Dark Mode**: Toggle in the top navigation
5. **Responsive**: Test on different screen sizes

## 🆘 Getting Help

- **Documentation**: Check the `/docs` folder
- **Issues**: Open a GitHub issue
- **Community**: Join our Discord/Slack
- **Email**: support@example.com

## ✅ Verification Checklist

Before you start developing:

- [ ] Node.js installed and working
- [ ] MongoDB running
- [ ] Dependencies installed (`npm run install-all`)
- [ ] `.env` file configured
- [ ] OpenAI API key added
- [ ] Application running (`npm run dev`)
- [ ] Can access http://localhost:5173
- [ ] Can register and login
- [ ] AI chat works

## 🎉 You're Ready!

Congratulations! You now have a fully functional AI-powered learning platform running locally.

Start exploring, building, and learning!

---

**Need help?** Check [QUICKSTART.md](QUICKSTART.md) or [README.md](README.md) for more details.
