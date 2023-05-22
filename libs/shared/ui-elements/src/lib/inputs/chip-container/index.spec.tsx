import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen, within } from '@testing-library/react';

import { ChipContainer } from './index';

describe('ChipContainer component', () => {
  const onDeleteMock = jest.fn();
  const onClearAllMock = jest.fn();
  const openModalMock = jest.fn();

  const selectedFilters = {
    group1: {
      item1: { id: 'item1', title: 'Item 1' },
      item2: { id: 'item2', title: 'Item 2' },
    },
    group2: {
      item3: { id: 'item3', title: 'Item 3' },
    },
  };

  const itemsSelectedCount = Object.values(selectedFilters).reduce(
    (count, currentItem) => count + Object.entries(currentItem).length,
    0
  );

  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Clean up
    jest.clearAllMocks();
  });

  it('should match the snapshot (inline variant)', () => {
    // Arrange
    const component = (
      <ChipContainer
        title="Filters Applied"
        selectedFilters={selectedFilters}
        onDelete={onDeleteMock}
        variant="inline"
        onClearAll={onClearAllMock}
        openModal={openModalMock}
      />
    );

    const { baseElement } = render(RBThemeProvider({ children: component }));
    // Act
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  it('should match the snapshot (modal variant)', () => {
    // Arrange
    const component = (
      <ChipContainer
        title="Filters"
        onDelete={onDeleteMock}
        selectedFilters={selectedFilters}
        variant="modal"
        onClearAll={onClearAllMock}
        openModal={openModalMock}
      />
    );
    render(RBThemeProvider({ children: component }));

    const { baseElement } = render(RBThemeProvider({ children: component }));
    // Act
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  it('should render the ChipContainer with modal variant correctly', () => {
    // Arrange
    const component = (
      <ChipContainer
        title="Filters"
        onDelete={onDeleteMock}
        selectedFilters={selectedFilters}
        variant="modal"
        onClearAll={onClearAllMock}
        openModal={openModalMock}
      />
    );
    render(RBThemeProvider({ children: component }));

    // Act

    // Assert
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('should render the ChipContainer with inline variant correctly', () => {
    // Arrange
    const component = (
      <ChipContainer
        title="Filters Applied"
        selectedFilters={selectedFilters}
        onDelete={onDeleteMock}
        variant="inline"
        onClearAll={onClearAllMock}
        openModal={openModalMock}
      />
    );
    render(RBThemeProvider({ children: component }));

    // Act

    // Assert
    expect(screen.getByText(`${itemsSelectedCount} Filters Applied`)).toBeInTheDocument();
    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  it('should handle onDelete event correctly', () => {
    // Arrange
    const component = (
      <ChipContainer
        title="Filters"
        onDelete={onDeleteMock}
        selectedFilters={selectedFilters}
        variant="modal"
        onClearAll={onClearAllMock}
        openModal={openModalMock}
      />
    );
    render(RBThemeProvider({ children: component }));

    const testParentID = 'group1';
    const testItemID = 'item1';
    const testChip = selectedFilters[testParentID];
    const testChipLabel = testChip[testItemID].title;
    const testChipElem = screen.getByText(testChipLabel).parentElement as HTMLElement;

    const deleteButton = within(testChipElem).getByTestId('CloseIcon');

    // Act
    fireEvent.click(deleteButton);

    // Assert
    expect(deleteButton).toBeInTheDocument();
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith({ parentID: testParentID, itemID: testItemID });
  });

  it('should handle onClearAll event correctly', () => {
    // Arrange
    const component = (
      <ChipContainer
        title="Filters"
        onDelete={onDeleteMock}
        selectedFilters={selectedFilters}
        variant="inline"
        onClearAll={onClearAllMock}
        openModal={openModalMock}
      />
    );
    render(RBThemeProvider({ children: component }));

    // Act
    fireEvent.click(screen.getByText('Clear All'));

    expect(onClearAllMock).toHaveBeenCalledTimes(1);
  });
});
