import React, { FormEvent, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { Container } from './styles';

const SignUp: React.FC = () => {
  const { push: goTo } = useHistory();

  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const handleFormSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (username.current && email.current && password.current && confirmPassword.current) {
      if (password.current.value === confirmPassword.current.value) {
        try {
          await api.post('users', {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value,
          });
          goTo('signin');
        } catch (error) {
          window.alert(JSON.stringify(error));
          username.current.value = '';
          email.current.value = '';
          password.current.value = '';
          confirmPassword.current.value = '';
          username.current.focus();
        }
      }
    }
  }, [goTo]);

  return (
    <Container>
      <h1>Sign in page</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          ref={username}
        />
        <label htmlFor="email">e-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          ref={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={password}
        />
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          ref={confirmPassword}
        />
        <button type="submit">SignUp</button>
      </form>
    </Container>
  );
}

export default SignUp;