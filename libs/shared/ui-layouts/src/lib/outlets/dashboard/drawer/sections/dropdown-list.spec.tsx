import React from 'react';
import { RBTheme, RBThemeProvider } from '@lths-mui/shared/themes';
import { render, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NavMenuDropDownList } from './dropdown-list';
import * as layoutContext from '../../../../context';

// Mock the context
const mockUseLayoutActions = jest.spyOn(layoutContext, 'useLayoutActions');

const mockItem = {
  title: 'Section Title',
  items: [
    { id: 'sub1', title: 'Subsection 1', path: '/sub1' },
    { id: 'sub2', title: 'Subsection 2', path: '/sub2' },
  ],
};
const mockItemId = 'section_1';
const mockPageTitle = 'Page Title';
const mockSelectedSection = 'section_1';

const renderWithWrappers = (component, options = {}) => {
  const rendered = render(<MemoryRouter>{RBThemeProvider({ children: component })}</MemoryRouter>, options);
  return {
    ...rendered,
    rerender: (ui, options) => renderWithWrappers(ui, { container: rendered.container, ...options }),
  };
};

const useLayoutMocks = {
  setBreadcrumbs: undefined,
  setPageTitle: undefined,
  setDrawerOpen: undefined,
  setDrawerSelectedItem: undefined,
};

describe('NavMenuDropDownList', () => {
  beforeEach(() => {
    // Mock the useLayoutActions context values before each test
    mockUseLayoutActions.mockImplementation(() => ({
      drawerCurrentItem: 'sub1',
      drawerOpen: true,
      ...useLayoutMocks,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByTestId } = renderWithWrappers(
      <NavMenuDropDownList
        item={mockItem}
        itemId={mockItemId}
        pageTitle={mockPageTitle}
        selectedSection={mockSelectedSection}
        onItemClick={() => {
          // do nothing
        }}
        onSubSectionClick={() => {
          // do nothing
        }}
      />
    );

    expect(getByTestId('Dashboard-Drawer--nav-menu-dropdown-list')).toBeInTheDocument();
  });

  it('expands the submenu when the parent item is clicked', () => {
    const { getByText } = renderWithWrappers(
      <NavMenuDropDownList
        item={mockItem}
        itemId={mockItemId}
        pageTitle={mockPageTitle}
        selectedSection={mockSelectedSection}
        onItemClick={() => {}}
        onSubSectionClick={() => {}}
      />
    );
    expect(getByText(mockItem.items[0].title)).toBeInTheDocument();

    // Assume 'DrawerSectionListItem' renders the item title in a button or similar clickable element
    fireEvent.click(getByText(mockItem.title));
    // Verify the submenu is now open
    // This assumes there's an element that appears only when submenu is open, for instance, the title of the first subitem
    expect(getByText(mockItem.items[0].title)).toBeInTheDocument();
  });

  it('calls onItemClick when the parent item is clicked', () => {
    const onItemClickMock = jest.fn();
    const { getByText } = renderWithWrappers(
      <NavMenuDropDownList
        item={mockItem}
        itemId={mockItemId}
        pageTitle={mockPageTitle}
        selectedSection={mockSelectedSection}
        onItemClick={onItemClickMock}
        onSubSectionClick={() => {
          // do nothing
        }}
      />
    );

    fireEvent.click(getByText(mockItem.title));
    expect(onItemClickMock).toHaveBeenCalledWith(mockItemId, true, undefined);
  });

  it('opens the submenu when drawerOpen changes to true', () => {
    // Start with drawerOpen as false
    mockUseLayoutActions.mockImplementation(() => ({
      drawerCurrentItem: 'sub1',
      drawerOpen: false,
      ...useLayoutMocks,
    }));

    const { queryByText, rerender } = renderWithWrappers(
      <NavMenuDropDownList
        item={mockItem}
        itemId={mockItemId}
        pageTitle={mockPageTitle}
        selectedSection={mockSelectedSection}
        onItemClick={() => {
          // do nothing
        }}
        onSubSectionClick={() => {
          // do nothing
        }}
      />
    );

    // Initially, the submenu should not be visible
    expect(queryByText(mockItem.items[0].title)).not.toBeInTheDocument();

    // Change drawerOpen to true and rerender
    mockUseLayoutActions.mockImplementation(() => ({
      drawerCurrentItem: 'sub1',
      drawerOpen: true,
      ...useLayoutMocks,
    }));

    act(() => {
      rerender(
        <NavMenuDropDownList
          item={mockItem}
          itemId={mockItemId}
          pageTitle={mockPageTitle}
          selectedSection={mockSelectedSection}
          onItemClick={() => {
            // do nothing
          }}
          onSubSectionClick={() => {
            // do nothing
          }}
        />,
        {}
      );
    });

    // Now, the submenu should be visible
    expect(queryByText(mockItem.items[0].title)).toBeInTheDocument();
  });

  it('sets the correct styles for child and parent when sublists is opened or closed ', () => {
    const selectedIndex = 0;
    mockUseLayoutActions.mockImplementation(() => ({
      drawerCurrentItem: `section_1_${selectedIndex.toString()}`,
      drawerOpen: true,
      ...useLayoutMocks,
    }));

    const { getByTestId, getByLabelText } = renderWithWrappers(
      <NavMenuDropDownList
        item={mockItem}
        itemId={mockItemId}
        pageTitle={mockPageTitle}
        selectedSection={mockSelectedSection}
        onItemClick={() => {
          // do nothing
        }}
        onSubSectionClick={() => {
          // do nothing
        }}
      />
    );

    // Assert
    // When child item is seleced and accordion is open:
    //  child has primary selection styles
    //  parent has secondary selection styles
    const subItem = getByLabelText(mockItem.items[selectedIndex].title + ' Page');
    expect(subItem).toBeInTheDocument();
    expect(subItem).toHaveStyle({ color: RBTheme.palette.text.primary });
    expect(subItem).toHaveClass('Mui-selected');

    const parentItem = getByLabelText(mockItem.title + ' Page');
    expect(parentItem).toBeInTheDocument();
    expect(parentItem).toHaveClass('Mui-selected');
    expect(parentItem).toHaveStyle({
      color: RBTheme.palette.text.secondary,
    });

    // Act
    const toggleButton = getByTestId('Dashboard-Drawer--section-accordion-btn');
    fireEvent.click(toggleButton);

    // Assert

    // When child item is seleced and accordion is closed:
    //  parent has primary selection styles
    expect(parentItem).toHaveClass('Mui-selected');
    expect(parentItem).toHaveStyle({
      color: RBTheme.palette.text.primary,
    });
  });
});
