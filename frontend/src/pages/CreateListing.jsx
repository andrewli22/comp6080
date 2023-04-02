import React, { useState } from 'react';
import { Nav } from '../components/Nav';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Container,
  Button,
  Paper,
} from '@mui/material';
import { api } from '../api';
import { fileToDataUrl } from '../fileToData';
// import { ErrorModal } from "../ui/ErrorModal";

const baseFlexStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const CreateListing = () => {
  const [createListingData, setcreateListingData] = useState({});
  const [address, setAddress] = useState({});
  const [metadata, setMetadata] = useState({});

  const handleDataChange = async (event) => {
    let { value, name } = event.target;
    if (event.target.type === 'file') {
      const res = await fileToDataUrl(event.target.files[0]);
      value = res;
    }
    setcreateListingData({ ...createListingData, [name]: value });
  };

  const handleAddressChange = (event) => {
    const { value, name } = event.target;
    setAddress({ ...address, [name]: value });
  };

  const handleMetaDataChange = (event) => {
    let { value, name } = event.target;
    if (name === 'amenities') {
      value = value.split(', ');
      console.log(value);
    }
    setMetadata({ ...metadata, [name]: value });
  };

  const handleCreateSubmit = async () => {
    try {
      const createDataToSubmit = { ...createListingData };
      createDataToSubmit.address = address;
      createDataToSubmit.metadata = metadata;
      console.log(createDataToSubmit);
      const res = await api.post('/listings/new', createDataToSubmit);
      console.log(res.data);
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
    <>
      <Nav />
      <Box sx={{ ...baseFlexStyles, height: '100vh' }}>
        <Container
          sx={{
            ...baseFlexStyles,
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              py: 4,
              px: 8,
              ...baseFlexStyles,
              flexDirection: 'column',
            }}
          >
            <Typography variant={'h3'} gutterBottom>
              Create your new Listing
            </Typography>

            <Grid container sx={{ mb: 5, textAlign: 'center' }}>
              <Grid item xs={6}>
                <TextField
                  required
                  name="title"
                  label="Listing Title"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleDataChange}
                />

                <TextField
                  required
                  name="street"
                  label="Street Address"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleAddressChange}
                />
                <TextField
                  required
                  name="city"
                  label="City"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleAddressChange}
                />
                <TextField
                  required
                  name="state"
                  label="State"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleAddressChange}
                />
                <TextField
                  required
                  name="postcode"
                  label="Post code"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleAddressChange}
                />
                <TextField
                  required
                  name="country"
                  label="Country"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleAddressChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  type={'number'}
                  name="price"
                  label="Listing Price per Night"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleDataChange}
                />

                <TextField
                  required
                  name="thumbnail"
                  label="Listing Thumbnail"
                  type="file"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleDataChange}
                />
                <TextField
                  required
                  name="propertyType"
                  label="Property Type"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleMetaDataChange}
                />

                <TextField
                  required
                  type={'number'}
                  name="numBaths"
                  label="Number of Bathrooms"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleMetaDataChange}
                />

                <TextField
                  required
                  name="beds"
                  label="Bedrooms"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleMetaDataChange}
                />

                <TextField
                  required
                  name="amenities"
                  label="Amenities"
                  sx={{ m: 1, width: '80%' }}
                  onChange={handleMetaDataChange}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              sx={{ textAlign: 'center' }}
              onClick={handleCreateSubmit}
            >
              Create Your Listing
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
