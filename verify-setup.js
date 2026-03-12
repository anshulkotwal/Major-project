#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Personalized Learning Assistant Setup...\n');

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${description}`);
    checks.passed++;
    return true;
  } else {
    console.log(`❌ ${description} - Missing: ${filePath}`);
    checks.failed++;
    return false;
  }
}

function checkDirectory(dirPath, description) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    console.log(`✅ ${description}`);
    checks.passed++;
    return true;
  } else {
    console.log(`❌ ${description} - Missing: ${dirPath}`);
    checks.failed++;
    return false;
  }
}

function checkEnvFile() {
  if (fs.existsSync('.env')) {
    console.log('✅ Environment file exists');
    checks.passed++;
    
    const envContent = fs.readFileSync('.env', 'utf8');
    const requiredVars = ['MONGODB_URI', 'JWT_SECRET', 'OPENAI_API_KEY'];
    
    requiredVars.forEach(varName => {
      if (envContent.includes(varName)) {
        console.log(`  ✓ ${varName} configured`);
      } else {
        console.log(`  ⚠️  ${varName} not found`);
        checks.warnings++;
      }
    });
  } else {
    console.log('⚠️  .env file not found - Copy from .env.example');
    checks.warnings++;
  }
}

console.log('📁 Checking Project Structure...\n');

// Root files
checkFile('package.json', 'Root package.json');
checkFile('README.md', 'README documentation');
checkFile('.env.example', 'Environment template');
checkFile('docker-compose.yml', 'Docker Compose config');
checkFile('Dockerfile', 'Dockerfile');

console.log('\n📚 Checking Documentation...\n');

checkFile('QUICKSTART.md', 'Quick Start Guide');
checkFile('ARCHITECTURE.md', 'Architecture Documentation');
checkFile('API_DOCUMENTATION.md', 'API Documentation');
checkFile('FEATURES.md', 'Features Documentation');
checkFile('DEPLOYMENT.md', 'Deployment Guide');
checkFile('TESTING.md', 'Testing Guide');
checkFile('CONTRIBUTING.md', 'Contributing Guidelines');
checkFile('LICENSE', 'License File');

console.log('\n🖥️  Checking Backend Structure...\n');

checkDirectory('server', 'Server directory');
checkFile('server/index.js', 'Server entry point');
checkDirectory('server/models', 'Models directory');
checkDirectory('server/routes', 'Routes directory');
checkDirectory('server/services', 'Services directory');
checkDirectory('server/middleware', 'Middleware directory');

// Models
checkFile('server/models/User.js', 'User model');
checkFile('server/models/Performance.js', 'Performance model');
checkFile('server/models/Recommendation.js', 'Recommendation model');
checkFile('server/models/ChatHistory.js', 'ChatHistory model');
checkFile('server/models/StudyPlan.js', 'StudyPlan model');

// Routes
checkFile('server/routes/auth.js', 'Auth routes');
checkFile('server/routes/dashboard.js', 'Dashboard routes');
checkFile('server/routes/performance.js', 'Performance routes');
checkFile('server/routes/quiz.js', 'Quiz routes');
checkFile('server/routes/chat.js', 'Chat routes');
checkFile('server/routes/recommendations.js', 'Recommendations routes');

// Services
checkFile('server/services/aiService.js', 'AI Service');

console.log('\n⚛️  Checking Frontend Structure...\n');

checkDirectory('client', 'Client directory');
checkFile('client/package.json', 'Client package.json');
checkFile('client/vite.config.js', 'Vite config');
checkFile('client/tailwind.config.js', 'Tailwind config');
checkFile('client/index.html', 'HTML entry point');

checkDirectory('client/src', 'Source directory');
checkFile('client/src/main.jsx', 'Main entry point');
checkFile('client/src/App.jsx', 'App component');
checkFile('client/src/index.css', 'Global styles');

// Components
checkDirectory('client/src/components', 'Components directory');
checkFile('client/src/components/AIChat.jsx', 'AIChat component');
checkFile('client/src/components/DashboardLayout.jsx', 'DashboardLayout component');
checkFile('client/src/components/PerformanceChart.jsx', 'PerformanceChart component');
checkFile('client/src/components/RecommendationCard.jsx', 'RecommendationCard component');
checkFile('client/src/components/StudyPathCard.jsx', 'StudyPathCard component');
checkFile('client/src/components/StatsCard.jsx', 'StatsCard component');
checkFile('client/src/components/WeakTopicsAlert.jsx', 'WeakTopicsAlert component');

// Pages
checkDirectory('client/src/pages', 'Pages directory');
checkFile('client/src/pages/LandingPage.jsx', 'Landing page');
checkFile('client/src/pages/Login.jsx', 'Login page');
checkFile('client/src/pages/Register.jsx', 'Register page');
checkFile('client/src/pages/StudentDashboard.jsx', 'Student dashboard');
checkFile('client/src/pages/TeacherDashboard.jsx', 'Teacher dashboard');
checkFile('client/src/pages/AdminDashboard.jsx', 'Admin dashboard');

// Context
checkDirectory('client/src/context', 'Context directory');
checkFile('client/src/context/AuthContext.jsx', 'Auth context');
checkFile('client/src/context/ThemeContext.jsx', 'Theme context');

console.log('\n🔐 Checking Environment Configuration...\n');

checkEnvFile();

console.log('\n📊 Verification Summary\n');
console.log(`✅ Passed: ${checks.passed}`);
console.log(`❌ Failed: ${checks.failed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);

if (checks.failed === 0) {
  console.log('\n🎉 All checks passed! Your project is ready.');
  console.log('\nNext steps:');
  console.log('1. Configure .env file with your credentials');
  console.log('2. Install dependencies: npm run install-all');
  console.log('3. Start MongoDB: mongod (or docker-compose up -d mongodb)');
  console.log('4. Run the app: npm run dev');
} else {
  console.log('\n⚠️  Some checks failed. Please review the missing files above.');
  process.exit(1);
}
