import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  TextField,
  Container,
  Button,
  Paper,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { baseFlexStyles } from '../styles';
import { StoreContext } from '../utils/store';

export const Login = () => {
  const [loginData, setLoginData] = useState({});
  const [validState, setValidState] = useState();
  const navigate = useNavigate();
  const handleDataChange = (event) => {
    const { value, name } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const {
    token: [userToken, setUserToken],
  } = useContext(StoreContext);

  const handleSubmit = async () => {
    try {
      const res = await api.post('/user/auth/login', loginData);
      const { token } = res.data;
      localStorage.setItem('email', loginData.email);
      setUserToken(token);
      setValidState(true);
      console.log(userToken);
      navigate('/');
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        setValidState(false);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };

  return (
    <Box sx={{ ...baseFlexStyles, height: '100vh' }}>
      <Container
        sx={{
          ...baseFlexStyles,
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{ py: 4, px: 8, ...baseFlexStyles, flexDirection: 'column' }}
        >
          <Typography variant={'h3'} gutterBottom>
            Login to AirBrb
          </Typography>

          <TextField
            name="email"
            label="Email"
            type="email"
            error={validState === false}
            helperText={
              validState === false ? 'Incorrect email or password' : ''
            }
            sx={{ m: 1, width: '80%' }}
            onChange={handleDataChange}
          />
          <br />

          <TextField
            name="password"
            label="Password"
            type="password"
            error={validState === false}
            helperText={
              validState === false ? 'Incorrect email or password' : ''
            }
            sx={{ m: 1, width: '80%' }}
            onChange={handleDataChange}
          />
          <br />

          <Link
            to="/register"
            style={{
              textDecoration: 'none',
              cursor: 'pointer',
              marginBottom: '1em',
            }}
          >
            <Typography variant={'p'} color={'primary'}>
              Don&apos;t have an account? Click here to register!
            </Typography>
          </Link>

          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
