# System Architecture

## Overview

The Personalized Learning Assistant is built using a modern MERN stack with AI integration.

## Architecture Layers

### 1. Presentation Layer (Frontend)
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **State Management**: React Context API
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Charts**: Recharts

### 2. Application Layer (Backend)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT-based auth
- **Middleware**: CORS, body-parser, auth middleware

### 3. Data Layer
- **Database**: MongoDB
- **ODM**: Mongoose
- **Collections**: Users, Performance, Recommendations, ChatHistory, StudyPlan

### 4. AI Layer
- **Provider**: OpenAI GPT-3.5-turbo
- **Services**: 
  - Chat tutor
  - Recommendation engine
  - Study plan generator

## Data Flow

```
User Request → React Component → API Call → Express Route → 
Controller Logic → AI Service (if needed) → Database → 
Response → React Component → UI Update
```

## Key Components

### Frontend Components
- **DashboardLayout**: Main layout wrapper
- **AIChat**: Real-time chat interface
- **PerformanceChart**: Analytics visualization
- **RecommendationCard**: Learning resource cards
- **StudyPathCard**: Progress tracking
- **WeakTopicsAlert**: Performance alerts

### Backend Services
- **aiService**: OpenAI integration
- **authService**: JWT token management
- **recommendationService**: AI-powered recommendations

### API Routes
- `/api/auth` - Authentication
- `/api/dashboard` - Dashboard data
- `/api/chat` - AI tutor
- `/api/performance` - Analytics
- `/api/recommendations` - Learning resources
- `/api/quiz` - Quiz submission

## Security

- Password hashing with bcryptjs
- JWT token authentication
- Protected routes with middleware
- CORS configuration
- Environment variable protection

## Scalability

- Modular architecture
- Stateless API design
- Database indexing
- Docker containerization
- Horizontal scaling ready

## AI Integration

### Chat Tutor
- Context-aware conversations
- Session memory (last 10 messages)
- Educational tone and guidance
- Error handling and fallbacks

### Recommendation Engine
- Performance analysis
- Weak topic detection
- Personalized content generation
- Priority-based recommendations

## Performance Optimization

- React lazy loading
- API response caching
- Database query optimization
- Image optimization
- Code splitting
