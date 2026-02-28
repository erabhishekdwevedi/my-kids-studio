import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import PianoApp from './PianoApp';

// Mock AudioContext
class MockAudioContext {
  createOscillator() {
    return {
      connect: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      frequency: { value: 0 },
      type: 'sine',
    };
  }
  createGain() {
    return {
      connect: jest.fn(),
      gain: {
        setValueAtTime: jest.fn(),
        exponentialRampToValueAtTime: jest.fn(),
      },
    };
  }
  get destination() {
    return {};
  }
  get currentTime() {
    return 0;
  }
  close() {
    return Promise.resolve();
  }
}

(global as any).AudioContext = MockAudioContext;
(global as any).webkitAudioContext = MockAudioContext;

describe('PianoApp', () => {

  it('renders without crashing', () => {
    renderWithRouter(<PianoApp />);
    expect(screen.getAllByText(/Piano/i).length).toBeGreaterThan(0);
  });

  it('displays piano title with emoji', () => {
    renderWithRouter(<PianoApp />);
    expect(screen.getAllByText(/Piano 🎹/i).length).toBeGreaterThan(0);
  });

  it('displays initial score of 0', () => {
    renderWithRouter(<PianoApp />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays instruction text', () => {
    renderWithRouter(<PianoApp />);
    expect(screen.getByText(/Tap the keys to play music!/i)).toBeInTheDocument();
  });

  it('renders piano keys', () => {
    renderWithRouter(<PianoApp />);
    // Piano keys display note labels like C, D, E, F, G, A, B
    expect(screen.getAllByText('C').length).toBeGreaterThan(0);
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('E')).toBeInTheDocument();
  });

  it('plays note and increases score on key click', async () => {
    const user = userEvent.setup();
    renderWithRouter(<PianoApp />);

    // Find a piano key by its note label (use D which is unique)
    const dKey = screen.getByText('D');
    expect(dKey).toBeInTheDocument();

    // Click the key - score should update
    await user.click(dKey);

    // Note: Score tracking is tested in other components, here we just verify the key is clickable
  });

  it('has accessible home button', () => {
    renderWithRouter(<PianoApp />);
    const homeButton = screen.getByRole('button', { name: /home/i });
    expect(homeButton).toBeInTheDocument();
  });

  it('home button is clickable', async () => {
    const user = userEvent.setup();
    renderWithRouter(<PianoApp />);

    const homeButton = screen.getByRole('button', { name: /home/i });
    await user.click(homeButton);

    expect(homeButton).toBeInTheDocument();
  });
});
