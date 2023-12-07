import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import DrawerSectionListItem from './section-item';
import * as layoutContext from '../../../../context';

// Mocking hooks and dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../../../../context', () => ({
  useLayoutActions: jest.fn(),
}));

const mockIcon = 'MockIcon';
const mockItem = {
  title: 'Item Title',
  icon: <div>{mockIcon}</div>,
  path: '/item-path',
};
const mockOnListItemClick = jest.fn();
const mockOnAccordionChange = jest.fn();

describe('DrawerSectionListItem', () => {
  const mockUseNavigate = jest.requireMock('react-router-dom').useNavigate;
  const mockUseLayoutActions = layoutContext.useLayoutActions;

  beforeEach(() => {
    mockUseNavigate.mockImplementation(() => jest.fn());
    mockUseLayoutActions.mockImplementation(() => ({
      drawerOpen: true,
    }));
    jest.clearAllMocks();
  });

  it('renders DrawerSectionListItem correctly', () => {
    render(
      <MemoryRouter>
        <DrawerSectionListItem
          item={mockItem}
          selected={false}
          onListItemClick={mockOnListItemClick}
          itemId="item-id"
          showAccordion={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Item Title')).toBeInTheDocument();
    expect(screen.getByText(mockIcon)).toBeInTheDocument();
  });

  it('does not render accordion button when showAccordion is set to false', () => {
    const mockId = 'item-id';

    const { queryByTestId, queryByText } = render(
      <MemoryRouter>
        <DrawerSectionListItem
          item={mockItem}
          selected={false}
          onListItemClick={mockOnListItemClick}
          itemId={mockId}
          showAccordion={false}
        />
      </MemoryRouter>
    );

    expect(queryByTestId('Dashboard-Drawer--section-accordion-btn')).toBeNull();
    expect(queryByText(mockItem.title)).toBeInTheDocument();
    expect(queryByText(mockIcon)).toBeInTheDocument();
  });

  it('only renders the icon when the drawer is closed', () => {
    mockUseLayoutActions.mockImplementation(() => ({
      drawerOpen: false,
    }));

    const mockId = 'item-id';
    const { queryByText } = render(
      <MemoryRouter>
        <DrawerSectionListItem
          item={mockItem}
          selected={false}
          onListItemClick={mockOnListItemClick}
          itemId={mockId}
          showAccordion={false}
        />
      </MemoryRouter>
    );

    expect(queryByText(mockItem.title)).toBeNull();
    expect(queryByText(mockIcon)).toBeInTheDocument();
  });

  it('calls onListItemClick on item click', () => {
    expect(mockOnListItemClick).not.toHaveBeenCalled();

    const mockId = 'item-id';
    render(
      <MemoryRouter>
        <DrawerSectionListItem
          item={mockItem}
          selected={false}
          onListItemClick={mockOnListItemClick}
          itemId={mockId}
          showAccordion={false}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('Dashboard-drawer--section-item-button'));
    expect(mockOnListItemClick).toHaveBeenCalledWith(mockId, false, '/item-path');
  });

  it('toggles accordion on accordion button click', async () => {
    const mockId = 'item-id';

    render(
      <MemoryRouter>
        <DrawerSectionListItem
          item={mockItem}
          selected={false}
          onListItemClick={mockOnListItemClick}
          onAccordionChange={mockOnAccordionChange}
          itemId={mockId}
          showAccordion={true}
          accordionExpanded={false}
        />
      </MemoryRouter>
    );

    const accordionToggle = screen.getByTestId('Dashboard-Drawer--section-accordion-btn');
    expect(within(accordionToggle).getByTestId('ChevronRightIcon')).toHaveStyle({
      transform: 'rotate(0deg)',
    });
    fireEvent.click(accordionToggle);
    expect(mockOnAccordionChange).toHaveBeenCalledWith('item-id', true);
    expect(within(accordionToggle).getByTestId('ChevronRightIcon')).toHaveStyle({
      transform: 'rotate(90deg)',
    });
  });
});
