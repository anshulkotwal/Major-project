import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Performance from './pages/Performance'
import Resources from './pages/Resources'
import Settings from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/student" element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/student/performance" element={
              <PrivateRoute role="student">
                <Performance />
              </PrivateRoute>
            } />
            
            <Route path="/student/resources" element={
              <PrivateRoute role="student">
                <Resources />
              </PrivateRoute>
            } />
            
            <Route path="/student/settings" element={
              <PrivateRoute role="student">
                <Settings />
              </PrivateRoute>
            } />
            
            <Route path="/teacher" element={
              <PrivateRoute role="teacher">
                <TeacherDashboard />
              </PrivateRoute>
            } />
            
            <Route path="/admin" element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
