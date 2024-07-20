import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ActionButtons from '../../src/components/ActionButtons';

describe('ActionButtons', () => {
  const mockHandlers = {
    onHit: jest.fn(),
    onStand: jest.fn(),
  };

  it('renders hit and stand buttons', () => {
    const { getByText } = render(<ActionButtons {...mockHandlers} disabled={false} />);
    expect(getByText('Hit')).toBeInTheDocument();
    expect(getByText('Stand')).toBeInTheDocument();
  });

  it('calls onHit when Hit button is clicked', () => {
    const { getByText } = render(<ActionButtons {...mockHandlers} disabled={false} />);
    fireEvent.click(getByText('Hit'));
    expect(mockHandlers.onHit).toHaveBeenCalled();
  });

  it('calls onStand when Stand button is clicked', () => {
    const { getByText } = render(<ActionButtons {...mockHandlers} disabled={false} />);
    fireEvent.click(getByText('Stand'));
    expect(mockHandlers.onStand).toHaveBeenCalled();
  });

  it('disables buttons when disabled prop is true', () => {
    const { getByText } = render(<ActionButtons {...mockHandlers} disabled={true} />);
    expect(getByText('Hit')).toBeDisabled();
    expect(getByText('Stand')).toBeDisabled();
  });
});