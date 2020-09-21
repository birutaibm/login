import React, { FormEvent, useCallback, useMemo, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import api from '../../services/api';

import { Container } from './styles';

const ResetPassword: React.FC = () => {
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const { push: goTo } = useHistory();
  const { search } = useLocation();
  
  const token = useMemo(() => {
    const params = search.substr(1).split('&').map(param => {
      let [key, value] = param.split('=');
      if (!value) value = "true";
      return { [key]: value };
    }).reduce((reduced, entry) => ({
      ...reduced,
      ...entry,
    }), {});
    return params['token'] || '';
  }, [search]);

  const handleFormSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (password.current && confirmPassword.current) {
      const passwordValue = confirmPassword.current.value;
      if (!token.length || !password.current.value || password.current.value !== passwordValue) {
        window.alert('Invalid data!');
        return;
      }
      password.current.value = '';
      confirmPassword.current.value = '';

      try {
        await api.put('/password_recover', {
          token,
          password: passwordValue,
        });
        goTo('signin');
      } catch (error) {
        console.error(error);
      }
    }
  }, [goTo, token]);

  if (!token.length) {
    return (
      <>
        <h1>Token not found!</h1>
        <p>Please, check the link you receive and try again.</p>
      </>
    );
  }

  return (
    <Container>
      <h1>Here you can define a new password</h1>
      <form onSubmit={handleFormSubmit}>
      <label htmlFor="password">New password</label>
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
        <button type="submit">Change password</button>
      </form>
    </Container>
  );
}

export default ResetPassword;