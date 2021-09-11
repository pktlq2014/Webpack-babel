import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App/App';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'jquery/dist/jquery.min.js';
import 'jquery';
// import 'bootstrap/dist/js/bootstrap.min.js';
ReactDOM.render(
  // <Provider>
  //     <App />
  // </Provider>,
  <App />,
  document.getElementById('root')
);
// const template = <h1>Hello world123</h1>
// ReactDOM.render(
//     template, document.getElementById('root')
// )
// import sum from './math'
// import './image'
// // const sum = require('./math')
// const result = sum(1, 2)
// console.log(result)
// document.write(result)
