import React from 'react';
import { Typography, Paper } from '@mui/material';
import BookingRequest from '../ui/BookingRequest';
import { PropTypes } from 'prop-types';

export const ActiveBookingReqs = ({
  bookings,
  // activeBookingReqs,
  setActiveReqBookings,
  // setHistoryBookings,
}) => {
  console.log(bookings);

  const activeBookingElements = bookings
    .filter((booking) => booking.status === 'pending')
    .map((booking) => {
      return (
        <BookingRequest
          key={booking.id}
          booking={booking}
          isActive={true}
          setActiveReqBookings={setActiveReqBookings}
          // setHistoryBookings={setHistoryBookings}
        />
      );
    });

  return (
    <Paper elevation={5} sx={{ p: 3 }}>
      <Typography variant="h4" textAlign={'center'} gutterBottom>
        Active Booking Requests
      </Typography>

      {activeBookingElements.length !== 0
        ? activeBookingElements
        : 'You have no active requests'}
    </Paper>
  );
};

ActiveBookingReqs.propTypes = {
  // activeBookingReqs: PropTypes.array,
  setActiveReqBookings: PropTypes.func,
  // setHistoryBookings: PropTypes.func,
  bookings: PropTypes.array,
};
