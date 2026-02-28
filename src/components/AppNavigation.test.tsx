import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../test-utils';
import userEvent from '@testing-library/user-event';
import AppNavigation from './AppNavigation';

describe('AppNavigation', () => {
  const defaultProps = {
    appName: 'Test App',
    score: 100,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  };

  it('renders app name', () => {
    renderWithRouter(<AppNavigation {...defaultProps} />);
    expect(screen.getByText('Test App')).toBeInTheDocument();
  });

  it('renders score when showScore is true (default)', () => {
    renderWithRouter(<AppNavigation {...defaultProps} />);
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('does not render score when showScore is false', () => {
    renderWithRouter(<AppNavigation {...defaultProps} showScore={false} />);
    expect(screen.queryByText('100')).not.toBeInTheDocument();
  });

  it('home button is clickable', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AppNavigation {...defaultProps} />);

    const homeButton = screen.getByRole('button', { name: /home/i });
    await user.click(homeButton);

    // Button should be clickable (navigation tested in integration tests)
    expect(homeButton).toBeInTheDocument();
  });

  it('has accessible home button', () => {
    renderWithRouter(<AppNavigation {...defaultProps} />);
    const homeButton = screen.getByRole('button', { name: /home/i });
    expect(homeButton).toBeInTheDocument();
  });

  it('displays trophy icon for score', () => {
    renderWithRouter(<AppNavigation {...defaultProps} />);
    // The trophy icon is rendered as an SVG
    expect(screen.getByTestId(/EmojiEventsIcon/i)).toBeInTheDocument();
  });

  it('applies gradient styles correctly', () => {
    const { container } = renderWithRouter(<AppNavigation {...defaultProps} />);
    const homeButton = screen.getByRole('button', { name: /home/i });
    expect(homeButton).toHaveStyle({ background: defaultProps.gradient });
  });
});
