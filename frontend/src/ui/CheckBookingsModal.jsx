import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Typography, Box, Button } from '@mui/material';
import { api } from '../api';
import { useParams } from 'react-router-dom';

export const CheckBookingsModal = ({ modalIsOpen, handleClose }) => {
  const style = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 5,
    gap: '30px',
    xs: { height: '30%' },
    sm: { height: '30%' },
  };

  const [userBookings, setUserBookings] = useState([]);
  const owner = localStorage.getItem('email');

  const listingId = useParams().listingId;
  useEffect(() => {
    const getBookings = async () => {
      const res = await api.get('/bookings');
      const bookings = res.data.bookings;
      for (let i = 0; i < bookings.length; i++) {
        if (
          bookings[i].owner === owner &&
          bookings[i].listingId === listingId
        ) {
          console.log(bookings[i]);
          setUserBookings((userBookings) => [...userBookings, { id: bookings[i].id, status: bookings[i].status }]);
        }
      }
    };
    getBookings();
  }, []);

  return (
    <Modal
      open={modalIsOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6">Booking Status</Typography>
        {userBookings.map((bookings, index) => (
          <Button
            key={index}
            variant="outlined"
            color={
              bookings.status === 'pending'
                ? 'secondary'
                : bookings.status === 'accepted'
                  ? 'success'
                  : 'error'
            }
            sx={{ pointerEvents: 'none' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px',
              }}
            >
              <Typography id="modal-modal-description" textAlign="left">
                Booking No. {bookings.id}
              </Typography>
              <Typography>{bookings.status}</Typography>
            </Box>
          </Button>
        ))}
        <Button variant="outlined" color="error" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

CheckBookingsModal.propTypes = {
  modalIsOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
