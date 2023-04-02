import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookingStats } from '../components/BookingStats';
import StoreProvider from '../utils/store';

describe('ListingCard', () => {
  it('renders the register page to the screen', () => {
    render(<BookingStats />);
    screen.logTestingPlaygroundURL();
  });
});
