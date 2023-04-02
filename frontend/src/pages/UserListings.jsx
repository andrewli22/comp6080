import React, { useEffect, useContext } from 'react';
import { ListingCard } from '../ui/ListingCard';
import { Nav } from '../components/Nav';
import { Box, Typography, Button } from '@mui/material';
import { baseFlexStyles } from '../styles';
import { getListings } from '../utils/functions';
import { StoreContext } from '../utils/store';
import { useNavigate } from 'react-router-dom';

export const UserListings = () => {
  const {
    listings: [listings, setListings],
  } = useContext(StoreContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserListings = async () => {
      try {
        const listings = await getListings();
        setListings(listings);
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
    getUserListings();
  }, []);

  const handleCreateListing = () => {
    navigate('/user/listings/create');
  };

  const UserListingElements = listings
    .filter((listing) => listing.owner === localStorage.getItem('email'))
    .map((listing) => {
      return <ListingCard key={listing.id} listing={listing} landing={false} />;
    });

  return (
    <>
      <Nav />
      <Typography variant="h1" textAlign={'center'} sx={{ my: 1 }}>
        Your Listings
      </Typography>

      <Box sx={{ ...baseFlexStyles, my: 2 }}>
        <Button variant="contained" onClick={handleCreateListing}>
          Create a New Listing
        </Button>
      </Box>

      <Box sx={{ ...baseFlexStyles, flexWrap: 'wrap', mx: 5 }}>
        {UserListingElements}
      </Box>
    </>
  );
};
