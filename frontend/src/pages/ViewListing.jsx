import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Grid,
  Paper,
  Button,
  TextField,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Nav } from '../components/Nav';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { CheckBookingsModal } from '../ui/CheckBookingsModal';
import { StoreContext } from '../utils/store';
import StarRateIcon from '@mui/icons-material/StarRate';
import { api } from '../api'

export const ViewListing = () => {
  const listingId = useParams().listingId;

  const [listingDetail, setListingDetails] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [images, setImages] = useState(null);
  const [propertyImagesExists, setPropertyImagesExists] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numDays, setNumDays] = useState(null);
  const [price, setPrice] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (userToken) {
      setButtonText('Make a Booking');
    } else {
      setButtonText('Login or Register to make a booking');
    }
  }, []);

  const {
    token: [userToken, setUserToken]
  } = useContext(StoreContext);

  useEffect(() => {
    const getListingInfo = async () => {
      try {
        const res = await api.get(`listings/${listingId}`);
        setUserToken(localStorage.getItem('token'));
        if (res) {
          const listingInfo = res.data.listing;
          setListingDetails(listingInfo);
          if (listingInfo.metadata.propertyImages !== undefined) {
            setImages(listingInfo.metadata.propertyImages);
            setPropertyImagesExists(true);
          }
          setPageLoaded(true);
        }
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    getListingInfo();
  }, []);

  const handleCheckInDate = (newValue) => {
    setCheckInDate(newValue);
  }
  const handleCheckOutDate = (newValue) => {
    setCheckOutDate(newValue);
  }

  useEffect(() => {
    if (checkInDate !== null && checkOutDate !== null) {
      const formatCheckInDate = format(checkInDate.$d, 'dd/MM/yyyy').substring(0, 2);
      const formatCheckOutDate = format(checkOutDate.$d, 'dd/MM/yyyy').substring(0, 2);
      setNumDays(formatCheckOutDate - formatCheckInDate);
      setPrice((formatCheckOutDate - formatCheckInDate) * listingDetail.price);
    }
  }, [checkInDate, checkOutDate]);

  const openBookingsModal = () => {
    setModalIsOpen(true);
  }

  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  const handleBooking = async () => {
    if (checkInDate !== null || checkOutDate !== null) {
      try {
        const res = await api.post(`/bookings/new/${listingId}`, {
          dateRange: { checkInDate, checkOutDate },
          totalPrice: price
        });
        console.log(res.data);
        alert('Booking has been made');
      } catch (err) {
        console.log(err.response);
      }
    } else {
      console.log('enter valid dates');
    }
  }

  return (
    <>
      <Nav />
      {pageLoaded && (
        <Container sx={{ mt: '30px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h4">
                {listingDetail.title}
              </Typography>
              {userToken && (
                <Button
                  variant='outlined'
                  sx={{
                    color: '#FF385C',
                    borderColor: '#FF385C',
                    ':hover': {
                      bgcolor: '#f5f2f2',
                      borderColor: '#FF385C'
                    }
                  }}
                  onClick={openBookingsModal}
                >
                  Check Bookings
                </Button>
              )}
            </Box>
            {modalIsOpen && (
              <CheckBookingsModal
                modalIsOpen={modalIsOpen}
                handleClose={handleCloseModal}
              />
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography>
                {`${listingDetail.address.street}, ${listingDetail.address.city}, ${listingDetail.address.state}`}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                4.0 <StarRateIcon color="gold" /> ({listingDetail.reviews.length})
              </Box>
            </Box>
            <Paper
              variant='outlined'
            >
              <ImageList
                sx={{
                  width: '100%',
                  height: 400,
                }}
                variant="quilted"
                cols={4}
                rowHeight={164}
              >
                <ImageListItem key={listingDetail.thumbnail} cols={2} rows={2}>
                  <img src={listingDetail.thumbnail} alt="thumbnail"/>
                </ImageListItem>
                {propertyImagesExists && (
                  images.map((img) => (
                  <ImageListItem key={img}>
                    <img
                      src={img}
                      alt='img'
                    />
                  </ImageListItem>
                  )))}
              </ImageList>
            </Paper>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography>
                  {listingDetail.metadata.propertyType} | {listingDetail.metadata.beds} bedrooms | {listingDetail.metadata.numBaths} baths
                </Typography>
                <Typography variant="h6">
                  Amenities
                </Typography>
                <Grid container spacing={2}>
                  {listingDetail.metadata.amenities
                    .map((amenities, index) => (
                      <Grid item md={6} key={index}>
                        <Typography>{amenities}</Typography>
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <Grid item md={6} align="right">
                <Paper
                  elevation={4}
                  sx={{ width: '80%' }}
                >
                  <Box sx={{
                    height: 'auto',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}
                  >
                    <Typography variant="h6" textAlign="left">
                      ${listingDetail.price} per night
                    </Typography>
                    <Box
                      sx={{ display: 'flex', justifyContent: 'space-between' }}
                    >
                      <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                      >
                        <DatePicker
                          name="checkIn"
                          label="Check In Date"
                          inputFormat="DD/MM/YYYY"
                          disablePast={true}
                          value={checkInDate}
                          onChange={(newValue) => handleCheckInDate(newValue)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                          name="checkOut"
                          label="Check Out Date"
                          inputFormat="DD/MM/YYYY"
                          disablePast={true}
                          value={checkOutDate}
                          onChange={(newValue) => handleCheckOutDate(newValue)}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Box>
                    <Box>
                      <Typography variant="h6" textAlign="left">
                        Total
                      </Typography>
                      <hr />
                    </Box>
                    {numDays && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <Typography variant='body1'>
                            ${listingDetail.price} AUD &times; {numDays}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant='body1'>
                            ${price} AUD
                          </Typography>
                        </div>
                      </Box>
                    )}
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={!userToken}
                      onClick={handleBooking}
                    >
                      {buttonText}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              <Grid item md={6}>
                <Typography variant="h6">
                  Reviews
                </Typography>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                >
                  <Box>
                    <Typography variant="body1">Name</Typography>
                    <Typography>
                      This is the best place ever asdjooa shdfoah foaishd foaisdhfaosid fhaosdihf aosdif hasodifh aosdf hasiasudfh aisudfha isufd asiudfh asdfuh as
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1">Name</Typography>
                    <Typography>
                      This is the worst place ever asdjooa shdfoah foaishd foaisdhfaosid fhaosdihf aosdif hasodifh aosdf hasiasudfh aisudfha isufd asiudfh asdfuh as
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </>
  );
};
