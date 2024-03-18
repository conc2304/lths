import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { PreviewWysiwyg } from '../index';

describe('PreviewWysiwyg', () => {
  const mockData = [];

  test('renders without errors', () => {
    render(<PreviewWysiwyg components={mockData} isLoading={false}/>);
  });

  test('renders without errors when optional parameters are not passed', () => {
    render(<PreviewWysiwyg components={mockData} />);
  });

  describe('Test Loading', () => {
    test('isLoading is false', () => {
        render(<PreviewWysiwyg components={[]} isLoading={false}/>);
        
        const progressbarElement = screen.queryByRole('progressbar');

        expect(progressbarElement).not.toBeInTheDocument();
    });

    test('isLoading is true', () => {
        render(<PreviewWysiwyg components={[]} isLoading={true}/>);
        
        const progressbarElement = screen.queryByRole('progressbar');
        
        expect(progressbarElement).toBeInTheDocument();
    });
});
});