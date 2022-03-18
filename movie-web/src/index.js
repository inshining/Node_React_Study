import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Button from "./Button";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Button text={"Continue"}/>
  </React.StrictMode>,
  document.getElementById('root')
);
