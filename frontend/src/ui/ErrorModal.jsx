import { Modal, Typography, Card, Button } from '@mui/material';
import React from 'react';
import { PropTypes } from 'prop-types';

export const ErrorModal = ({ message, modalIsOpen, handleClose }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 30,
    borderRadius: '20px',
    p: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  return (
    <Modal
      open={modalIsOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
          {message}
        </Typography>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Close
        </Button>
      </Card>
    </Modal>
  );
};

ErrorModal.propTypes = {
  message: PropTypes.string,
  modalIsOpen: PropTypes.bool,
  handleClose: PropTypes.func,
};
