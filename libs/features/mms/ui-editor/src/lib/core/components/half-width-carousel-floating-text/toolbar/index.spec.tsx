import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, within, waitFor } from '@testing-library/react';

import HalfWidthCarouselFloatingTextToolbar from './index';
import { EditorProvider } from '../../../../context';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';
import { HalfWidthCarouselFloatingTextComponentProps, AutocompleteItemProps } from '../../types';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('HalfWidthCarouselFloatingText Toolbar', () => {
  let initialState;
  let component: HalfWidthCarouselFloatingTextComponentProps;
  let mockCallbackData: AutocompleteItemProps[];

  beforeEach(() => {
    component = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.HalfWidthCarouselFloatingText,
      data: {
        sub_component_data: [
          {
            name: 'Card 1',
            image: 'image.one',
            img_alt_text: 'alt text 1',
            title: 'Title 1',
            action: { type: 'web', page_id: 'pageId1', page_link: 'pageLink1' },
          },
          {
            name: 'Card 2',
            image: 'image.two',
            img_alt_text: 'alt text 2',
            title: 'Title 2',
            action: { type: 'web', page_id: 'pageId2', page_link: 'pageLink2' },
          },
          {
            name: 'Card 3',
            image: 'image.three',
            img_alt_text: 'alt text 3',
            title: 'Title 3',
            action: { type: 'native', page_id: 'pageId3', page_link: 'pageLink3' },
          },
          {
            name: 'Card 4',
            image: 'image.four',
            img_alt_text: 'alt text 4',
            title: 'Title 4',
            action: { type: 'native', page_id: 'pageId4', page_link: 'pageLink4' },
          },
        ],
      },
    };

    initialState = {
      components: [],
      selectedComponent: component,
    };

    mockCallbackData = [
      { label: 'label1', value: 'pageId1', type: '' },
      { label: 'label2', value: 'pageId2', type: '' },
      { label: 'label3', value: 'pageId3', type: '' },
      { label: 'label4', value: 'pageId4', type: '' },
    ];
  });

  function createMockOnPropChange(callbackData) {
    return function mockOnPropChange(propName, callback) {
      if (propName === 'action') {
        callback(callbackData);
      }
    };
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders toolbar component', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <HalfWidthCarouselFloatingTextToolbar {...component} />
      </EditorProvider>
    );

    const containerLabelCarousel = screen.getByLabelText('Half Width Carousel Floating Text Toolbar: Carousel');
    expect(containerLabelCarousel).toBeInTheDocument();
    const containerLabelCarouselItem = screen.getByLabelText(
      'Half Width Carousel Floating Text Toolbar: Carousel Item'
    );
    expect(containerLabelCarouselItem).toBeInTheDocument();
  });

  test('renders toolbar title and add button', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <HalfWidthCarouselFloatingTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );

    const toolbarlabel = screen.getByText('Carousel');
    expect(toolbarlabel).toBeInTheDocument();

    const addButton = screen.getByText('ADD ITEM').parentElement;
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('renders toolbar with carousel items', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <HalfWidthCarouselFloatingTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );
    const { sub_component_data } = component.data;

    sub_component_data.forEach((item, index) => {
      const carouselListItem = screen.getByLabelText(`carousel-item-${index}`).parentElement as HTMLElement;
      expect(carouselListItem).toBeInTheDocument();

      const editButton = within(carouselListItem).getByLabelText('edit', { selector: 'button' });
      expect(editButton).toBeInTheDocument();

      const deleteButton = within(carouselListItem).getByLabelText('delete', { selector: 'button' });
      expect(deleteButton).toBeInTheDocument();
    });
  });

  test('renders toolbar edit item view', async () => {
    const { container } = render(
      <EditorProvider initialValue={initialState}>
        <HalfWidthCarouselFloatingTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );
    const { sub_component_data } = component.data;

    sub_component_data.forEach(async (item, index) => {
      const carouselListItem = screen.getByLabelText(`carousel-item-${index}`).parentElement as HTMLElement;
      expect(carouselListItem).toBeInTheDocument();

      // Act
      const editButton = within(carouselListItem).getByLabelText('edit', { selector: 'button' });
      fireEvent.click(editButton);

      // Assert
      // test labels
      const toolbarlabel = screen.queryAllByText(item.name);
      expect(toolbarlabel[0]).toBeInTheDocument();
      expect(toolbarlabel.length).toBe(2);
      const imagelabel = screen.getByText('Image');
      expect(imagelabel).toBeInTheDocument();
      const textlabel = screen.getByText('Text');
      expect(textlabel).toBeInTheDocument();
      // test data
      const { image, img_alt_text, title, action } = sub_component_data[index];

      const imageElement = screen.getByRole('img');
      expect(imageElement).toHaveAttribute('src', image);

      expect(container.innerHTML).toContain(img_alt_text);
      expect(container.innerHTML).toContain(title);

      await waitFor(() => {
        if (action.type === 'web') {
          const actionType = screen.getByText('weblink');
          expect(actionType).toBeInTheDocument();

          expect(container.innerHTML).toContain(action.page_link);
        } else if (action.type === 'native') {
          const actionType = screen.getByText('native');
          expect(actionType).toBeInTheDocument();

          const pageIDValue = `${mockCallbackData[index].label}(${mockCallbackData[index].value})`;
          expect(container.innerHTML).toContain(pageIDValue);
        }
      });
    });
  });
});
