import React, { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';
import { useStorage } from '../../hooks/storage';
import api from '../../services/api';

import { Container } from './styles';

interface ServerResponseDTO {
  username: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const { user } = useStorage();
  const { signOut } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [privilege, setPrivilege] = useState('');

  useEffect(() => {
    api.get<ServerResponseDTO>('/dashboard').then(response => {
      if (response && response.data) {
        setName(response.data.username);
        setPrivilege(response.data.role);
      } else {
        window.location.reload();
      }
    });
  }, []);

  return (
    <Container>
      <h1>Welcome {name}!</h1>
      {privilege.length ? (
        <h2>You have all privilegies of a system's {privilege}.</h2>
      ) : null}
      <button onClick={signOut}>Logout</button>
    </Container>
  );
}

export default Dashboard;