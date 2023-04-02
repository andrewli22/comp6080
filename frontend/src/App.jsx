import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserListings } from './pages/UserListings';
import { Landing } from './pages/Landing';
import { EditListing } from './pages/EditListing';
import { CreateListing } from './pages/CreateListing';
import { ViewListing } from './pages/ViewListing';
import { ListingBookings } from './pages/ListingBookings';

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/listings" element={<UserListings />} />
        <Route
          path="/user/listings/edit/:listingId"
          element={<EditListing />}
        />
        <Route path="/user/listings/create" element={<CreateListing />} />
        <Route path="/listings/:listingId" element={<ViewListing />} />
        <Route path="/user/listings/:listingId" element={<ListingBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
