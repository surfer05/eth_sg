import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import RunModelPage from './pages/RunModelPage';
import LoginPage from './pages/LoginPage';
import { useAccount } from 'wagmi';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MarkUnreadChatAltOutlined } from '@mui/icons-material';

const PrivateRoute = ({ children }) => {
  const { isConnected } = useAccount();
  if(isConnected) return children;
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/run-model"
            element={
              <PrivateRoute>
                <RunModelPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
