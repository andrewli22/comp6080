import React from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';
import { baseFlexStyles } from '../styles';
import { api } from '../api';
import { PropTypes } from 'prop-types';
import { format } from 'date-fns';

const BookingRequest = ({
  isActive,
  booking,
  setActiveReqBookings,
  // setHistoryBookings,
}) => {
  const checkInDateObj = new Date(booking.dateRange.checkInDate);
  const checkOutDateObj = new Date(booking.dateRange.checkOutDate);

  const handleAcceptReq = async () => {
    try {
      await api.put(`/bookings/accept/${booking.id}`);
      alert('Booking was successfully accepted');
      setActiveReqBookings([]);
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

  const handleDenyReq = async () => {
    try {
      await api.put(`/bookings/decline/${booking.id}`);
      alert('Booking was successfully declined');
      setActiveReqBookings([]);
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
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Grid container spacing={2} sx={{ ...baseFlexStyles }}>
          <Grid item xs={9}>
            <Typography variant="subtitle1" sx={{ fontSize: '1.1em' }}>
              Requested by {booking.owner} to book from{' '}
              {format(checkInDateObj, 'dd/MM/yyyy')} to{' '}
              {format(checkOutDateObj, 'dd/MM/yyyy')}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            {isActive
              ? (
              <>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ m: 1 }}
                  onClick={handleAcceptReq}
                >
                  Accept
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ m: 1 }}
                  onClick={handleDenyReq}
                >
                  Deny
                </Button>
              </>
                )
              : (
              <Typography variant="subtitle1" sx={{ fontSize: '1.1em' }}>
                STATUS: {booking.status}
              </Typography>
                )}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default BookingRequest;

BookingRequest.propTypes = {
  isActive: PropTypes.bool,
  booking: PropTypes.object,
  setActiveReqBookings: PropTypes.func,
  // setHistoryBookings: PropTypes.func,
};
