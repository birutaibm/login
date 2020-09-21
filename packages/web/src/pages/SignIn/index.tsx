import React, { FormEvent, useCallback, useMemo, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container } from './styles';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const { push: goTo } = useHistory();
  const { search } = useLocation();
  const next = useMemo(() => {
    const params = search.substr(1).split('&').map(param => {
      let [key, value] = param.split('=');
      if (!value) value = "true";
      return { [key]: value };
    }).reduce((reduced, entry) => ({
      ...reduced,
      ...entry,
    }), {});
    return () => goTo(params.next || '/');
  }, [search, goTo]);

  const uid = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleFormSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (uid.current && password.current) {
      try {
        await signIn({
          uid: uid.current.value,
          password: password.current.value,
        });
        next();
      } catch (error) {
        window.alert('Wrong login/password pair');
        uid.current.value = '';
        password.current.value = '';
        uid.current.focus();
      }
    }
  }, [signIn, next]);

  const handleResetPassword = useCallback(async () => {
    if (uid.current) {
      const user = uid.current.value;
      uid.current.value = '';
      await api.post('/password_recover', { uid: user });
      next();
    }
  }, [next]);

  return (
    <Container>
      <h1>Sign in page</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="uid">Username or e-mail</label>
        <input
          type="text"
          id="uid"
          name="uid"
          ref={uid}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={password}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleResetPassword}>Reset password</button>
    </Container>
  );
}

export default SignIn;