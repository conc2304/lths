import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PageListCompared, { PageListComparedProps } from './index';
import { mockPageDetailtProps } from '../../mock-data';

describe('PageListCompared', () => {
    let props: PageListComparedProps;
    const mockOnDrag = jest.fn();
    const mockOnShowToggle = jest.fn();

    beforeEach(() => {
        props = {
            title: "Page List",
            pageList: [
                {
                    ...mockPageDetailtProps,
                    _id: "unique_id",
                    page_id: "home_page",
                    components: [], 
                    name: "Page Name",
                    is_variant: false,
                    constraints: { _id: "", events: [], locations: [], user_segments: [] },
                },
                {
                    ...mockPageDetailtProps,
                    _id: "unique_id2",
                    page_id: "home_page",
                    components: [], 
                    name: "Home Page Variant 1",
                    is_variant: true,
                    constraints: { _id: "", events: [], locations: [], user_segments: [] },
                },
                {
                    ...mockPageDetailtProps,
                    _id: "unique_id3",
                    page_id: "home_page",
                    components: [], 
                    name: "Home Page Variant 2",
                    is_variant: true,
                    constraints: { _id: "", events: [], locations: [], user_segments: [] },
                }
            ],
            showPageList: [true, false, true],
            disabledPageList: [false, false, false],
            onDrag: mockOnDrag,
            onShowToggle: mockOnShowToggle,
        };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        render(
            <MemoryRouter>
                <PageListCompared {...props} />
            </MemoryRouter>
        );
    });

    test('displays the text', () => {
        const { container } = render(
            <MemoryRouter>
                <PageListCompared {...props} />
            </MemoryRouter>
        );
        const { title, pageList } = props;
        expect(container.innerHTML).toContain(title);

        pageList?.forEach((page) => {
            const { page_id, name } = page;
            expect(container.innerHTML).toContain(page_id);
            expect(container.innerHTML).toContain(name);
        });
    });

    test('toggle function', () => {
        render(
            <MemoryRouter>
                <PageListCompared {...props} />
            </MemoryRouter>
        );

        const { pageList, showPageList } = props;

        pageList?.forEach((page, index) => {
            const checked = showPageList[index];
            const showHideToggle = screen.getByLabelText(`show/hide toggle${index}`);
            expect(showHideToggle.classList.contains('Mui-checked')).toBe(checked);
        
            const inputs = screen.queryAllByRole('checkbox');
            fireEvent.click(inputs[index]);

            expect(mockOnShowToggle).toHaveBeenCalledTimes((index + 1));
            expect(mockOnShowToggle).toHaveBeenCalledWith(!checked, index);
        });  
    });

    test('default labels', () => {
        if( props.pageList ) {
            props.pageList[0].is_variant = false;
            props.pageList[1].is_variant = true;
            props.pageList[2].is_variant = false;
        }
        render(
            <MemoryRouter>
                <PageListCompared {...props} />
            </MemoryRouter>
        );

        const defaultLabels = screen.getAllByLabelText("default page");
        expect(defaultLabels.length).toEqual(2);
    })
});