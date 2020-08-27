import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import NewResponsibles from '../pages/NewResponsibles';
import NewStudent from '../pages/NewStudent';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route
      path="/enrollment-responsibles"
      component={NewResponsibles}
      isPrivate
    />
    <Route path="/enrollment-student" component={NewStudent} isPrivate />
  </Switch>
);

export default Routes;
