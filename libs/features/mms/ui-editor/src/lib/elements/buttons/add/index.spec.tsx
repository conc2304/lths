import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import AddButton from './index';

describe('AddButton', () => {
    test('renders without errors', () => {
        const { container } = render(
            <AddButton sx={{}}>Button Name</AddButton>
        );
        expect(container).toBeInTheDocument();
    });

    test('renders without errors when optional parameters are not passed', () => {
        const { container } = render(
            <AddButton sx={undefined} children={undefined}/>
        );
        expect(container).toBeInTheDocument();
    });

    test('displays the children element', () => {
        const testId = "test id"
        render(
            <AddButton>
                <div data-testid={testId}>
                    button text
                </div>
            </AddButton>
        );
        const childrenElement = screen.getByTestId(testId);
        expect(childrenElement).toBeInTheDocument();
    });
});