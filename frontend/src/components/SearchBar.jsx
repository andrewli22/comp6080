import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { baseFlexStyles } from '../styles';
import { getAverageRating } from '../utils/functions';
import { PropTypes } from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { StoreContext } from '../utils/store';

export const SearchBar = ({ setFilterInfo }) => {
  const {
    listings: [listings, setListings],
  } = useContext(StoreContext);

  const [filterTextFields, setFilterTextFields] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilterChange = (event) => {
    const { value, name } = event.target;
    setFilterTextFields({ ...filterTextFields, [name]: value });
    if (name === 'startDate') {
      console.log(filterTextFields);
    }
  };

  const submitFilters = () => {
    let collatedFilterInfo = { ...filterTextFields };
    if (startDate && endDate) {
      collatedFilterInfo = {
        ...filterTextFields,
        startDate,
        endDate,
      };
    }
    setFilterInfo(collatedFilterInfo);
  };

  const sortListingsOnRating = (event) => {
    const { value } = event.target;

    console.log(value);
    if (value === 'LOW_TO_HIGH') {
      setListings(
        listings.slice().sort((a, b) => {
          return getAverageRating(a.reviews) - getAverageRating(b.reviews);
        })
      );
    }
    if (value === 'HIGH_TO_LOW') {
      setListings(
        listings.slice().sort((a, b) => {
          return getAverageRating(b.reviews) - getAverageRating(a.reviews);
        })
      );
    }
  };

  const filterStyles = {
    margin: '0.3em 0.7em',
  };

  return (
    <Box sx={{ ...baseFlexStyles, flexWrap: 'wrap' }}>
      <TextField
        label="Title or City"
        name="titleCity"
        sx={{ ...filterStyles }}
        onChange={handleFilterChange}
      />

      <TextField
        label="Min Beds"
        name="minBeds"
        sx={filterStyles}
        onChange={handleFilterChange}
      />

      <TextField
        label="Max Beds"
        name="maxBeds"
        sx={filterStyles}
        onChange={handleFilterChange}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="startDate"
          sx={filterStyles}
          label="Start Date"
          inputFormat="DD/MM/YYYY"
          value={startDate}
          disablePast={true}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />

        <DatePicker
          name="endDate"
          sx={filterStyles}
          label="End Date"
          inputFormat="DD/MM/YYYY"
          value={endDate}
          disablePast={true}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <TextField
        label="Min Price"
        name="minPrice"
        sx={filterStyles}
        onChange={handleFilterChange}
      />

      <TextField
        label="Max Price"
        name="maxPrice"
        sx={filterStyles}
        onChange={handleFilterChange}
      />
      <FormControl sx={{ width: '13em' }}>
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Select
          defaultValue=""
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Rating"
          onChange={sortListingsOnRating}
        >
          <MenuItem value="LOW_TO_HIGH">Rating, Low to High</MenuItem>
          <MenuItem value="HIGH_TO_LOW">Rating, High to Lo</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="coral"
        size="large"
        sx={filterStyles}
        onClick={submitFilters}
      >
        Search
      </Button>
    </Box>
  );
};

SearchBar.propTypes = {
  setFilterInfo: PropTypes.func,
  filterInfo: PropTypes.object,
};
