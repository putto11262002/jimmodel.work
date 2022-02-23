import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';
import ContextsProvider from './context/ContextsProvider'
ReactDOM.render(
  <ContextsProvider>
    <App />
    </ContextsProvider>
  ,
  document.getElementById('root')
);


