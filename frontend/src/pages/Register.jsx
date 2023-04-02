import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  TextField,
  Container,
  Button,
  Paper,
} from '@mui/material';
import { api } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorModal } from '../ui/ErrorModal';
import { baseFlexStyles } from '../styles';
import { StoreContext } from '../utils/store';

export const Register = () => {
  const {
    token: [userToken, setUserToken],
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClose = () => setModalIsOpen(false);

  const handleDataChange = (event) => {
    const { value, name } = event.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (registerData.password !== registerData.confirmPass) {
        setModalIsOpen(true);
        return;
      }
      const res = await api.post('/user/auth/register', registerData);
      const { token } = res.data;
      localStorage.setItem('email', registerData.email);
      setUserToken(token);
      console.log(userToken);
      navigate('/');
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
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
          sx={{
            py: 4,
            px: 8,
            ...baseFlexStyles,
            flexDirection: 'column',
          }}
        >
          <Typography variant={'h3'} gutterBottom>
            Register to AirBrb
          </Typography>

          <TextField
            name="email"
            label="Email"
            sx={{ m: 1, width: '80%' }}
            onChange={handleDataChange}
          />

          <TextField
            name="name"
            label="Name"
            sx={{ m: 1, width: '80%' }}
            onChange={handleDataChange}
          />

          <TextField
            type={'password'}
            name="password"
            label="Password"
            sx={{ m: 1, width: '80%' }}
            onChange={handleDataChange}
          />

          <TextField
            type={'password'}
            name="confirmPass"
            label="Confirm Password"
            sx={{ m: 1, width: '80%' }}
            onChange={handleDataChange}
          />

          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              cursor: 'pointer',
              marginBottom: '1em',
            }}
          >
            <Typography variant={'p'} color={'primary'}>
              Already have an account? Click here to login!
            </Typography>
          </Link>

          <Button
            variant="contained"
            sx={{ textAlign: 'center' }}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Paper>

        <ErrorModal
          modalIsOpen={modalIsOpen}
          message="Make sure your passwords match!"
          handleClose={handleClose}
        />
      </Container>
    </Box>
  );
};
