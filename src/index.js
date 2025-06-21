import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

// Redux setup
import { Provider } from 'react-redux';
import { store } from './redux/store'; // relative path simplified

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
