import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import QuizAppTemplate from './QuizAppTemplate';

describe('QuizAppTemplate', () => {
  const mockQuestions = [
    {
      question: 'What is 2 + 2?',
      emoji: '🔢',
      options: ['3', '4', '5', '6'],
      correctAnswer: '4',
    },
    {
      question: 'What is 3 + 3?',
      emoji: '🔢',
      options: ['5', '6', '7', '8'],
      correctAnswer: '6',
    },
  ];

  const defaultProps = {
    title: 'Math Quiz',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    questions: mockQuestions,
  };

  it('renders quiz title', () => {
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);
    expect(screen.getByText('Math Quiz')).toBeInTheDocument();
  });

  it('displays the first question', () => {
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
  });

  it('displays question emoji', () => {
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);
    expect(screen.getByText('🔢')).toBeInTheDocument();
  });

  it('displays all answer options', () => {
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('displays initial score of 0', () => {
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increases score on correct answer', async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);

    const correctButton = screen.getByRole('button', { name: '4' });
    await user.click(correctButton);

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });

  it('shows correct feedback on right answer', async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);

    const correctButton = screen.getByRole('button', { name: '4' });
    await user.click(correctButton);

    await waitFor(() => {
      expect(screen.getByText(/Correct!/i)).toBeInTheDocument();
    });
  });

  it('shows wrong feedback on incorrect answer', async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);

    const wrongButton = screen.getByRole('button', { name: '3' });
    await user.click(wrongButton);

    await waitFor(() => {
      expect(screen.getByText(/Try Again/i)).toBeInTheDocument();
    });
  });

  it('moves to next question after correct answer', async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);

    const correctButton = screen.getByRole('button', { name: '4' });
    await user.click(correctButton);

    await waitFor(() => {
      expect(screen.getByText('What is 3 + 3?')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('displays question progress', () => {
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);
    expect(screen.getByText(/Question 1 of 2/i)).toBeInTheDocument();
  });

  it('has accessible home button', () => {
    renderWithRouter(<QuizAppTemplate {...defaultProps} />);
    const homeButton = screen.getByRole('button', { name: /home/i });
    expect(homeButton).toBeInTheDocument();
  });
});
