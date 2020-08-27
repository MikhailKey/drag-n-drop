import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { darkTheme } from './utils/theme';
import { useAuth } from './hooks/authHook';
import { ThemeProvider } from '@material-ui/core/styles';
import { useRoutes } from './routes';
import { AuthContext } from './context/authContext';
import './app.css';


const App: React.FC = () => {
  const { token, userId, login, logout } = useAuth();
  const isAuthenticated: boolean = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={{
          token, userId, login, logout, isAuthenticated
        }}>
          <Router>
            {routes}
          </Router>
        </AuthContext.Provider>

      </ThemeProvider>
    </>
  )
}

export default App;