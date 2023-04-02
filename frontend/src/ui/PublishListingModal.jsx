import {
  Modal,
  Typography,
  Box,
  Button,
  Container,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { api } from '../api';

export const PublishListingModal = ({ modalIsOpen, handleClose, listingId }) => {
  const style = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '20px',
    boxShadow: 24,
    p: 5,
    gap: '30px'
  };

  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [borderColor, setBorderColor] = useState('-moz-state');
  const [publishMessage, setPublishMessage] = useState('');

  const fomatDate = (date) => {
    return format(date.$d, 'dd/MM/yyyy');
  }
  const addDate = (startDate, endDate) => {
    setAvailability([...availability, { start: startDate, end: endDate }]);
    setBorderColor('green');
    setstartDate(null);
    setendDate(null);
    setPublishMessage('Dates Successfully Published!');
  }
  const handleAvailability = () => {
    // If no input has been added
    if (startDate === null || endDate === null) {
      setPublishMessage('Add Valid Dates!');
      setBorderColor('red');
    } else {
      const formattedStartDate = fomatDate(startDate);
      const formattedEndDate = fomatDate(endDate);
      if (availability.length === 0) {
        addDate(formattedStartDate, formattedEndDate);
      } else {
        // Check if availability dates have already been added
        for (let i = 0; i < availability.length; i++) {
          if (availability[i].start === formattedStartDate && availability[i].end === formattedEndDate) {
            setPublishMessage('Dates already added!');
            setBorderColor('red');
            break;
          } else {
            addDate(formattedStartDate, formattedEndDate);
          }
        }
      }
    }
  }

  const publish = () => {
    if (availability.length !== 0) {
      try {
        api.put(`/listings/publish/${listingId}`, { availability });
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    handleClose();
  }

  const handleStartDate = (newValue) => {
    setstartDate(newValue);
    setBorderColor('-moz-state');
  }

  const handleEndDate = (newValue) => {
    setendDate(newValue);
    setBorderColor('-moz-state');
  }

  return (
    <Modal
    open={modalIsOpen}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" textAlign={'center'}>
          Select Availability Dates
        </Typography>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
        >
          <Container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'column', md: 'row' }, gap: '20px' }}>
            <DatePicker
              name="start"
              label="Start Date"
              inputFormat="DD/MM/YYYY"
              disablePast={true}
              value={startDate}
              onChange={(newValue) => handleStartDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: { borderColor }
                      }
                    }
                  }}
                />)}
            />
            <DatePicker
              name="end"
              label="End Date"
              inputFormat="DD/MM/YYYY"
              disablePast={true}
              value={endDate}
              onChange={(newValue) => handleEndDate(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: { borderColor }
                      }
                    }
                  }}
                />)}
            />
          </Container>
        </LocalizationProvider>
        <Container sx={{ display: 'flex', justifyContent: 'center' }}>
          <p>{publishMessage}</p>
        </Container>
        <Container sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleAvailability}
            >
            Publish
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={publish}
          >
            Close
          </Button>
        </Container>
      </Box>
    </Modal>
  );
};

PublishListingModal.propTypes = {
  modalIsOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  listingId: PropTypes.number
}
