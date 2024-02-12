import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { PreviewWysiwyg } from '../index';

describe('PreviewWysiwyg', () => {
  const mockData = [];

  it('should render without errors', () => {
    render(<PreviewWysiwyg components={mockData} />);
  });
});