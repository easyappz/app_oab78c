import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotificationProvider } from './contexts/NotificationContext';
import NotificationSnackbar from './components/NotificationSnackbar';
import { useNotification } from './contexts/NotificationContext';

// Компонент для отображения уведомлений на верхнем уровне
const NotificationWrapper = () => {
  const { notification, closeNotification } = useNotification();
  return (
    <>
      <App />
      <NotificationSnackbar
        open={notification.open}
        onClose={closeNotification}
        message={notification.message}
        severity={notification.severity}
      />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationProvider>
      <BrowserRouter>
        <NotificationWrapper />
      </BrowserRouter>
    </NotificationProvider>
  </React.StrictMode>
);

reportWebVitals();
