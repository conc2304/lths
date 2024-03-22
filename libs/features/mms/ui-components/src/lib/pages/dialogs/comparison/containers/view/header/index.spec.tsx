import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PreviewHeader, { PreviewHeaderProps } from './index';
import { mockPageDetailtProps } from '../../mock-data';

describe('PreviewHeader', () => {
    let props: PreviewHeaderProps;

    beforeEach(() => {
        props = {
            page: {
                ...mockPageDetailtProps,
                _id: "unique_id",
                page_id: "home_page",
                components: [], 
                name: "Page Name",
                is_variant: true,
                constraints: { _id: "", events: [], locations: [], user_segments: [] },
                constraints_formatted: "specific events and states, at arena, out of arena, mighty members",
            },
            showConstraints: true,
        };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        render(
            <MemoryRouter>
                <PreviewHeader {...props} />
            </MemoryRouter>
        );
    });

    test('displays the text', () => {
        const { container } = render(
            <MemoryRouter>
                <PreviewHeader {...props} />
            </MemoryRouter>
        );
        const { name, page_id } = props.page;

        expect(container.innerHTML).toContain(name);
        expect(container.innerHTML).toContain(page_id);
    });

    describe('show/hide constrainst', () => {
        test('showConstraints is true', () => {
            props.showConstraints = true;
            const { container } = render(
                <MemoryRouter>
                    <PreviewHeader {...props} />
                </MemoryRouter>
            );

            const { constraints_formatted } = props.page;
            expect(container.innerHTML).toContain(constraints_formatted);
        });

        test('showConstraints is false', () => {
            props.showConstraints = false;
            const { container } = render(
                <MemoryRouter>
                    <PreviewHeader {...props} />
                </MemoryRouter>
            );

            const { constraints_formatted } = props.page;
            expect(container.innerHTML).not.toContain(constraints_formatted);
        });
    })

    describe('default label', () => {
        test('is_variant is false show default', () => {
            props.page.is_variant = false;
            render(
                <MemoryRouter>
                    <PreviewHeader {...props} />
                </MemoryRouter>
            );

            const defaultLabel = screen.getByLabelText("default page");
            expect(defaultLabel).toBeInTheDocument();
        });

        test('is_variant is true hide default', () => {
            props.page.is_variant = true;
            render(
                <MemoryRouter>
                    <PreviewHeader {...props} />
                </MemoryRouter>
            );
            
            const defaultLabel = screen.queryByLabelText("default page");
            expect(defaultLabel).not.toBeInTheDocument();
        });
    })
});