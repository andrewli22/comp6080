import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import userEvent from '@testing-library/user-event';
import { ListingCard } from '../ui/ListingCard';
import { Iron } from '@mui/icons-material';

describe('ListingCard on landing page', () => {
  beforeEach(() => {
    const listingObject = {
      id: 123345,
      title: 'title',
      owner: 'owner@owner',
      postedOn: '2022-11-13T01:39:53.331Z',
      price: '80',
      published: true,
      thumbnail: null,
      reviews: [],
      address: {
        city: 'Sydney',
        country: 'Aus',
        postcode: '2121',
        state: 'NSW',
        street: 'cool street',
      },
      availability: [
        {
          start: '19/11/2022',
          end: '29/11/2022',
        },
      ],
      metadata: {
        amenities: ['bath', 'spa', 'microwave'],
        beds: '1',
        numBaths: '1',
        propertyType: 'Apartment',
      },
    };
    render(<ListingCard landing={true} listing={listingObject} />);
  });

  it('renders the listing title', () => {
    const title = screen.getByText(/title/i);
    expect(title).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  it('renders the property type', () => {
    const propertyType = screen.getByText(/apartment/i);
    expect(propertyType).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  it('renders price', () => {
    const price = screen.getByText(/\$80\/night/i);
    expect(price).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  it('navigates user when the view button is clicked', () => {
    const viewButton = screen.getByRole('button', {
      name: /view/i,
    });
  });
});

describe('ListingCard on user listings page', () => {
  beforeEach(() => {
    const listingObject = {
      id: 123345,
      title: 'title',
      owner: 'owner@owner',
      postedOn: '2022-11-13T01:39:53.331Z',
      price: '80',
      published: true,
      thumbnail: null,
      reviews: [],
      address: {
        city: 'Sydney',
        country: 'Aus',
        postcode: '2121',
        state: 'NSW',
        street: 'cool street',
      },
      availability: [
        {
          start: '19/11/2022',
          end: '29/11/2022',
        },
      ],
      metadata: {
        amenities: ['bath', 'spa', 'microwave'],
        beds: '1',
        numBaths: '1',
        propertyType: 'Apartment',
      },
    };
    render(<ListingCard landing={false} listing={listingObject} />);
  });

  it('renders the listing title', () => {
    const title = screen.getByText(/title/i);
    expect(title).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  it('renders the property type', () => {
    const propertyType = screen.getByText(/apartment/i);
    expect(propertyType).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  it('renders price', () => {
    const price = screen.getByText(/\$80\/night/i);
    expect(price).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  it('renders a delete button', async () => {
    const deleteButton = screen.getByRole('button', {
      name: /delete/i,
    });

    expect(deleteButton).toBeInTheDocument();
  });
  it('renders an edit button', async () => {
    const editButton = screen.getByRole('button', {
      name: /edit/i,
    });

    expect(editButton).toBeInTheDocument();
  });
  it('renders a booking info button', async () => {
    const bookingInfoButton = screen.getByRole('button', {
      name: /bookings info/i,
    });

    expect(bookingInfoButton).toBeInTheDocument();
  });
});
