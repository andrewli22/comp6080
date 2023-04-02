import React, { useState, useContext, useEffect } from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import airbnbLogo from '../airbnb-logo.png';
import { api } from '../api';
import { StoreContext } from '../utils/store';

export const Nav = () => {
  const {
    token: [userToken, setUserToken],
  } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    setUserToken(localStorage.getItem('token'));
  }, []);

  const linkStyle = {
    color: 'black',
    margin: '0 1em',
    textDecoration: 'none',
    cursor: 'pointer',
    marginBottom: '1em',
  };

  const bnbStyle = {
    color: '#FF385C',
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    console.log('here');
    console.log(userToken);
    try {
      api.post('/user/auth/logout');
      navigate('/');
      setUserToken(null);
    } catch (err) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          onClick={handleClick}
          sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {userToken && (
            <MenuItem onClick={handleClose}>
              <Link
                to="/user/listings"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                Your Hosted Listings
              </Link>
            </MenuItem>
          )}
          <MenuItem onClick={handleClose}>
            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
              All Listings
            </Link>
          </MenuItem>
        </Menu>

        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'space-between' },
          }}
        >
          <Typography variant="h5">
            <Link style={bnbStyle}>
              <img
                src={airbnbLogo}
                alt="airbnb-logo"
                height="25px"
                width="25px"
              />
              AirBrb
            </Link>
          </Typography>
          <Typography
            variant="button"
            color={'primary'}
            display={{ xs: 'none', sm: 'block' }}
            sx={{ flexGrow: 1 }}
          >
            {userToken && (
              <Link to="/user/listings" style={linkStyle}>
                Your Hosted Listings
              </Link>
            )}
            <Link to="/" style={linkStyle}>
              {' '}
              All Listings
            </Link>
          </Typography>

          <Typography variant="button">
            {!userToken
              ? (
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
                )
              : (
              <Link style={linkStyle} onClick={handleLogout}>
                Logout
              </Link>
                )}
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
