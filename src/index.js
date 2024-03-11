import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import api from 'api';
// const sdk = require('api')('@picsartfordevelopers/v1.0#11wm1w0lnsym3a6');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Suspense>
    <App />
  </React.Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
