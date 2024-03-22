import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';

import ToolbarLabelWithClose from './index';

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
}));

describe('ToolbarLabelWithClose', () => {
    const mockOnClose = jest.fn();
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        const { container } = render(
            <ToolbarLabelWithClose label='A Title' onClose={mockOnClose}/>
        );
        expect(container).toBeInTheDocument();
    });


    test('calls onClose on button click', () => {
        const titleValue = "A Title"
        render(
            <ToolbarLabelWithClose label={titleValue} onClose={mockOnClose}/>
        );

        // Assert
        expect(mockOnClose).not.toHaveBeenCalled();
        
        // Arrange
        const closeButton = screen.getByLabelText(`Close ${titleValue}`);

        // Act
        fireEvent.click(closeButton);

        // Assert
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('displays the text', () => {
        const titleValue = "A Title"

        render(
            <ToolbarLabelWithClose label={titleValue} onClose={mockOnClose}/>
        );
        
        const titleLabel = screen.getByText(titleValue);
        expect(titleLabel).toBeInTheDocument();
    });
});