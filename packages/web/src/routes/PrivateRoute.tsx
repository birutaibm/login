import React, { useMemo } from 'react';
import { Link, Route, RouteProps } from 'react-router-dom';
import { useStorage } from '../hooks/storage';

const PrivateRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
  const { user } = useStorage();
  const authorized = useMemo(() => <Route {...routeProps} />, [routeProps]);
  const unauthorized = useMemo(() => (
    <div>
      <h1>You have no sufficient access privilegies</h1>
      <Link to={`/signin?next=${routeProps.path}`}>Go to SignIn</Link>
    </div>
  ), [routeProps.path]);
  const page = useMemo(
    () => user ? authorized : unauthorized,
    [authorized, unauthorized, user]
  );
  
  return page;
}

export default PrivateRoute;