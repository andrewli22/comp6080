import React, { createContext, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [listings, setListings] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    localStorage.setItem('token', userToken);
    if (userToken === null) {
      localStorage.removeItem('token');
    }
  }, [userToken]);

  const store = {
    listings: [listings, setListings],
    token: [userToken, setUserToken],
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export default StoreProvider;

StoreProvider.propTypes = {
  children: PropTypes.function,
};
