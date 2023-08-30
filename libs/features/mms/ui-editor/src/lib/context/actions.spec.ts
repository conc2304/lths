import React from 'react';

import { selectComponent, updateComponent } from './actions';
import { newComponent } from './actions.spec.fixtures';
import { useEditor } from './context';
import { EditorActionType } from './types';

export const setupMockedContext = () => {
  const dispatchMock = jest.fn();
  jest.spyOn(React, 'useContext').mockReturnValue({ dispatch: dispatchMock });
  return dispatchMock;
};

describe('EditorProvider actions', () => {
  it('should dispatch SET_CURRENT_COMPONENT action with the provided component', () => {
    const dispatchMock = setupMockedContext();

    const { dispatch } = useEditor();
    // Call the action
    selectComponent(dispatch)(newComponent);

    // Verify dispatch was called with the correct action type and payload
    expect(dispatchMock).toHaveBeenCalledWith({
      type: EditorActionType.SET_CURRENT_COMPONENT,
      component: newComponent,
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: EditorActionType.SET_CURRENT_COMPONENT,
      component: newComponent,
    });
  });

  it('should update the component object', () => {
    const dispatchMock = setupMockedContext();

    const { dispatch } = useEditor();
    // Call the action
    selectComponent(dispatch)(newComponent);

    const name = 'UPDATED TEST COMP';
    const updatedComponent = { ...newComponent, name };

    const updatedState = { ...updatedComponent };
    // Call the updateComponent action
    updateComponent(dispatch)(updatedState);

    // Verify dispatch was called with the correct action type and payload for UPDATE_COMPONENT
    expect(dispatchMock).toHaveBeenCalledWith({
      type: EditorActionType.UPDATE_COMPONENT,
      component: updatedState,
    });

    // Verify that the component has been updated as expected
    expect(updatedState.name).toEqual(name);
  });
});
