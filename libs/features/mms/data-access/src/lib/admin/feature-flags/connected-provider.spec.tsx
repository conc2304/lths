import React, { ReactNode } from 'react';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Flags } from 'react-feature-flags';
import toast from 'react-hot-toast';
import { Provider } from 'react-redux';
import mockConfigureStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';

import { api } from '@lths/shared/data-access';

import { useLazyGetFeatureFlagsQuery } from './api';
import { ConnectedFlagsProvider } from './connected-provider';

// mock necessary modules
jest.mock('./api', () => ({
  useLazyGetFeatureFlagsQuery: jest.fn(),
}));

jest.mock('react-hot-toast');

// set up mock store
const middlewares = [thunk];
const mockStore = mockConfigureStore(middlewares);
const initialAuthState = {
  token: 'mockTocken',
  userId: 'mockId',
  authenticated: true,
};

describe('ConnectedFlagsProvider', () => {
  let store: MockStoreEnhanced;

  beforeEach(async () => {
    jest.clearAllMocks();

    store = mockStore({
      api: api.reducer,
      auth: initialAuthState,
    });

    await act(async () => {
      (useLazyGetFeatureFlagsQuery as jest.Mock).mockReturnValue([jest.fn(), {}]);
    });
  });

  const renderWithWrappers = (children: ReactNode) => {
    return render(
      <Provider store={store}>
        <ConnectedFlagsProvider>{children}</ConnectedFlagsProvider>
      </Provider>
    );
  };
  it('renders its children', () => {
    const child = <div data-testid="child" />;
    const { getByTestId } = renderWithWrappers(child);
    expect(getByTestId('child')).toBeInTheDocument();
  });

  it('calls useLazyGetFeatureFlagsQuery and provides feature flags to FlagsProvider', async () => {
    const featureFlagsData = {
      data: {
        _id: 'mockId',
        enum_values: [
          {
            name: 'MMS_MOCK--test-a',
            value: {
              title: 'MOCK ENABLED FLAG',
              id: 'MMS_MOCK--test-a',
              enabled: true,
              description: 'mock description for enabled',
              module: 'mocking',
            },
          },
          {
            name: 'MMS_MOCK--test-b',
            value: {
              title: 'MOCK DISABLED FLAG',
              id: 'MMS_MOCK--test-b',
              enabled: false,
              description: 'mock description for disabled',
              module: 'mocking',
            },
          },
          {
            name: 'MMS_MOCK--test-c',
            value: {
              title: 'MOCK ENABLED FLAG2',
              id: 'MMS_MOCK--test-c',
              enabled: true,
              description: 'mock description for enabled 2',
              module: 'mocking',
            },
          },
        ],
      },
    };

    (useLazyGetFeatureFlagsQuery as jest.Mock).mockReturnValue([jest.fn(), featureFlagsData]);

    const featAText = 'feature A enabled';
    const featATextRenderOn = featAText + '-renderOn()';
    const featATextRenderOff = featAText + '-renderOff()';
    const featBText = 'feature B enabled';
    const flagsOrMatchText = 'flagsOrMatch';
    const flagsAndMatchFailText = 'flagsAndMatch--Fail';
    const flagsAndMatchPassText = 'flagsAndMatch--Pass';
    // demonstration of various uses and permutations of <Flags /> component
    const children = (
      <>
        {/* this feat. is enabled */}
        <Flags authorizedFlags={['MMS_MOCK--test-a']}>{featAText}</Flags>
        {/* this feat. is disabled */}
        <Flags authorizedFlags={['MMS_MOCK--test-b']}>{featBText}</Flags>
        {/*  if flags are active render the render on*/}
        <Flags
          authorizedFlags={['MMS_MOCK--test-a']}
          renderOn={() => <div>{featATextRenderOn}</div>}
          renderOff={() => <div>{featATextRenderOff}</div>}
        />
        <Flags
          authorizedFlags={['MMS_MOCK--test-b']}
          // * using test id here to differentiate from other tests
          renderOn={() => <div data-testid={featATextRenderOn}></div>}
          renderOff={() => <div data-testid={featATextRenderOff}></div>}
        />
        {/* if either flag is enabled render contents */}
        <Flags authorizedFlags={['MMS_MOCK--test-a', 'MMS_MOCK--test-b']}>
          <div>{flagsOrMatchText}</div>
        </Flags>
        {/* only render if both features are enabled */}
        <Flags exactFlags authorizedFlags={['MMS_MOCK--test-a', 'MMS_MOCK--test-b']}>
          <div>{flagsAndMatchFailText}</div>
        </Flags>
        {/* renders when both features are enabled */}
        <Flags exactFlags authorizedFlags={['MMS_MOCK--test-a', 'MMS_MOCK--test-c']}>
          <div>{flagsAndMatchPassText}</div>
        </Flags>
      </>
    );

    const { queryByText, queryByTestId } = renderWithWrappers(children);

    // wait for the component to finish rendering and updating
    await waitFor(() => {
      expect(queryByText(featAText)).toBeInTheDocument();
      expect(queryByText(featBText)).not.toBeInTheDocument();

      expect(queryByText(featATextRenderOn)).toBeInTheDocument();
      expect(queryByText(featATextRenderOff)).not.toBeInTheDocument();

      expect(queryByTestId(featATextRenderOff)).toBeInTheDocument();
      expect(queryByTestId(featATextRenderOff)).toBeInTheDocument();

      expect(queryByText(flagsOrMatchText)).toBeInTheDocument();
      expect(queryByText(flagsAndMatchFailText)).not.toBeInTheDocument();
      expect(queryByText(flagsAndMatchPassText)).toBeInTheDocument();
    });
  });

  it('displays an error message if no feature flags are retrieved', async () => {
    // Mocking the hook to return null data
    // backend returns null when the enum group is not present
    (useLazyGetFeatureFlagsQuery as jest.Mock).mockReturnValue([jest.fn(), { data: null }]);

    renderWithWrappers(<></>);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.any(String),
        // adding id makes sure that it doenst respawn multiple times
        expect.objectContaining({ id: 'ft-flags-erased' })
      );
    });
  });
});
