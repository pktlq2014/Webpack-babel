import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router, HashRouter } from 'react-router-dom';
import ClickCounter from '../Counter/ClickCounter';
const App = () => {
  return (
    // lỗi Router thì thay bằng thằng này HashRouter
    <Router>
      <div>Hello world123456</div>
      <ClickCounter />
    </Router>
  );
};
export default App;
