import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import { Form } from './index';
import { groupItemsBySeq } from '../../inputs/filter-form/utils';
import { FormSchema, FormState, AddItem, RemoveItem, ClearGroup, AddGroupItems } from '../../ui-filters';
import { formSchemaMock, formStateMock } from '../filter-form/mockData';

describe('Form component', () => {
  const formSchema: FormSchema[] = formSchemaMock;
  const formState: FormState = formStateMock;
  const columnGroups = groupItemsBySeq([...formSchema]);

  const onAddItem: AddItem = jest.fn();
  const onRemoveItem: RemoveItem = jest.fn();
  const onClearGroup: ClearGroup = jest.fn();
  const onAddGroupItems: AddGroupItems = jest.fn();

  it('should render the form with provided schema and state', () => {
    // Arrange
    render(
      <Form
        formSchema={formSchema}
        formState={formState}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
        onClearGroup={onClearGroup}
        onAddGroupItems={onAddGroupItems}
      />
    );

    // Act

    // Assert
    for (const item of formSchema) {
      const title = item.title;
      if (!title) return;
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it('should render the correct number of columns based on the formSchema', () => {
    render(
      <Form
        formSchema={formSchema}
        formState={formState}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
        onClearGroup={onClearGroup}
        onAddGroupItems={onAddGroupItems}
      />
    );

    const columns = screen.getAllByTestId('form-column');
    expect(columns.length).toBe(Object.keys(columnGroups).length);
  });

  it('should render the correct number of VerticalFormGroup components based on the formSchema', () => {
    // Arrange
    render(
      <Form
        formSchema={formSchema}
        formState={formState}
        onAddItem={onAddItem}
        onRemoveItem={onRemoveItem}
        onClearGroup={onClearGroup}
        onAddGroupItems={onAddGroupItems}
      />
    );

    const formGroupsCount = Object.values(columnGroups).reduce(
      (count, currentColumn) => count + currentColumn.length,
      0
    );
    const verticalFormGroups = screen.getAllByTestId('vertical-form-group');

    // Act
    // Assert
    expect(verticalFormGroups.length).toBe(formGroupsCount);
  });
});
