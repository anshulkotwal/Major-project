#!/bin/bash

echo "🚀 Setting up Personalized Learning Assistant..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check MongoDB
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed. Please install MongoDB 7+ or use Docker."
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Create .env if not exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration (MongoDB URI, OpenAI API key, etc.)"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env with your configuration"
echo "2. Start MongoDB: mongod (or docker-compose up -d mongodb)"
echo "3. Run the app: npm run dev"
echo ""
echo "The app will be available at:"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:5000"
