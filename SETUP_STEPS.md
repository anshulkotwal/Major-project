# Simple Setup Steps - Start Here! 🚀

Follow these steps in order. Takes about 10 minutes.

---

## Step 1: Choose Your MongoDB Option

### 🎯 Easiest: Use Docker

```bash
# Just run this command:
docker-compose up -d mongodb
```

Your `.env` already has the correct URI:
```env
MONGODB_URI=mongodb://localhost:27017/learning-assistant
```

✅ **Done! Skip to Step 2.**

---

### 🌐 Alternative: Use MongoDB Atlas (Cloud - Free)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster (M0)
4. Create database user:
   - Username: `learningapp`
   - Password: (save this!)
5. Whitelist IP: Click "Allow Access from Anywhere"
6. Get connection string (looks like):
   ```
   mongodb+srv://learningapp:password@cluster0.xxxxx.mongodb.net/
   ```
7. Update `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://learningapp:YourPassword@cluster0.xxxxx.mongodb.net/learning-assistant?retryWrites=true&w=majority
   ```

📖 **Detailed guide**: See [MONGODB_SETUP.md](MONGODB_SETUP.md)

---

## Step 2: Generate JWT Secret

Run this command:
```bash
node generate-jwt-secret.js
```

Copy the generated secret and paste it in `.env`:
```env
JWT_SECRET=paste_the_generated_secret_here
```

---

## Step 3: Get OpenAI API Key

1. Go to: https://platform.openai.com/signup
2. Create account (free)
3. Go to: https://platform.openai.com/api-keys
4. Click "Create new secret key"
5. Copy the key (starts with `sk-`)
6. Paste in `.env`:
   ```env
   OPENAI_API_KEY=sk-your-key-here
   ```

**Note**: OpenAI gives free credits for new accounts!

---

## Step 4: Install Dependencies

```bash
npm run install-all
```

This installs both backend and frontend dependencies. Takes 2-3 minutes.

---

## Step 5: Start the Application

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
Frontend running on http://localhost:5173
```

---

## Step 6: Open in Browser

Go to: http://localhost:5173

You should see the landing page! 🎉

---

## Step 7: Create Your Account

1. Click "Get Started" or "Sign Up"
2. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: (min 6 characters)
   - Role: Student
3. Click "Sign Up"

You'll be redirected to your dashboard!

---

## Step 8: Try the AI Tutor

1. Click "AI Tutor" button (top right)
2. Ask a question like:
   - "Explain photosynthesis"
   - "What is calculus?"
   - "Help me understand JavaScript"
3. Get instant AI responses!

---

## ✅ Your `.env` File Should Look Like:

```env
PORT=5000

# MongoDB (choose one)
MONGODB_URI=mongodb://localhost:27017/learning-assistant

# JWT Secret (generated)
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6

# OpenAI API Key
OPENAI_API_KEY=sk-proj-abc123xyz789...

NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

## 🆘 Troubleshooting

### MongoDB Connection Error

**Problem**: Can't connect to MongoDB

**Solution**:
```bash
# If using Docker:
docker-compose up -d mongodb

# Check if running:
docker ps

# If using Atlas:
# - Check username/password
# - Check IP whitelist (use 0.0.0.0/0)
```

### OpenAI API Error

**Problem**: Invalid API key

**Solution**:
- Get new key from https://platform.openai.com/api-keys
- Make sure it starts with `sk-`
- No spaces before or after the key
- Restart server after updating

### Port Already in Use

**Problem**: Port 5000 or 5173 already in use

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Dependencies Installation Failed

**Solution**:
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
rm -rf client/node_modules client/package-lock.json
npm run install-all
```

---

## 📝 Quick Commands Reference

```bash
# Generate JWT secret
node generate-jwt-secret.js

# Verify setup
node verify-setup.js

# Install everything
npm run install-all

# Start MongoDB (Docker)
docker-compose up -d mongodb

# Start application
npm run dev

# Stop MongoDB (Docker)
docker-compose down
```

---

## 🎯 Next Steps After Setup

1. ✅ Explore the dashboard
2. ✅ Try AI chat tutor
3. ✅ Check performance analytics
4. ✅ View recommendations
5. ✅ Read [FEATURES.md](FEATURES.md) for all features
6. ✅ Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details

---

## 📚 Need More Help?

- **MongoDB Setup**: [MONGODB_SETUP.md](MONGODB_SETUP.md)
- **Quick Start**: [QUICKSTART.md](QUICKSTART.md)
- **Getting Started**: [GETTING_STARTED.md](GETTING_STARTED.md)
- **Full Documentation**: [README.md](README.md)

---

## ✨ You're All Set!

Your AI-powered learning platform is ready to use!

**Happy Learning!** 🎓
