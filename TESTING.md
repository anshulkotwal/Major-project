# Testing Guide

## Testing Strategy

This project uses a comprehensive testing approach covering unit tests, integration tests, and end-to-end tests.

## Setup Testing Environment

```bash
npm install --save-dev jest supertest @testing-library/react @testing-library/jest-dom
```

## Backend Testing

### Unit Tests

Test individual functions and modules:

```javascript
// server/tests/validators.test.js
const { validateEmail, validatePassword } = require('../utils/validators');

describe('Validators', () => {
  test('validates correct email', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('rejects invalid email', () => {
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('validates password length', () => {
    expect(validatePassword('123456')).toBe(true);
    expect(validatePassword('12345')).toBe(false);
  });
});
```

### API Integration Tests

Test API endpoints:

```javascript
// server/tests/auth.test.js
const request = require('supertest');
const app = require('../index');

describe('Auth API', () => {
  test('POST /api/auth/register - success', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'student'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user).toHaveProperty('email', 'test@example.com');
  });

  test('POST /api/auth/login - success', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
```

## Frontend Testing

### Component Tests

```javascript
// client/src/components/__tests__/StatsCard.test.jsx
import { render, screen } from '@testing-library/react';
import StatsCard from '../StatsCard';
import { TrendingUp } from 'lucide-react';

describe('StatsCard', () => {
  test('renders stats correctly', () => {
    render(
      <StatsCard
        icon={TrendingUp}
        title="Average Score"
        value="85%"
        color="blue"
      />
    );
    
    expect(screen.getByText('Average Score')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });
});
```

### Integration Tests

```javascript
// client/src/__tests__/StudentDashboard.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StudentDashboard from '../pages/StudentDashboard';
import { AuthProvider } from '../context/AuthContext';

describe('StudentDashboard', () => {
  test('loads and displays dashboard data', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <StudentDashboard />
        </AuthProvider>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('Your Learning Dashboard')).toBeInTheDocument();
    });
  });
});
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run with coverage
```bash
npm test -- --coverage
```

### Run specific test file
```bash
npm test auth.test.js
```

### Watch mode
```bash
npm test -- --watch
```

## Manual Testing Checklist

### Authentication
- [ ] User can register with valid credentials
- [ ] User cannot register with existing email
- [ ] User can login with correct credentials
- [ ] User cannot login with wrong password
- [ ] JWT token is stored correctly
- [ ] Protected routes redirect to login

### Student Dashboard
- [ ] Dashboard loads with correct data
- [ ] Performance charts display correctly
- [ ] Recommendations are shown
- [ ] Weak topics alert appears when needed
- [ ] Stats cards show accurate data

### AI Chat
- [ ] Chat interface opens/closes
- [ ] Messages are sent successfully
- [ ] AI responses are received
- [ ] Chat history is maintained
- [ ] Error handling works

### Performance Tracking
- [ ] Quiz submission works
- [ ] Performance data is saved
- [ ] Charts update correctly
- [ ] Filters work properly
- [ ] Analytics are accurate

### Recommendations
- [ ] Recommendations are generated
- [ ] Priority levels are correct
- [ ] Resources are accessible
- [ ] Status updates work

### UI/UX
- [ ] Dark/light mode toggle works
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Animations are smooth
- [ ] Loading states display
- [ ] Error messages are clear

## Performance Testing

### Load Testing

Use tools like Apache JMeter or Artillery:

```yaml
# artillery-config.yml
config:
  target: 'http://localhost:5000'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - flow:
      - post:
          url: '/api/auth/login'
          json:
            email: 'test@example.com'
            password: 'password123'
```

Run:
```bash
artillery run artillery-config.yml
```

### Lighthouse Audit

```bash
npm install -g lighthouse
lighthouse http://localhost:5173 --view
```

## Security Testing

### Check for vulnerabilities
```bash
npm audit
npm audit fix
```

### Test authentication
- [ ] JWT tokens expire correctly
- [ ] Invalid tokens are rejected
- [ ] Password hashing works
- [ ] CORS is configured properly

## Continuous Integration

### GitHub Actions Example

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

## Test Coverage Goals

- Unit tests: > 80%
- Integration tests: > 70%
- E2E tests: Critical paths covered
- Overall coverage: > 75%
