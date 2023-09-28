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
      <div className="outer">
        <div className="target"></div>
        <PopperWithArrow
          open={true}
          anchorEl={document.querySelector('.target')}
          onClickAway={onClickAway}
          arrow={true}
        >
          <div>Popper content</div>
        </PopperWithArrow>
      </div>
    );

    expect(document.querySelector('.Popper-with-arrow--root')).toBeInTheDocument();
    expect(getByText('Popper content')).toBeInTheDocument();
    expect(getByTestId('Popper--arrow')).toBeInTheDocument();
  });

  it('renders without arrow', async () => {
    const { getByText, queryByTestId } = render(
      <div>
        <div className="target"></div>
        <div>
          <PopperWithArrow
            open={true}
            anchorEl={document.querySelector('.target')}
            onClickAway={onClickAway}
            arrow={false}
          >
            <div>Popper content</div>
          </PopperWithArrow>
        </div>
      </div>
    );

    expect(getByText('Popper content')).toBeInTheDocument();
    expect(queryByTestId('Popper--arrow')).toBeNull();
  });

  it('calls onClickAway when clicking outside the popper', async () => {
    const user = userEvent.setup();

    const { getByTestId } = render(
      <div data-testid="outside">
        <div className="target"></div>
        <PopperWithArrow
          open={true}
          anchorEl={document.querySelector('.target')}
          onClickAway={onClickAway}
          arrow={true}
        >
          <div>Popper content</div>
        </PopperWithArrow>
      </div>
    );
    await user.click(getByTestId('outside'));

    expect(onClickAway).toHaveBeenCalledTimes(1);
  });
});
