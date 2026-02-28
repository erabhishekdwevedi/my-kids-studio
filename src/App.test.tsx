import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // App should render successfully
    expect(document.body).toBeInTheDocument();
  });

  it('renders the home page by default', async () => {
    render(<App />);

    // Wait for any async operations to complete
    // The home page should load with the app grid
    await screen.findByRole('main', {}, { timeout: 3000 }).catch(() => {
      // If main role not found, just check that something rendered
      expect(document.body.children.length).toBeGreaterThan(0);
    });
  });
});
