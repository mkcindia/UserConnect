'use client';

import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   role: 'user',
  // });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is 'user'
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !password) {
      return setError('Please fill in all the fields');
    }

    try {
      // Send POST request to the backend for registration
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        { name, email, password, role },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Signup successful! Redirecting...');
        setError('');
        // Redirect to login page or home page
        setTimeout(() => {
          router.push('/login');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      // Handle error (if there's an issue with the request)
      setError(
        error?.response?.data?.msg || 'Signup failed. Please try again.'
      );
      setSuccessMessage('');
    }
  };

  const isFormValid = name && email && password;

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} border={1} borderRadius={2} boxShadow={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && (
          <Typography color="primary">{successMessage}</Typography>
        )}
        <form onSubmit={handleSignup}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!name && error}
            helperText={!name && error ? 'Name is required' : ''}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email && error}
            helperText={!email && error ? 'Email is required' : ''}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password && error}
            helperText={!password && error ? 'Password is required' : ''}
          />

          {/* Role Dropdown */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              label="Role"
              disabled={role === 'user'}
            >
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isFormValid} // Disable button if form is invalid
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
