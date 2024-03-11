import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import EditableListItemTextWithClose from './index';

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
}))

describe('EditableListItemTextWithClose', () => {
    const mockOnClose = jest.fn();
    const mockOnSave = jest.fn();
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        const { container } = render(
            <EditableListItemTextWithClose
                text="Item Name 2"
                sx={{}}
                textStyle={{}}
                onClose={mockOnClose}
                onSave={mockOnSave}
            />
        );
        expect(container).toBeInTheDocument();
    });

    test('renders without errors when optional parameters are not passed', () => {
        const { container } = render(
            <EditableListItemTextWithClose
                text="Item Name 2"
                sx={undefined}
                textStyle={undefined}
                onClose={undefined}
                onSave={mockOnSave}
            />
        );
        expect(container).toBeInTheDocument();
    });

    test('displays the text', () => {
        const textValue = "Cool Item Name"
        render(
            <EditableListItemTextWithClose
                text={textValue}
                sx={{}}
                textStyle={{}}
                onClose={mockOnClose}
                onSave={mockOnSave}
            />
        );
        const label = screen.getByText(textValue);
        expect(label).toBeInTheDocument();
    });
});