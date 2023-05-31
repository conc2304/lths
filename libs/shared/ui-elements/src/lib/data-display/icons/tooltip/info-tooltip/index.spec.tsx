import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {InfoTooltip, InfoTooltipProps, ActionProps } from './index';

describe('InfoTooltip', () => {
  const action: ActionProps = { url: 'https://example.com', title: 'TestTitle' };
  let props: InfoTooltipProps;
  beforeEach(() => {
    props = {
        description: 'This is a description',
        title: 'This is a title',
        action: action
    }
  });

  function RenderAndHover(props: InfoTooltipProps) {
    render(<InfoTooltip {...props} />);
    const tooltipHover = screen.getByTestId("InfoTooltipOnHover");
    expect(tooltipHover).toBeInTheDocument();
    userEvent.hover(tooltipHover as HTMLElement);
    return tooltipHover;
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the info icon', () => {
    render(<InfoTooltip {...props} />);
    const tooltipHover = screen.getByTestId("InfoTooltipOnHover");
    expect(tooltipHover).toBeInTheDocument();

    const tooltipIcon = screen.getByTestId("InfoOutlinedIcon");
    expect(tooltipIcon).toBeInTheDocument();
  });

  test('does not render the component when description and title are not provided', () => {
    props.title = undefined;
    props.description = undefined;
    render(<InfoTooltip {...props} />);

    expect(screen.queryByTestId('InfoTooltipOnHover')).not.toBeInTheDocument();
  });

  test('renders the component when description is not provided but title is', () => {
    props.description = undefined;
    render(<InfoTooltip {...props} />);

    expect(screen.queryByTestId('InfoTooltipOnHover')).toBeInTheDocument();
    
  });

  test('renders the component when title is not provided but description is', () => {
    props.title = undefined;
    render(<InfoTooltip {...props} />);

    expect(screen.queryByTestId('InfoTooltipOnHover')).toBeInTheDocument();
  });
  
  test('renders title and description in the popover', async () => {
    RenderAndHover(props);

    expect(await screen.findByText(props.title.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  describe('popover behavior', () => {
    test('opens the popover on hover', async () => {
        RenderAndHover(props);

        expect(await screen.findByTestId("TooltipPopover")).toBeInTheDocument();
    });

    test('closes the popover on unhover', async () => {
      const tooltipHover = RenderAndHover(props);
      userEvent.unhover(tooltipHover as HTMLElement);

      await waitFor(() => {
        expect(screen.queryByTestId("TooltipPopover")).not.toBeInTheDocument();
      });
    });
  });
  
  describe('action link rendering', () => {
    test('renders the action link in the popover', async () => {
        RenderAndHover(props);
  
        const link = await screen.findByRole('link');
        expect(link).toHaveTextContent(action.title);
        expect(link).toHaveAttribute('href', action.url);
    });

    test('renders the action link with default title in the popover', async () => {
        props.action.title = undefined;
        RenderAndHover(props);
    
        const link = await screen.findByRole('link');
        expect(link).toHaveTextContent('LEARN MORE');
        expect(link).toHaveAttribute('href', action.url);
    });

    test('does not renders the action link in the popover', async () => {
        props.action = undefined;
        RenderAndHover(props);

        await waitFor(() => {
            const link = screen.queryByRole('link');
            expect(link).not.toBeInTheDocument();
        });
    });
  });

  describe('Visual is correct', () => {
    // Function to get the computed color style of an element
    const getBackgroundColor = (element: HTMLElement) => {
      const { backgroundColor } = window.getComputedStyle(element);
      return backgroundColor;
    };
    
    test('color comparison test popover', async () => {
      RenderAndHover(props);

      let backgroundColor;

      await waitFor(() => {
        // Get first color
        const greyCard = screen.getByTestId('GreyCard') as HTMLElement;
        expect(greyCard).toBeInTheDocument();
        backgroundColor = getBackgroundColor(greyCard);
        
        // Get second color
        const greyArrow = screen.getByTestId('GreyArrow');

        // Assert that the colors are the same
        expect(greyArrow).toHaveStyle(`background-color: ${backgroundColor}`);
      });
    });
  });

});