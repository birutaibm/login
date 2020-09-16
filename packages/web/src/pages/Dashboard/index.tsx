import React from 'react';
import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <h1>Welcome {user?.name}!</h1>
    </Container>
  );
}

export default Dashboard;