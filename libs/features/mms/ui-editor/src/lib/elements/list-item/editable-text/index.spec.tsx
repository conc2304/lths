import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import EditableListItemText from './index';

describe('EditableListItemText', () => {
    const mockOnLabelClick = jest.fn();
    const mockOnSave= jest.fn();
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        const { container } = render(
            <EditableListItemText
                text="Item Name 2"
                sx={{}}
                textStyle={{}}
                onLabelClick={mockOnLabelClick}
                onSave={mockOnSave}
            />
        );
        expect(container).toBeInTheDocument();
    });

    test('renders without errors when optional parameters are not passed', () => {
        const { container } = render(
            <EditableListItemText
                text="Item Name 2"
                sx={undefined}
                textStyle={undefined}
                onLabelClick={undefined}
                onSave={mockOnSave}
            />
        );
        expect(container).toBeInTheDocument();
    });

    test('displays the text', () => {
        const textValue = "Cool Item Name"
        render(
            <EditableListItemText
                text={textValue}
                sx={{}}
                textStyle={{}}
                onLabelClick={mockOnLabelClick}
                onSave={mockOnSave}
            />
        );
        const label = screen.getByText(textValue);
        expect(label).toBeInTheDocument();
    });
});