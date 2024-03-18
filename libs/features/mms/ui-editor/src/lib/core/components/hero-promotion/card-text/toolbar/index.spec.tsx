import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CardTextToolbar from './index';
import { EditorProvider, ToolbarContextProvider } from '../../../../../context';
import mockComponentProps from '../../../../../context/mock-data';
import { Component } from '../../../enum';
import { CardTextComponentProps, PageAutocompleteItemProps } from '../../../types';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

describe('HeroPromotion: CardText Toolbar', () => {
  let initialState;
  let component: CardTextComponentProps;
  let mockCallbackData: PageAutocompleteItemProps[];

  beforeEach(() => {
    mockCallbackData = [
      { label: 'actionOne', value: 'action.one.value', type: '', static: false },
      { label: 'actionTwo', value: 'action.two.link', type: '', static: false },
      { label: 'actionThree', value: 'action.three.link', type: '', static: false },
    ];

    component = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.HeroPromotionCardText,
      data: {
        image: 'a.Image.png',
        img_alt_text: 'image alt text name',
        title: 'The Title',
        description: 'A description',
        action: {
          type: 'native',
          page_id: mockCallbackData[0].value,
          page_link: 'A link',
        },
      },
    };

    initialState = {
      components: [],
      selectedComponent: component,
    };
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
        <ToolbarContextProvider initialValue={{}}>
          <CardTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    );

    const renderToolContainer = screen.getByLabelText('Card Text Toolbar');
    expect(renderToolContainer).toBeInTheDocument();
  });

  test('renders toolbar with section labels', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <CardTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    );

    // Assert
    const toolbarlabel = screen.getByText('Hero Promotion');
    expect(toolbarlabel).toBeInTheDocument();

    const imageSectionLabel = screen.getByText('Image');
    expect(imageSectionLabel).toBeInTheDocument();

    const textSectionLabel = screen.getByText('Text');
    expect(textSectionLabel).toBeInTheDocument();

  });

  test('renders toolbar with text props', () => {
    const container = render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <CardTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    ).container;

    const { img_alt_text, title, description } = component.data;

    // Assert
    expect(container.innerHTML).toContain(img_alt_text);
    expect(container.innerHTML).toContain(title);
    expect(container.innerHTML).toContain(description);

  });

  test('renders toolbar with correct diffrent initial Labels', async () => {
    component.data.img_alt_text = 'Cool Alt Text title';
    component.data.title = 'Cool title';
    component.data.description = 'Cool Description';

    const container = render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <CardTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    ).container;

    const { img_alt_text, title, description } = component.data;

    // Assert
    expect(container.innerHTML).toContain(img_alt_text);
    expect(container.innerHTML).toContain(title);
    expect(container.innerHTML).toContain(description);
  });
});
