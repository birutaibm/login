import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import ResetPassword from '../pages/ResetPassword';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <PrivateRoute exact path="/" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;