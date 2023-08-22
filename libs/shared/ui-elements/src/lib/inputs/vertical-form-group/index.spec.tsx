import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { FormSchema } from '@lths/types/ui-filters';

import { VerticalFormGroup } from './index';
import { formStateMock as mockState, formSchemaMock as mockSchema } from '../filter-form/mockData';

describe('VerticalFormGroup component', () => {
  const titleMock = 'Mock Title';
  const subtitleMock = 'Mock Subtitle';
  const formSchemaMock: FormSchema = mockSchema[0];
  formSchemaMock.title = titleMock;
  formSchemaMock.subtitle = subtitleMock;

  const formStateMock = mockState;
  const onAddItemMock = jest.fn();
  const onRemoveItemMock = jest.fn();
  const onClearGroupMock = jest.fn();
  const onAddGroupItemsMock = jest.fn();

  it('should render the VerticalFormGroup component with correct content', () => {
    // Arrange
    render(
      <VerticalFormGroup
        formSchema={formSchemaMock}
        formState={formStateMock}
        onAddItem={onAddItemMock}
        onRemoveItem={onRemoveItemMock}
        onClearGroup={onClearGroupMock}
        onAddGroupItems={onAddGroupItemsMock}
      />
    );
    const infoTooltip = screen.getByTestId('InfoOutlinedIcon');

    // Act
    // Assert
    expect(infoTooltip).toBeInTheDocument();
    expect(screen.getByText(titleMock)).toBeInTheDocument();
    expect(screen.getByText(subtitleMock)).toBeInTheDocument();
  });
});
