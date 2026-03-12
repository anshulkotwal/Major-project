# Personalized Learning Assistant

An AI-powered adaptive learning platform that provides personalized learning recommendations, real-time tutoring, and comprehensive analytics for students.

## Features

### Student Features
- **AI Chat Tutor**: Conversational AI assistant for instant help
- **Personalized Recommendations**: AI-generated study materials, videos, and resources
- **Performance Analytics**: Detailed charts and statistics tracking
- **Weak Topic Detection**: Automatic identification of areas needing improvement
- **Study Path Generator**: Custom learning paths based on performance
- **Progress Tracking**: Real-time monitoring of learning journey

### Teacher Features
- **Student Monitoring**: Track student performance and progress
- **Resource Management**: Upload and manage learning materials
- **Analytics Dashboard**: View class-wide performance metrics

### Admin Features
- **User Management**: Manage students, teachers, and system users
- **Platform Analytics**: Monitor system health and usage
- **System Configuration**: Configure platform settings

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion (animations)
- Recharts (analytics)
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- OpenAI API integration

### DevOps
- Docker support
- Environment-based configuration
- Modular architecture

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB
- OpenAI API key

### Setup

1. Clone the repository
```bash
git clone <repository-url>
cd personalized-learning-assistant
```

2. Install dependencies
```bash
npm run install-all
```

3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/learning-assistant
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. Start MongoDB
```bash
# Using Docker
docker-compose up -d mongodb

# Or start your local MongoDB instance
mongod
```

5. Run the application
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
personalized-learning-assistant/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── middleware/        # Express middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   └── index.js
├── .env.example
├── docker-compose.yml
├── Dockerfile
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Dashboard
- `GET /api/dashboard` - Get student dashboard data

### Performance
- `GET /api/performance` - Get performance history
- `POST /api/quiz/submit` - Submit quiz results

### Chat
- `POST /api/chat` - Send message to AI tutor
- `GET /api/chat/history` - Get chat history

### Recommendations
- `POST /api/recommendations/generate` - Generate recommendations
- `GET /api/recommendations` - Get user recommendations

## Database Schema

### User
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String (student/teacher/admin)
}
```

### Performance
```javascript
{
  studentId: ObjectId,
  topic: String,
  score: Number,
  timeSpent: Number,
  accuracy: Number,
  questionsAttempted: Number,
  correctAnswers: Number,
  date: Date
}
```

### Recommendation
```javascript
{
  studentId: ObjectId,
  type: String (video/article/topic),
  content: {
    title: String,
    description: String,
    url: String,
    thumbnail: String
  },
  priority: String (high/medium/low),
  status: String
}
```

### ChatHistory
```javascript
{
  studentId: ObjectId,
  messages: [{
    role: String,
    content: String,
    timestamp: Date
  }],
  sessionId: String
}
```

## Docker Deployment

Build and run with Docker:

```bash
docker-compose up --build
```

## Development

### Run backend only
```bash
npm run server
```

### Run frontend only
```bash
npm run client
```

### Run both concurrently
```bash
npm run dev
```

## Features in Detail

### AI Chat Tutor
- Context-aware responses using OpenAI
- Session memory for continuous conversations
- Real-time streaming responses
- Topic-specific assistance

### Recommendation Engine
- Analyzes quiz performance
- Detects weak topics (score < 60%)
- Generates personalized study materials
- Recommends YouTube videos and articles
- Prioritizes recommendations by urgency

### Performance Analytics
- Line charts showing score trends
- Topic-wise performance breakdown
- Time spent tracking
- Accuracy metrics
- Weak topic alerts

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
