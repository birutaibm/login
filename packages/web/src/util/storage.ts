interface User {
  id: string;
  name: string;
  email: string;
}

interface Data {
  token: string;
  user: User;
}

function readData(): Data | undefined {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    return {token, user: JSON.parse(user)};
  }
}

function writeData({token, user}: Data): void {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function clearData(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export default {
  readData,
  writeData,
  clearData,
};