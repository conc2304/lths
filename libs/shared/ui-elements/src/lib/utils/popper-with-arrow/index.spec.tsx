import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PopperWithArrow } from './index';

describe('PopperWithArrow component', () => {
  const onClickAway = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with arrow', () => {
    const { getByText, getByTestId } = render(
      <div>
        <PopperWithArrow open={true} anchorEl={null} onClickAway={onClickAway} arrow={true}>
          <div>Popper content</div>
        </PopperWithArrow>
      </div>
    );

    expect(getByText('Popper content')).toBeInTheDocument();
    expect(getByTestId('Popper--arrow')).toBeInTheDocument();
  });

  it('renders without arrow', async () => {
    const { getByText, queryByTestId } = render(
      <div>
        <PopperWithArrow open={true} anchorEl={undefined} onClickAway={onClickAway} arrow={false}>
          <div>Popper content</div>
        </PopperWithArrow>
      </div>
    );

    expect(getByText('Popper content')).toBeInTheDocument();
    expect(queryByTestId('Popper--arrow')).toBeNull();
  });

  it('calls onClickAway when clicking outside the popper', async () => {
    const { getByTestId } = render(
      <div data-testid="outside">
        <PopperWithArrow open={true} anchorEl={null} onClickAway={onClickAway} arrow={true}>
          <div>Popper content</div>
        </PopperWithArrow>
      </div>
    );
    await userEvent.click(getByTestId('outside'));

    expect(onClickAway).toHaveBeenCalledTimes(1);
  });
});
