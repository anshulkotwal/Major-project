# MongoDB Setup Guide

## Quick Decision: Which Option Should I Choose?

- **Use Docker** ✅ - Easiest, no installation needed
- **Use MongoDB Atlas** ✅ - Free cloud database, no local setup
- **Install Locally** - If you want full control

---

## Option 1: Docker (Recommended - Easiest)

### Prerequisites
- Docker Desktop installed ([Download here](https://www.docker.com/products/docker-desktop))

### Steps

1. **Start MongoDB with Docker Compose**
   ```bash
   docker-compose up -d mongodb
   ```

2. **Verify it's running**
   ```bash
   docker ps
   ```
   You should see a container named `learning-assistant-db`

3. **Your `.env` configuration**
   ```env
   MONGODB_URI=mongodb://localhost:27017/learning-assistant
   ```

4. **Stop MongoDB when done**
   ```bash
   docker-compose down
   ```

✅ **That's it! MongoDB is ready.**

---

## Option 2: MongoDB Atlas (Cloud - Free)

### Step-by-Step Guide

#### 1. Create Account
- Go to: https://www.mongodb.com/cloud/atlas/register
- Sign up (it's free!)
- Verify your email

#### 2. Create a Free Cluster
- Click **"Build a Database"**
- Select **"M0 FREE"** tier
- Choose a cloud provider (AWS, Google Cloud, or Azure)
- Choose a region close to you
- Cluster Name: `Cluster0` (default is fine)
- Click **"Create"**
- Wait 3-5 minutes for cluster creation

#### 3. Create Database User
- In left sidebar, click **"Database Access"**
- Click **"+ ADD NEW DATABASE USER"**
- Authentication Method: **Password**
- Username: `learningapp`
- Password: Click **"Autogenerate Secure Password"** (SAVE THIS!)
- Database User Privileges: **"Read and write to any database"**
- Click **"Add User"**

#### 4. Whitelist IP Address
- In left sidebar, click **"Network Access"**
- Click **"+ ADD IP ADDRESS"**
- Click **"ALLOW ACCESS FROM ANYWHERE"** (for development)
  - This adds `0.0.0.0/0`
- Click **"Confirm"**

#### 5. Get Connection String
- In left sidebar, click **"Database"**
- Click **"Connect"** button on your cluster
- Choose **"Connect your application"**
- Driver: **Node.js**
- Version: **4.1 or later**
- Copy the connection string

It looks like:
```
mongodb+srv://learningapp:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### 6. Update `.env` File

Replace `<password>` with your actual password:

```env
MONGODB_URI=mongodb+srv://learningapp:YourActualPassword@cluster0.xxxxx.mongodb.net/learning-assistant?retryWrites=true&w=majority
```

**Important Notes:**
- Replace `<password>` with the password you saved
- Add `/learning-assistant` before the `?` to specify database name
- Remove any `<` or `>` characters
- If password has special characters, URL encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`
  - `%` becomes `%25`

#### Example:
If your password is `Pass@123#`:
```env
MONGODB_URI=mongodb+srv://learningapp:Pass%40123%23@cluster0.xxxxx.mongodb.net/learning-assistant?retryWrites=true&w=majority
```

✅ **MongoDB Atlas is ready!**

---

## Option 3: Local MongoDB Installation

### Windows

1. **Download MongoDB**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows, MSI package
   - Download and run installer

2. **Install**
   - Choose "Complete" installation
   - Install as a Service: ✅ Yes
   - Run service as Network Service user: ✅ Yes
   - Install MongoDB Compass: ✅ Yes (optional GUI)

3. **Start MongoDB**
   ```bash
   net start MongoDB
   ```

4. **Your `.env` configuration**
   ```env
   MONGODB_URI=mongodb://localhost:27017/learning-assistant
   ```

### macOS

1. **Install with Homebrew**
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@7.0
   ```

2. **Start MongoDB**
   ```bash
   brew services start mongodb-community@7.0
   ```

3. **Your `.env` configuration**
   ```env
   MONGODB_URI=mongodb://localhost:27017/learning-assistant
   ```

### Linux (Ubuntu/Debian)

1. **Import MongoDB public key**
   ```bash
   curl -fsSL https://pgp.mongodb.com/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
   ```

2. **Add MongoDB repository**
   ```bash
   echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```

3. **Install MongoDB**
   ```bash
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

4. **Start MongoDB**
   ```bash
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

5. **Your `.env` configuration**
   ```env
   MONGODB_URI=mongodb://localhost:27017/learning-assistant
   ```

---

## Verify MongoDB Connection

### Test Connection

Create a test file `test-mongodb.js`:

```javascript
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
```

Run it:
```bash
node test-mongodb.js
```

---

## Common Issues & Solutions

### Issue 1: Connection Timeout

**Error**: `MongooseServerSelectionError: connect ETIMEDOUT`

**Solutions**:
- Check if MongoDB is running
- For Atlas: Verify IP whitelist includes your IP
- Check firewall settings
- Try `0.0.0.0/0` in Atlas Network Access

### Issue 2: Authentication Failed

**Error**: `MongoServerError: Authentication failed`

**Solutions**:
- Verify username and password are correct
- Check for special characters in password (URL encode them)
- Ensure user has correct permissions in Atlas

### Issue 3: Database Not Found

**Error**: Database doesn't exist

**Solution**:
- MongoDB creates databases automatically on first write
- Just run the app, it will create the database

### Issue 4: Port Already in Use

**Error**: `EADDRINUSE: address already in use :::27017`

**Solutions**:
```bash
# Windows
netstat -ano | findstr :27017
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:27017 | xargs kill -9
```

---

## MongoDB GUI Tools (Optional)

### MongoDB Compass (Official)
- Download: https://www.mongodb.com/products/compass
- Connect with your MongoDB URI
- Visual interface for database management

### Studio 3T
- Download: https://studio3t.com/
- Free for non-commercial use
- Advanced features

---

## Quick Reference

### Docker Commands
```bash
# Start MongoDB
docker-compose up -d mongodb

# Stop MongoDB
docker-compose down

# View logs
docker logs learning-assistant-db

# Access MongoDB shell
docker exec -it learning-assistant-db mongosh
```

### Local MongoDB Commands
```bash
# Windows
net start MongoDB
net stop MongoDB

# Mac
brew services start mongodb-community
brew services stop mongodb-community

# Linux
sudo systemctl start mongod
sudo systemctl stop mongod
sudo systemctl status mongod
```

### MongoDB Shell Commands
```bash
# Connect to MongoDB
mongosh

# Show databases
show dbs

# Use database
use learning-assistant

# Show collections
show collections

# View data
db.users.find()
```

---

## Next Steps

After MongoDB is set up:

1. ✅ Verify `.env` has correct `MONGODB_URI`
2. ✅ Add your OpenAI API key to `.env`
3. ✅ Run `npm run install-all`
4. ✅ Run `npm run dev`
5. ✅ Open http://localhost:5173

---

## Need Help?

- MongoDB Docs: https://docs.mongodb.com/
- Atlas Support: https://www.mongodb.com/cloud/atlas/support
- Community: https://www.mongodb.com/community/forums/

---

**Recommended for beginners**: Use **Docker** (Option 1) or **MongoDB Atlas** (Option 2)
