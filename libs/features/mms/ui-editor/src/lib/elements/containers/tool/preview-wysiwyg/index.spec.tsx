import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import ToolPreviewWysiwyg from './index';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
}));

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
}));

describe('ToolPreviewWysiwyg', () => {
    const mockOnClose = jest.fn();
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders without errors', () => {
        const { container } = render(
            <ToolPreviewWysiwyg
                title = 'A Title'
                desc = 'A Description'
                isStaticPage={false}
                image = ''
                data={[]}
                isLoading={false}
                onClose={mockOnClose}
            />
        );
        expect(container).toBeInTheDocument();
    });

    test('renders without errors when optional parameters are not passed', () => {
        const { container } = render(
            <ToolPreviewWysiwyg
                isStaticPage={false}
                data={[]}
                isLoading={false}
                onClose={mockOnClose}
            />
        );
        expect(container).toBeInTheDocument();
    });

    test('renders without errors when isStaticPage is true', () => {
        const { container } = render(
            <ToolPreviewWysiwyg
                isStaticPage={true}
                image = ''
                data={[]}
                isLoading={false}
                onClose={mockOnClose}
            />
        );
        expect(container).toBeInTheDocument();
    });

    test('displays the text', () => {
        const titleValue = "A Title"
        const descValue = "A Description"

        render(
            <ToolPreviewWysiwyg
                title={titleValue}
                desc={descValue}
                isStaticPage={false}
                data={[]}
                isLoading={false}
                onClose={mockOnClose}
            />
        );
        const titleLabel = screen.getByText(titleValue);
        expect(titleLabel).toBeInTheDocument();
        const descLabel = screen.getByText(descValue);
        expect(descLabel).toBeInTheDocument();
    });
});