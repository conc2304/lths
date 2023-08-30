import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import PageAutocomplete from './index';

describe('PageAutocomplete', () => {
  const mockData = [
    { label: 'Item 1', value: 'value1', type: 'type1' },
    { label: 'Item 2', value: 'value2', type: 'type2' },
  ];

  it('should render without errors', () => {
    const handleChange = jest.fn();

    render(<PageAutocomplete data={mockData} value="" onChange={handleChange} />);
  });
});
