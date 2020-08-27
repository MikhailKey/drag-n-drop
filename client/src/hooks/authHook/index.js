import { useState, useCallback, useEffect } from 'react';

const storageName = 'user_data';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((token, id) => {

    setToken(token);
    setUserId(id);

    localStorage.setItem('user_data', JSON.stringify({
      userId: id, token
    }));
  }, [])

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('user_data');
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId)
    }
  }, [login])

  return { login, logout, token, userId }
}