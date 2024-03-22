import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PageItemPreviewed, { PageItemPreviewedProps } from './index';
import { mockPageDetailtProps } from '../../mock-data';

describe('PageItemPreviewed', () => {
    let props: PageItemPreviewedProps;
    const mockOnShowToggle = jest.fn();

    beforeEach(() => {
        props = {
            title: "A Title",
            pageItem: {
                page: {
                    ...mockPageDetailtProps,
                    _id: "unique_id",
                    page_id: "home_page",
                    components: [], 
                    name: "Page Name",
                    is_variant: false,
                    constraints: { _id: "", events: [], locations: [], user_segments: [] },
                },
                isShow: false,
                isDisabled: false,
            },
            onShowToggle: mockOnShowToggle,
        };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        render(
            <MemoryRouter>
                <PageItemPreviewed {...props} />
            </MemoryRouter>
        );
    });

    test('displays the text', () => {
        const { container } = render(
            <MemoryRouter>
                <PageItemPreviewed {...props} />
            </MemoryRouter>
        );
        const { title, pageItem } = props;
        if (pageItem) {
            const { page: { name, page_id } } = pageItem;
            
            expect(container.innerHTML).toContain(title);
            expect(container.innerHTML).toContain(name);
            expect(container.innerHTML).toContain(page_id);
        }
    });
});