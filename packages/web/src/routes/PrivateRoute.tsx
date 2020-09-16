import React from 'react';
import { Link, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const PrivateRoute: React.FC<RouteProps> = ({ ...routeProps }) => {
  const { user } = useAuth();
  if (user) return <Route {...routeProps} />;
  return (
    <div>
      <h1>You have no sufficient access privilegies</h1>
      <Link to={`/signin?next=${routeProps.path}`}>Go to SignIn</Link>
    </div>
  )
}

export default PrivateRoute;