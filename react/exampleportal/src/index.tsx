import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store'
import { Provider } from 'react-redux'
//import { BrowserRouter } from 'react-router-dom';
//npm install bootstrap before using this
//import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';





Amplify.configure(config);



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>      
      <App />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
