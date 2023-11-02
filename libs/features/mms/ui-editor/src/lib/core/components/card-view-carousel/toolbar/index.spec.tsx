import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, within } from '@testing-library/react';

import CardViewCarouselToolbar from './index';
import { EditorProvider } from '../../../../context';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';
import { CardViewCarouselComponentProps, AutocompleteItemProps } from '../../types';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('CardViewCarousel Toolbar', () => {
  let initialState;
  let component: CardViewCarouselComponentProps;
  let mockCallbackData: AutocompleteItemProps[];

  beforeEach(() => {
    component = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.CardViewCarousel,
      data: {
        sub_component_data: [
          {
            name: 'Card 1',
            image: 'https://Image-1.png',
            action: { type: 'webview', page_id: 'pageId1', page_link: 'pageLink1' },
          },
          {
            name: 'Card 2',
            image: 'https://Image-2.png',
            action: { type: 'webview', page_id: 'pageId2', page_link: 'pageLink2' },
          },
          {
            name: 'Card 3',
            image: 'https://Image-3.png',
            action: { type: 'native', page_id: 'pageId3', page_link: 'pageLink3' },
          },
          {
            name: 'Card 4',
            image: 'https://Image-4.png',
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

  test('should render CardViewCarousel toolbar component', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <CardViewCarouselToolbar {...component} />
      </EditorProvider>
    );

    const containerLabelCarousel = screen.getByLabelText('Card View Carousel Toolbar: Carousel');
    expect(containerLabelCarousel).toBeInTheDocument();
    const containerLabelCarouselItem = screen.getByLabelText('Card View Carousel Toolbar: Carousel Item');
    expect(containerLabelCarouselItem).toBeInTheDocument();
  });

  test('should render CardViewCarousel toolbar title and add button', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <CardViewCarouselToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );

    const toolbarlabel = screen.getByText('Carousel');
    expect(toolbarlabel).toBeInTheDocument();

    const addButton = screen.getByText('ADD ITEM').parentElement;
    expect(addButton).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('should render CardViewCarousel toolbar with carousel items', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <CardViewCarouselToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
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

  test('should render CardViewCarousel toolbar edit item view', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <CardViewCarouselToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );
    const { sub_component_data } = component.data;

    // for (let index = 0; index < sub_component_data.length; index++) {
    sub_component_data.forEach((item, index) => {
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
      const actionlabel = screen.getByText('Action');
      expect(actionlabel).toBeInTheDocument();
      // test data
      const imageElement = screen.getByRole('img');
      expect(imageElement).toHaveAttribute('src', sub_component_data[index].image);

      if (sub_component_data[index].action.type === 'webview') {
        const actionType = screen.getByText('weblink');
        expect(actionType).toBeInTheDocument();

        const pageLinkInputContainer = screen.getByLabelText('Page Link').parentElement as HTMLElement;
        const pageLinkInput = pageLinkInputContainer.querySelector('textarea');
        expect(pageLinkInput?.value).toContain(sub_component_data[index].action.page_link);
      } else if (sub_component_data[index].action.type === 'native') {
        const actionType = screen.getByText('native');
        expect(actionType).toBeInTheDocument();

        const pageIDInputContainer = screen.getByLabelText('Page ID').parentElement as HTMLElement;
        const pageIDInput = pageIDInputContainer.querySelector('input');
        const pageIDValue = `${mockCallbackData[index].label}(${mockCallbackData[index].value})`;
        expect(pageIDInput?.value).toContain(pageIDValue);
      }
    });
  });
});
