import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MemoryRouter } from 'react-router-dom';

import DraggableListItem, { DraggableListItemProps } from './index';

describe('DraggableListItem', () => {
    let props: DraggableListItemProps;
    const mockOnDrag = jest.fn();
    const mockOnToggle = jest.fn();

    beforeEach(() => {
        props = {
            id: "333333",
            index: 0,
            text: "Page Name",
            page_id: "home_page",
            isDefault: false,
            disabled: false,
            checked: false,
            onDrag: mockOnDrag,
            onShowToggle: mockOnToggle,
        };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        render(
            <DndProvider backend={HTML5Backend}>
                <MemoryRouter>
                    <DraggableListItem {...props} />
                </MemoryRouter>
            </DndProvider>
        );
    });

    test('displays the text', () => {
        const { container } = render(
            <DndProvider backend={HTML5Backend}>
                <MemoryRouter>
                    <DraggableListItem {...props} />
                </MemoryRouter>
            </DndProvider>
        );
        const { text, page_id } = props;

        expect(container.innerHTML).toContain(text);
        expect(container.innerHTML).toContain(page_id);
    });

    describe('toggle function', () => {
        test('checked is true', () => {
            props.checked = true;
            render(
                <DndProvider backend={HTML5Backend}>
                    <MemoryRouter>
                        <DraggableListItem {...props} />
                    </MemoryRouter>
                </DndProvider>
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
                <DndProvider backend={HTML5Backend}>
                    <MemoryRouter>
                        <DraggableListItem {...props} />
                    </MemoryRouter>
                </DndProvider>
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
                <DndProvider backend={HTML5Backend}>
                    <MemoryRouter>
                        <DraggableListItem {...props} />
                    </MemoryRouter>
                </DndProvider>
            );

            const defaultLabel = screen.getByLabelText("default page");
            expect(defaultLabel).toBeInTheDocument();
        });

        test('isDefault is false', () => {
            props.isDefault = false;
            render(
                <DndProvider backend={HTML5Backend}>
                    <MemoryRouter>
                        <DraggableListItem {...props} />
                    </MemoryRouter>
                </DndProvider>
            );
            
            const defaultLabel = screen.queryByLabelText("default page");
            expect(defaultLabel).not.toBeInTheDocument();
        });
    })
});