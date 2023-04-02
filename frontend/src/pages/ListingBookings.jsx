import React, { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../utils/store';
import { Nav } from '../components/Nav';
import { BookingStats } from '../components/BookingStats';
import { ActiveBookingReqs } from '../components/ActiveBookingReqs';
import { BookingHistory } from '../components/BookingHistory';
import { useParams } from 'react-router-dom';
import {
  getNumberOfDays,
  getTotalListingProfit,
  getTotalDaysBooked,
} from '../utils/functions';
import { api } from '../api';
import { Box, Typography, Grid } from '@mui/material';
import { baseFlexStyles } from '../styles';

export const ListingBookings = () => {
  const {
    listings: [listings],
  } = useContext(StoreContext);

  const [bookings, setBookings] = useState([]);
  const [listingInfo, setListingInfo] = useState({});
  // const [historyBookings, setHistoryBookings] = useState([]);
  const [activeReqBookings, setActiveReqBookings] = useState([]);

  const { listingId } = useParams();

  const getBookings = async () => {
    const res = await api.get('/bookings');
    const { bookings: bookingsData } = res.data;
    console.log(bookingsData);
    // Set bookings state to all the bookings for relevant listing
    setBookings(
      bookingsData.filter((booking) => {
        return booking.listingId === listingId;
      })
    );
    setActiveReqBookings(
      bookingsData.filter(
        (booking) =>
          booking.status === 'pending' && booking.listingId === listingId
      )
    );
  };
  useEffect(() => {
    getBookings();
    console.log(bookings);

    // console.log(historyBookings);
    console.log(activeReqBookings);

    // Get listing info of relevant listing and set it to state.
    setListingInfo(
      listings.find((listing) => {
        return listing.id === parseInt(listingId);
      })
    );
  }, []);

  React.useEffect(() => {
    getBookings();
  }, [activeReqBookings]);

  // Calculating How many days the listing has been online
  const datePosted = new Date(listingInfo.postedOn);
  const today = new Date();

  const numDaysOnline = getNumberOfDays(datePosted, today);

  // Calculating how much profit the listing has accrued
  const listingProfit = getTotalListingProfit(bookings);

  // Calculating how many days the listing has been booked.
  const daysBooked = getTotalDaysBooked(bookings);

  return (
    <>
      <Nav />
      <Typography variant="h2" textAlign={'center'} gutterBottom sx={{ mt: 4 }}>
        Booking info for {listingInfo.title}
      </Typography>
      <Box sx={{ ...baseFlexStyles, mx: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <BookingStats
              listingProfit={listingProfit}
              daysBooked={daysBooked}
              numDaysOnline={numDaysOnline}
            />
          </Grid>
          <Grid item xs={8}>
            <ActiveBookingReqs
              bookings={bookings}
              activeReqBookings={activeReqBookings}
              setActiveReqBookings={setActiveReqBookings}
              // setHistoryBookings={setHistoryBookings}
            />
          </Grid>
          <Grid item xs={12}>
            <BookingHistory
              // historyBookings={historyBookings}
              bookings={bookings}
              // setHistoryBookings={setHistoryBookings}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
