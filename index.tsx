import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // While we don't have a file, standard setups might expect imports. 
// We are using Tailwind CDN so no critical CSS import is needed here strictly, 
// but often index.css is present in build chains. We will omit strictly.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
