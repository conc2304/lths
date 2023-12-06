import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import DrawerContent from './content';
import * as CTX from '../../../../context';

// Mock the context
const useLayoutActionsMock = jest.spyOn(CTX, 'useLayoutActions');

const mockSections = [
  {
    header: 'Section 1',
    items: [
      { id: 'item1', title: 'Item 1' },
      { id: 'item2', title: 'Item 2', hidden: true },
    ],
  },
  {
    header: 'Section 2',
    items: [{ id: 'item3', title: 'Item 3' }],
  },
];

const renderWithWrappers = (component, options = {}) => {
  const rendered = render(<MemoryRouter>{RBThemeProvider({ children: component })}</MemoryRouter>, options);
  return {
    ...rendered,
    rerender: (ui, options) => renderWithWrappers(ui, { container: rendered.container, ...options }),
  };
};

describe('DrawerContent', () => {
  const setDrawerOpenMock = jest.fn();
  const setDrawerSelectedItemMock = jest.fn();
  const mockReturnValues = {
    drawerOpen: true,
    setDrawerOpen: setDrawerOpenMock,
    setDrawerSelectedItem: setDrawerSelectedItemMock,
    setBreadcrumbs: jest.fn(),
    setPageTitle: jest.fn(),
  };

  beforeEach(() => {
    useLayoutActionsMock.mockClear();
    useLayoutActionsMock.mockReturnValue({
      ...mockReturnValues,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders sections and visible items correctly', () => {
    const { getByText, queryByText } = renderWithWrappers(<DrawerContent sections={mockSections} />);

    // Check if visible items are rendered
    expect(getByText('Item 1')).toBeInTheDocument();
    expect(queryByText('Item 2')).not.toBeInTheDocument(); // Hidden item should not be in the document

    // Check if section headers are rendered
    expect(getByText('Section 1')).toBeInTheDocument();
    expect(getByText('Section 2')).toBeInTheDocument();
  });

  it('handles item click events', () => {
    const { getByText } = renderWithWrappers(<DrawerContent sections={mockSections} />);
    const parentIndex = 0;
    const childIndex = 0;
    const itemTitle = mockSections[parentIndex].items[childIndex].title;
    const item = getByText(itemTitle);

    fireEvent.click(item);

    expect(setDrawerSelectedItemMock).toHaveBeenCalledWith(`panel_${parentIndex}_${childIndex}`);
  });

  it('updates selected section and drawer item on drawer close', () => {
    // Set initial state
    useLayoutActionsMock.mockReturnValue({
      ...mockReturnValues,
      drawerOpen: false,
      drawerCurrentItem: 'panel_0_1',
      pageTitle: 'Page Title',
    });

    // On close, if a child item is selected it should set the parent item as selected
    const { rerender } = renderWithWrappers(<DrawerContent sections={mockSections} />);
    expect(setDrawerSelectedItemMock).toHaveBeenCalledWith('panel_0_0');

    // Rerender with drawer open
    useLayoutActionsMock.mockReturnValue({
      ...mockReturnValues,
      drawerOpen: true,
      drawerCurrentItem: 'panel_0_1',
      pageTitle: 'Page Title',
    });

    rerender(<DrawerContent sections={mockSections} />, {});

    // On reopen it should set the original child item as selected
    // Verify that setDrawerSelectedItem is called with the previous item
    expect(setDrawerSelectedItemMock).toHaveBeenCalledWith('panel_0_1');
  });
});
