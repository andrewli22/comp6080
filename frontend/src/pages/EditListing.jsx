import React, { useState, useEffect } from 'react';
import { Nav } from '../components/Nav';
import {
  Box,
  Paper,
  Grid,
  TextField,
  Typography,
  Container,
  InputAdornment,
  Button,
  ImageList,
  ImageListItem,
  InputLabel,
} from '@mui/material';
import { api } from '../api';
import { useParams } from 'react-router-dom';
import { fileToDataUrl } from '../fileToData';

export const EditListing = () => {
  const [propertyImage, setPropertyImage] = useState([]);
  const [images, setImages] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [listingData, setListingData] = useState();

  useEffect(() => {
    if (images) {
      for (let i = 0; i < images.length; i++) {
        setPropertyImage([...propertyImage, URL.createObjectURL(images[i])]);
      }
    }
  }, [images]);

  const listingId = useParams().listingId;

  const getListingDetail = async () => {
    try {
      const res = await api.get(`/listings/${listingId}`);
      return res.data.listing;
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const loadListingDetails = async () => {
      try {
        const res = await getListingDetail();
        if (res) {
          setListingData({ ...listingData, res });
          setPageLoaded(true);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.data);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    loadListingDetails();
  }, []);

  const handleMetadata = async (event) => {
    if (event.target.type === 'file') {
      try {
        const res = await fileToDataUrl(event.target.files[0]);
        if (listingData.res.metadata.propertyImages === undefined) {
          listingData.res.metadata.propertyImages = [res];
        } else {
          listingData.res.metadata.propertyImages.push(res);
        }
        setImages([...images, event.target.files[0]]);
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    } else {
      let { value, name } = event.target;
      if (name === 'amenities') {
        value = value.split(', ');
        console.log(value);
      }
      listingData.res.metadata[name] = value;
    }
  };

  const handleNewData = async (event) => {
    if (event.target.type === 'file') {
      try {
        const res = await fileToDataUrl(event.target.files[0]);
        listingData.res.thumbnail = res;
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    } else {
      const { value, name } = event.target;
      listingData.res[name] = value;
    }
  };

  const handleAddressData = (event) => {
    const { value, name } = event.target;
    listingData.res.address[name] = value;
  };

  const handleSubmit = () => {
    console.log(listingData);
    try {
      api.put(`/listings/${listingId}`, listingData.res);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const baseFlexStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const commonStyles = {
    alignItems: 'center',
    m: 1,
    width: '5rem',
    height: '5rem',
    borderRadius: '5px',
  };

  return (
    <div>
      <Nav />
      {pageLoaded && (
        <Box sx={{ ...baseFlexStyles, height: '100vh' }}>
          <Container sx={{ height: 'inherit', mt: '50px' }}>
            <Paper elevation={3} sx={{ height: 'auto' }}>
              <Container sx={{ ...baseFlexStyles }}>
                <Typography
                  variant={'h4'}
                  gutterBottom
                  sx={{ padding: '20px 0 0 0', ...baseFlexStyles }}
                >
                  Edit your listing
                </Typography>
              </Container>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ padding: '20px' }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="title"
                    label="Title"
                    type="text"
                    defaultValue={listingData.res.title}
                    sx={{ width: '60%' }}
                    onChange={handleNewData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="propertyType"
                    label="Property Type"
                    type="text"
                    defaultValue={listingData.res.metadata.propertyType}
                    sx={{ width: '60%' }}
                    onChange={handleMetadata}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="street"
                    label="Street"
                    type="text"
                    defaultValue={listingData.res.address.street}
                    sx={{ width: '60%' }}
                    onChange={handleAddressData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="numBaths"
                    label="Bathrooms"
                    type="number"
                    defaultValue={listingData.res.metadata.numBaths}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ width: '60%' }}
                    onChange={handleMetadata}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="city"
                    label="City"
                    type="text"
                    defaultValue={listingData.res.address.city}
                    sx={{ width: '60%' }}
                    onChange={handleAddressData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="beds"
                    label="Bedrooms"
                    type="number"
                    defaultValue={listingData.res.metadata.beds}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ width: '60%' }}
                    onChange={handleMetadata}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="postcode"
                    label="Postcode"
                    defaultValue={listingData.res.address.postcode}
                    type="text"
                    sx={{ width: '60%' }}
                    onChange={handleAddressData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="thumbnail"
                    label="Thumbnail"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="file"
                    sx={{ width: '60%' }}
                    onChange={handleNewData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="state"
                    label="State"
                    type="text"
                    defaultValue={listingData.res.address.state}
                    sx={{ width: '60%' }}
                    onChange={handleAddressData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="amenities"
                    label="Amenities"
                    defaultValue={listingData.res.metadata.amenities}
                    type="text"
                    sx={{ width: '60%' }}
                    onChange={handleMetadata}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="country"
                    label="Country"
                    defaultValue={listingData.res.address.country}
                    type="text"
                    sx={{ width: '60%' }}
                    onChange={handleAddressData}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  sx={{ ...baseFlexStyles, marginBottom: '10px' }}
                >
                  <TextField
                    name="price"
                    label="Price"
                    type="text"
                    defaultValue={listingData.res.price}
                    sx={{ m: 1, width: '60%' }}
                    onChange={handleNewData}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          Per night
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Container sx={{ ...baseFlexStyles, flexDirection: 'column' }}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    sx={{
                      ...baseFlexStyles,
                      flexDirection: 'column',
                      marginBottom: '20px',
                      height: '100%',
                    }}
                  >
                    <InputLabel>Upload Property Images Below:</InputLabel>
                    <TextField
                      type="file"
                      id="select-image"
                      style={{ display: 'none' }}
                      onChange={handleMetadata}
                    />
                    <ImageList
                      sx={{
                        ...commonStyles,
                        border: 1,
                        borderColor: 'grey.500',
                        width: { xs: 250, sm: 400, md: 600 },
                        height: 200,
                        padding: '0 10px',
                      }}
                      cols={3}
                      rowHeight={164}
                    >
                      {propertyImage.map((item) => (
                        <ImageListItem key={item}>
                          <img src={`${item}`} alt={item} />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Container>
                <Container sx={{ ...baseFlexStyles, gap: '20px' }}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ textAlign: 'center' }}
                  >
                    Save Changes
                  </Button>
                  <label htmlFor="select-image">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      sx={{ textAlign: 'center' }}
                    >
                      Upload Images
                    </Button>
                  </label>
                </Container>
              </Grid>
            </Paper>
          </Container>
        </Box>
      )}
    </div>
  );
};
