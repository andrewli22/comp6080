import React, { useEffect, useContext, useState } from 'react';
import { ListingCard } from '../ui/ListingCard';
import { Nav } from '../components/Nav';
import { SearchBar } from '../components/SearchBar.jsx';
import { Box, Typography } from '@mui/material';
import { baseFlexStyles } from '../styles';
import { getListings, filterListings } from '../utils/functions';
import { StoreContext } from '../utils/store';

export const Landing = () => {
  const {
    listings: [listings, setListings],
    token: [userToken, setUserToken]
  } = useContext(StoreContext);

  const [filterInfo, setFilterInfo] = useState({});

  useEffect(() => {
    const getLandingListings = async () => {
      try {
        const listings = await getListings();
        setListings(listings);
        setUserToken(localStorage.getItem('token'));
        console.log(userToken);
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
    getLandingListings();
  }, []);

  const landingListingElements = listings
    .filter((listing) => listing.published === true)
    .filter((listing) => filterListings(listing, filterInfo))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((listing) => {
      return <ListingCard key={listing.id} listing={listing} landing={true} />;
    });

  return (
    <>
      <Nav />
      <Typography variant="h1" textAlign={'center'} gutterBottom sx={{ my: 1 }}>
        AirBrb
      </Typography>
      <SearchBar filterInfo={filterInfo} setFilterInfo={setFilterInfo} />

      <Box sx={{ ...baseFlexStyles, flexWrap: 'wrap', mx: 5 }}>
        {landingListingElements.length !== 0
          ? (
              landingListingElements
            )
          : (
          <Typography
            variant="h5"
            textAlign={'center'}
            gutterBottom
            sx={{ ...baseFlexStyles, height: '50vh' }}
          >
            There are currently no published listings 😔
          </Typography>
            )}
      </Box>
    </>
  );
};
