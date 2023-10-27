import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';

import GenericAutocomplete from './index';
import { AutocompleteOptionProps } from '../types';

describe('GenericAutocomplete', () => {
    let options: AutocompleteOptionProps[];
    const mockOnChange = jest.fn();

    beforeEach(() => {
        options = [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ];
      });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        render(
            <GenericAutocomplete
                label="Select an option"
                value=""
                data={options}
                onChange={mockOnChange}
            />
        );
    });

    test('displays the label', () => {
        const labelValue = "Select an option"
        render(
            <GenericAutocomplete
                label={labelValue}
                value=""
                data={options}
                onChange={mockOnChange}
            />
        );
        const label = screen.getByText(labelValue, {selector: 'label'});
        expect(label).toBeInTheDocument();
    });

    describe('correct labels shown for value', () => {
        test('test first option', () => {
            const { getByRole } = render(
                <GenericAutocomplete
                    label={"Select an option"}
                    value={options[0].value}
                    data={options}
                    onChange={mockOnChange}
                />
            );
            // Arange
            const input = getByRole('combobox');
            // Assert
            expect(input).toHaveValue(options[0].label);
        });

        test('test second option', () => {
            const { getByRole } = render(
                <GenericAutocomplete
                    label={"Select an option"}
                    value={options[1].value}
                    data={options}
                    onChange={mockOnChange}
                />
            );
            // Arange
            const input = getByRole('combobox');
            // Assert
            expect(input).toHaveValue(options[1].label);
        });
    })

    test('custom renderStartAdornment is applied', () => {
        const testId = "unique-test-id-for-custom renderStartAdornment"
        const { getByTestId } = render(
            <GenericAutocomplete
                label="Select an option"
                value={options[2].value}
                data={options}
                onChange={mockOnChange}
                renderStartAdornment={
                    (value, label) => (<div data-testId={testId}>{label}</div>)
                }
            />
        );
        
        // Arange
        const customStartAdornmant = getByTestId(testId);
        // Assert
        expect(customStartAdornmant).toBeInTheDocument();
        expect(customStartAdornmant).toHaveTextContent(options[2].label);

    });

    test('clear value', () => {
        const { getByRole, getByLabelText } = render(
        <GenericAutocomplete
            label="Select an option"
            value={options[1].value}
            data={options}
            onChange={mockOnChange}
        />
        );
        
        // Arange
        const input = getByRole('combobox');
        // Assert
        expect(input).toHaveValue(options[1].label);
        // Arange
        const clearButton = getByLabelText("Clear");
        // Act
        fireEvent.click(clearButton);
        // Assert
        expect(input).toHaveValue('');

    });
});