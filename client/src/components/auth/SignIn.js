'use client';

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending login request with axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, // Ensure the backend URL is correct
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token, user } = response.data; // Response data includes token and user info
      localStorage.setItem('token', token); // Store the JWT token
      localStorage.setItem('role', user.role); // Store user role

      // Redirect user based on their role
      // Redirect based on role
      if (user.role === 'superadmin') {
        router.push('/superadmin');
      } else if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/user');
      }
    } catch (error) {
      setError(error.response?.data?.msg || 'Login failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
