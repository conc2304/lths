import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';

import ImageAutocomplete from './index';
import { AutocompleteOptionProps } from '../types';

describe('ImageAutocomplete', () => {
    let options: AutocompleteOptionProps[];
    const mockOnChange = jest.fn();

    beforeEach(() => {
        options = [
            { value: 'image1', label: 'Image 1' },
            { value: 'image2', label: 'Image 2' },
            { value: 'option3', label: 'Image 3' },
        ];
      });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        render(
            <ImageAutocomplete
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
            <ImageAutocomplete
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
                <ImageAutocomplete
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
                <ImageAutocomplete
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

    test('renders image startAdornment with correct value', () => {
        const { getByAltText } = render(
            <ImageAutocomplete
                label={'Select an Image'}
                value={options[0].value}
                data={options}
                onChange={mockOnChange}
            />
        );
        
        const imageAvatar = getByAltText(`${options[0].label}_image`);

        // Assert
        expect(imageAvatar).toBeInTheDocument();
        expect(imageAvatar).toHaveAttribute('src', options[0].value);
    });

    test('renders image startAdornment with hidden visibility when value is falsy', () => {
        const { getByTestId } = render(
            <ImageAutocomplete
                label={'Select an Image'}
                value={''}
                data={options}
                onChange={mockOnChange}
            />
        );
        
        const imageAvatar = getByTestId(`PersonIcon`).parentElement;

        // Assert
        expect(imageAvatar).toBeInTheDocument();
        expect(imageAvatar).toHaveStyle('visibility: hidden');
    });

    test('clear value', () => {
        const { getByRole, getByLabelText } = render(
        <ImageAutocomplete
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