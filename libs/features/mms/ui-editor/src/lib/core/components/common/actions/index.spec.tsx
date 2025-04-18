import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import Action from './';
import { EditorProvider, ToolbarContextProvider } from '../../../../context';
import { ActionProps } from '../../types';

describe('Action', () => {
  const mockAction: ActionProps = {
    type: 'native',
    page_id: 'pageId',
    page_link: 'pageLink',
  };
  const mockInitialValue = { components: [] };
  const renderAction = (action: ActionProps = mockAction) => {
    const onPropChange = jest.fn();

    return render(
      <EditorProvider initialValue={mockInitialValue}>
        <ToolbarContextProvider initialValue={{}}>
          <Action action={action} isRadioButton={false} onPropChange={onPropChange} />
        </ToolbarContextProvider>
      </EditorProvider>
    );
  };
  it('should render page_id when type is "native"', () => {
    const { getByDisplayValue, getByTestId, queryByLabelText } = renderAction();

    const typeInput = getByTestId('Action--type');
    // Open the menu
    fireEvent.mouseDown(typeInput);

    // Select native from the menu
    const menuItem = getByDisplayValue('native');
    fireEvent.click(menuItem);

    expect(queryByLabelText('Page ID')).toBeInTheDocument();
    expect(queryByLabelText('Page Link')).not.toBeInTheDocument();
  });

  it('should render page_link when type is "web"', () => {
    const { getByTestId, getByDisplayValue, queryByLabelText } = renderAction({
      ...mockAction,
      type: 'web',
    });

    const typeInput = getByTestId('Action--type');
    // Open the menu
    fireEvent.mouseDown(typeInput);

    // Select native from the menu
    const menuItem = getByDisplayValue('web');
    fireEvent.click(menuItem);

    expect(queryByLabelText('Page ID')).not.toBeInTheDocument();
    expect(queryByLabelText('Page Link')).toBeInTheDocument();
  });
});
