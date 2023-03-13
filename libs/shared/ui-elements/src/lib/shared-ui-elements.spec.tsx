import { render } from '@testing-library/react';

import SharedUiElements from './shared-ui-elements';

describe('SharedUiElements', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SharedUiElements />);
    expect(baseElement).toBeTruthy();
  });
});
