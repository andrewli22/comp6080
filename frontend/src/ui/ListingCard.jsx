import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../utils/store';
import { getAverageRating } from '../utils/functions';
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import { PropTypes } from 'prop-types';
import { PublishListingModal } from '../ui/PublishListingModal';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export const ListingCard = ({ listing, landing }) => {
  const {
    listings: [listings, setListings],
  } = useContext(StoreContext);

  console.log(listing);

  const averageRating = getAverageRating(listing.reviews);

  const handleDelete = async () => {
    const res = await api.delete(`listings/${listing.id}`);
    setListings(listings.filter((newListing) => newListing.id !== listing.id));
    console.log(res.data);
  };

  const [publishListing, setPublishListing] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [publishedButtonStyle, setPublishedButtonStyle] = useState('');
  const [publishButtonText, setPublishButtonText] = useState('');

  /**
   * Handles publish listing, if listing is not published then open a modal to allow
   * user to enter availabilities to publish. Then change button to show it has been published
   * Otherwise, unpublish the listing and revert button to allow user to publish again
   */
  const handlePublishListing = () => {
    if (publishButtonText === 'Unpublish') {
      handleUnpublishListing();
      publishButton();
    } else {
      if (publishListing === false) {
        setPublishListing(true);
        setModalIsOpen(true);
      }
    }
  };

  /**
   * Load publish buttons according to whether listing has been published or not
   */
  useEffect(() => {
    const checkListingIsPublished = async () => {
      try {
        const res = await api.get(`/listings/${listing.id}`);
        const listingPublished = res.data.listing.published;
        if (listingPublished) {
          unpublishButton();
        } else {
          publishButton();
        }
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    };
    checkListingIsPublished();
  }, []);

  const handleCloseModal = async () => {
    const published = await checkListingIsPublished();
    if (published) {
      unpublishButton();
    } else {
      publishButton();
    }
    setModalIsOpen(false);
    setPublishListing(false);
  };

  const handleUnpublishListing = () => {
    api.put(`/listings/unpublish/${listing.id}`);
  };

  const checkListingIsPublished = async () => {
    const res = await api.get(`/listings/${listing.id}`);
    const published = res.data.listing.published;
    return published;
  };

  const unpublishButton = () => {
    setPublishedButtonStyle('outlined');
    setPublishButtonText('Unpublish');
  };

  const publishButton = () => {
    setPublishedButtonStyle('contained');
    setPublishButtonText('Publish');
  };

  const navigate = useNavigate();

  const handleViewListing = () => {
    navigate(`/listings/${listing.id}`);
  };

  const handleBookingsInfo = () => {
    navigate(`/user/listings/${listing.id}`);
  };

  const handleEditListing = () => {
    navigate(`/user/listings/edit/${listing.id}`);
  };

  return (
    <Card sx={{ maxWidth: 400, m: 3 }}>
      <div style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={listing.thumbnail}
          alt="property"
        />

        {!landing && (
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            sx={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Delete
          </Button>
        )}
      </div>

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Typography gutterBottom variant="body1">
              {listing.title}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container spacing={0.5}>
              <Grid item>
                <StarRateIcon color="gold" />
              </Grid>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="body1"
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {listing.reviews.length === 0 && averageRating}(
                  {listing.reviews.length})
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography gutterBottom variant="body1">
          {listing.metadata.propertyType}
        </Typography>
        <Typography gutterBottom variant="body1">
          {listing.metadata.beds} Beds and {listing.metadata.numBaths} Baths
        </Typography>
        <Typography variant="body1">${listing.price}/night</Typography>
      </CardContent>
      {!landing
        ? (
        <CardActions>
          <Button variant={publishedButtonStyle} onClick={handlePublishListing}>
            {publishButtonText}
          </Button>
          <Button onClick={handleEditListing}>Edit</Button>
          <Button
            variant="contained"
            color="coral"
            onClick={handleBookingsInfo}
          >
            Bookings Info
          </Button>
        </CardActions>
          )
        : (
        <CardActions sx={{ textAlign: 'center' }}>
          <Button
            sx={{ textAlign: 'center' }}
            variant="contained"
            onClick={handleViewListing}
          >
            View
          </Button>
        </CardActions>
          )}
      {publishListing && (
        <PublishListingModal
          modalIsOpen={modalIsOpen}
          handleClose={handleCloseModal}
          listingId={listing.id}
        />
      )}
    </Card>
  );
};

ListingCard.propTypes = {
  listing: PropTypes.object,
  landing: PropTypes.bool,
};
