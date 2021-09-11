import React from 'react';
import './App.scss';
import { Switch, Route, BrowserRouter as Router, HashRouter } from 'react-router-dom';
import ClickCounter from '../Counter/ClickCounter';
const App = () => {
  return (
    // lỗi Router thì thay bằng thằng này HashRouter
    <Router>
      <div>Hello world1234567890</div>
      <ClickCounter />
    </Router>
  );
};
export default App;
