import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ToggleListItem, { ToggleListItemProps} from './index';

describe('ToggleListItem', () => {
    let props: ToggleListItemProps;
    const mockOnToggle = jest.fn();

    beforeEach(() => {
        props = {
            index: 0,
            text: "Page Name",
            page_id: "home_page",
            isDefault: false,
            disabled: false,
            checked: false,
            onToggle: mockOnToggle,
        };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        render(
            <MemoryRouter>
                <ToggleListItem {...props} />
            </MemoryRouter>
        );
    });

    test('displays the text', () => {
        const { container } = render(
            <MemoryRouter>
                <ToggleListItem {...props} />
            </MemoryRouter>
        );
        const { text, page_id } = props;

        expect(container.innerHTML).toContain(text);
        expect(container.innerHTML).toContain(page_id);
    });

    describe('toggle function', () => {
        test('checked is true', () => {
            props.checked = true;
            render(
                <MemoryRouter>
                    <ToggleListItem {...props} />
                </MemoryRouter>
            );

            const { checked, index } = props;

            const showHideToggle = screen.getByLabelText(`show/hide toggle${props.index}`);
            expect(showHideToggle.classList.contains('Mui-checked')).toBe(true);

            const input = screen.getByRole('checkbox');
            fireEvent.click(input);

            expect(mockOnToggle).toHaveBeenCalledTimes(1);
            expect(mockOnToggle).toHaveBeenCalledWith(!checked, index);
        });

        test('checked is false', () => {
            props.checked = false;
            render(
                <MemoryRouter>
                    <ToggleListItem {...props} />
                </MemoryRouter>
            );
            
            const { checked, index } = props;

            const showHideToggle = screen.getByLabelText(`show/hide toggle${props.index}`);
            expect(showHideToggle.classList.contains('Mui-checked')).toBe(false);

            const input = screen.getByRole('checkbox');
            fireEvent.click(input);

            expect(mockOnToggle).toHaveBeenCalledTimes(1);
            expect(mockOnToggle).toHaveBeenCalledWith(!checked, index);
        });
    });

    describe('default label', () => {
        test('isDefault is true', () => {
            props.isDefault = true;
            render(
                <MemoryRouter>
                    <ToggleListItem {...props} />
                </MemoryRouter>
            );

            const defaultLabel = screen.getByLabelText("default page");
            expect(defaultLabel).toBeInTheDocument();
        });

        test('isDefault is false', () => {
            props.isDefault = false;
            render(
                <MemoryRouter>
                    <ToggleListItem {...props} />
                </MemoryRouter>
            );
            
            const defaultLabel = screen.queryByLabelText("default page");
            expect(defaultLabel).not.toBeInTheDocument();
        });
    })
});