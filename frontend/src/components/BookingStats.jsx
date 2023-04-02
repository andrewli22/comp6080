import React from 'react';
import { Typography, Paper } from '@mui/material';
import { PropTypes } from 'prop-types';

export const BookingStats = ({ listingProfit, numDaysOnline, daysBooked }) => {
  return (
    <Paper elevation={5} sx={{ p: 3 }}>
      <Typography variant="h4" textAlign={'center'} gutterBottom>
        Booking Stats
      </Typography>
      <Typography gutterBottom variant="body1" sx={{ fontSize: '1.2em' }}>
        This Listing has made ${listingProfit} in profit
      </Typography>
      <Typography gutterBottom variant="body1" sx={{ fontSize: '1.2em' }}>
        The listing has been online for {numDaysOnline} days
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1.2em' }}>
        The listing has been booked for {daysBooked} days
      </Typography>
    </Paper>
  );
};

BookingStats.propTypes = {
  listingProfit: PropTypes.number,
  numDaysOnline: PropTypes.number,
  daysBooked: PropTypes.number,
};
