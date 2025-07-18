import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationSnackbar from './components/NotificationSnackbar';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import FeedPage from './pages/FeedPage';
import MessagesPage from './pages/MessagesPage';
import DialogsPage from './pages/DialogsPage';
import DialogPage from './pages/DialogPage';
import SearchPage from './pages/SearchPage';
import UserProfilePage from './pages/UserProfilePage';
import './App.css';

function App() {
  return (
    <NotificationProvider>
      <Router>
        <NotificationHandler />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="dialogs" element={<DialogsPage />} />
            <Route path="dialog/:id" element={<DialogPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="user/:id" element={<UserProfilePage />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

function NotificationHandler() {
  const { notification, closeNotification } = useNotification();
  return (
    <NotificationSnackbar
      open={notification.open}
      onClose={closeNotification}
      message={notification.message}
      severity={notification.severity}
    />
  );
}

function useNotification() {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

const NotificationContext = React.createContext();

export default App;
