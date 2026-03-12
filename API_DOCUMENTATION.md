# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

---

## Dashboard Endpoints

### Get Dashboard Data
```http
GET /api/dashboard
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "recentPerformance": [...],
  "recommendations": [...],
  "studyPlan": {...},
  "weakTopics": [...],
  "stats": {
    "avgScore": 85,
    "totalTime": 3600,
    "totalQuestions": 100,
    "totalCorrect": 85
  }
}
```

---

## Performance Endpoints

### Get Performance History
```http
GET /api/performance?topic=Math&startDate=2024-01-01&endDate=2024-12-31
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `topic` (optional): Filter by topic
- `startDate` (optional): Start date filter
- `endDate` (optional): End date filter

**Response:**
```json
{
  "performances": [...],
  "topicStats": [...]
}
```

---

## Quiz Endpoints

### Submit Quiz
```http
POST /api/quiz/submit
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "topic": "Mathematics",
  "score": 85,
  "timeSpent": 1800,
  "questionsAttempted": 20,
  "correctAnswers": 17
}
```

**Response:**
```json
{
  "message": "Quiz submitted successfully",
  "performance": {...}
}
```

---

## Chat Endpoints

### Send Message to AI Tutor
```http
POST /api/chat
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "message": "Explain quadratic equations",
  "sessionId": "session_123",
  "topic": "Mathematics"
}
```

**Response:**
```json
{
  "response": "AI tutor response here...",
  "sessionId": "session_123"
}
```

### Get Chat History
```http
GET /api/chat/history?sessionId=session_123
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "sessionId": "session_123",
    "messages": [...],
    "topic": "Mathematics",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

## Recommendation Endpoints

### Generate Recommendations
```http
POST /api/recommendations/generate
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "topic": "Mathematics",
  "score": 45
}
```

**Response:**
```json
{
  "message": "Recommendations generated successfully"
}
```

### Get Recommendations
```http
GET /api/recommendations
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "rec_id",
    "type": "video",
    "content": {
      "title": "Understanding Quadratic Equations",
      "description": "...",
      "url": "https://youtube.com/..."
    },
    "priority": "high",
    "status": "pending"
  }
]
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid credentials"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```
