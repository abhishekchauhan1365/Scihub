import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { TopicList } from './pages/TopicList';
import { TopicDetail } from './pages/TopicDetail';
import { Quiz } from './pages/Quiz';
import { AskDoubts } from './pages/AskDoubts';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Layout>{children}</Layout>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/topics" element={<ProtectedRoute><TopicList /></ProtectedRoute>} />
      <Route path="/topics/:id" element={<ProtectedRoute><TopicDetail /></ProtectedRoute>} />
      <Route path="/quiz/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
      <Route path="/doubts" element={<ProtectedRoute><AskDoubts /></ProtectedRoute>} />
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ProgressProvider>
    </AuthProvider>
  );
}