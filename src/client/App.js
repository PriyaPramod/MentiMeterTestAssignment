import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ResultPage from './ResultPage';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={ResultPage} />
          <Route path='/:id' component={ResultPage} />
        </Switch>
      </div>
    </Router>
  );
}
