import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/output.css';
import App from './App';
import { AuthProvider } from './hooks/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
);
