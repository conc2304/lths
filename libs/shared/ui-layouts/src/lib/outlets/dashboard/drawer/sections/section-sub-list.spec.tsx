import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

// import DrawerSectionListItem from './section-item';
import DrawerSectionSubList from './section-sub-list';
import * as layoutContext from '../../../../context';

// Mock the react-router-dom's useNavigate function
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const useLayoutActionsMock = jest.spyOn(layoutContext, 'useLayoutActions');

describe('DrawerSectionSubList', () => {
  const mockItems = [
    { title: 'Item 1', hidden: false, path: '/item3-path' },
    { title: 'Item 2', hidden: true, path: '/item2-path' }, // This item is hidden
    { title: 'Item 3', hidden: false, path: '/item3-path' },
  ];
  const mockOnListItemClick = jest.fn();
  const sectionId = 'section_1';
  const sectionTitle = 'Section Title';
  const selectedItemId = 'section_1_0'; // Assuming first item is selected

  useLayoutActionsMock.mockImplementation(() => ({
    drawerOpen: true,
    setBreadcrumbs: undefined,
    setPageTitle: undefined,
    setDrawerOpen: undefined,
    setDrawerSelectedItem: undefined,
  }));

  it('renders visible items correctly', () => {
    render(
      <DrawerSectionSubList
        visible={true}
        items={mockItems}
        sectionId={sectionId}
        sectionTitle={sectionTitle}
        onListItemClick={mockOnListItemClick}
        selectedItemId={selectedItemId}
      />
    );

    // Check if visible items are rendered and hidden items are not
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('does not render when items are empty or not provided', () => {
    const { container } = render(
      <DrawerSectionSubList
        visible={true}
        items={[]} // Empty items
        sectionId={sectionId}
        sectionTitle={sectionTitle}
        onListItemClick={mockOnListItemClick}
        selectedItemId={selectedItemId}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('calls onListItemClick when a list item is clicked', () => {
    render(
      <DrawerSectionSubList
        visible={true}
        items={mockItems}
        sectionId={sectionId}
        sectionTitle={sectionTitle}
        onListItemClick={mockOnListItemClick}
        selectedItemId={selectedItemId}
      />
    );

    fireEvent.click(screen.getByText('Item 1'));
    expect(mockOnListItemClick).toHaveBeenCalledWith('section_1_0', undefined, expect.anything());
  });

  it('highlights the selected item', () => {
    render(
      <DrawerSectionSubList
        visible={true}
        items={mockItems}
        sectionId={sectionId}
        sectionTitle={sectionTitle}
        onListItemClick={mockOnListItemClick}
        selectedItemId={selectedItemId}
      />
    );

    const selectedItem = screen.getByText('Item 1').parentNode;
    expect(selectedItem).toHaveStyle(`backgroundColor: alpha(theme.palette.primary.main, 0.03)`);
  });
});
