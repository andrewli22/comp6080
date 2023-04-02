import React from 'react';
import { screen } from '@testing-library/react';
import { render } from './test-utils';
import { Register } from '../pages/Register';

describe('Register', () => {
  beforeEach(() => {
    render(<Register />);
  });

  it('renders the register page to the screen', () => {
    screen.logTestingPlaygroundURL();
  });
});
