import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Container } from '@mui/material';
import { useAccount } from 'wagmi';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      navigate('/dashboard');
    }
  }, [isConnected, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        style={{
          padding: '30px',
          marginTop: '100px',
          textAlign: 'center',
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please log in to access your models and run computations.
          </Typography>
          <Box marginTop="20px">
            <DynamicWidget />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
