import React from 'react';
import { Typography, Paper } from '@mui/material';
import BookingRequest from '../ui/BookingRequest';
import { PropTypes } from 'prop-types';

export const BookingHistory = ({
  // historyBookings,
  // setHistoryBookings,
  bookings,
}) => {
  /* setHistoryBookings(
    bookings.filter((booking) => booking.status !== 'pending')
  ); */

  const OldBookingElements = bookings
    .filter((booking) => booking.status !== 'pending')
    .map((booking) => {
      return (
        <BookingRequest key={booking.id} isActive={false} booking={booking} />
      );
    });

  return (
    <Paper elevation={5} sx={{ p: 3 }}>
      <Typography variant="h4" textAlign={'center'} gutterBottom>
        Booking Requests History
      </Typography>
      {OldBookingElements.length !== 0
        ? OldBookingElements
        : 'The booking history for this listing is empty'}
    </Paper>
  );
};

BookingHistory.propTypes = {
  // historyBookings: PropTypes.array,
  // setHistoryBookings: PropTypes.func,
  bookings: PropTypes.array,
};
