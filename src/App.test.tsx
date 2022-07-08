import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './views/Home';

test('test home page', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Helo/i);
  expect(linkElement).toBeInTheDocument();
});
