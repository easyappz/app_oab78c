import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useNotification } from '../contexts/NotificationContext';
import { getProfile } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { showNotification } = useNotification();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await getProfile();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        showNotification('Сессия истекла. Пожалуйста, войдите снова.', 'error');
      }
    };

    checkTokenValidity();
  }, [location.pathname, showNotification]);

  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Проверка авторизации...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
