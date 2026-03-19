import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Color Sort title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Color Sort/i);
  expect(titleElement).toBeInTheDocument();
});
