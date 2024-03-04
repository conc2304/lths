import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CardTextOverlayAndButtonToolbar from './index';
import { EditorProvider } from '../../../../../context';
import mockComponentProps from '../../../../../context/mock-data';
import { Component } from '../../../enum';
import { CardTextOverlayAndButtonComponentProps, AutocompleteItemProps } from '../../../types';

describe('HeroPromotion: CardTextOverlayAndButton Toolbar', () => {
  let initialState;
  let component: CardTextOverlayAndButtonComponentProps;
  let mockCallbackData: AutocompleteItemProps[];

  beforeEach(() => {
    mockCallbackData = [
        { label: 'actionOne', value: 'action.one.value', type: '' },
        { label: 'actionTwo', value: 'action.two.link', type: '' },
        { label: 'actionThree', value: 'action.three.link', type: '' },
    ];

    component = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.HeroPromotionCardTextOverlayAndButton,
      data: {
        image: 'a.image.png',
        img_alt_text: 'image alt text name',
        title: 'Explore Honda Center',
        description: 'A description',
        btn_text: 'button text',
        action: {
          type: 'native',
          page_id: mockCallbackData[0].value,
          page_link: 'linkToExploreCenter',
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
        <CardTextOverlayAndButtonToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );

    const renderToolContainer = screen.getByLabelText('Card Text Overlay And Button Toolbar');
    expect(renderToolContainer).toBeInTheDocument();
  });

  test('renders toolbar with section labels', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <CardTextOverlayAndButtonToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );

    // Assert
    const toolbarlabel = screen.getByText('Promotion');
    expect(toolbarlabel).toBeInTheDocument();

    const imageSectionLabel = screen.getByText('Image');
    expect(imageSectionLabel).toBeInTheDocument();

    const textSectionLabel = screen.getByText('Text');
    expect(textSectionLabel).toBeInTheDocument();

    const buttonSectionLabel = screen.getByText('Button');
    expect(buttonSectionLabel).toBeInTheDocument();
  });

  test('renders toolbar with text props', () => {
    const container = render(
      <EditorProvider initialValue={initialState}>
        <CardTextOverlayAndButtonToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    ).container;

    const { img_alt_text, title, description, btn_text } = component.data;

    // Assert
    expect(container.innerHTML).toContain(img_alt_text);
    expect(container.innerHTML).toContain(title);
    expect(container.innerHTML).toContain(description);
    expect(container.innerHTML).toContain(btn_text);

  });

  test('renders toolbar with correct diffrent initial Labels', async () => {
    component.data.img_alt_text = 'Cool Alt Text title';
    component.data.title = 'Cool title';
    component.data.description = 'Cool Description';
    component.data.btn_text = 'Cool Button Text';

    const container = render(
      <EditorProvider initialValue={initialState}>
        <CardTextOverlayAndButtonToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    ).container;

    const { img_alt_text, title, description, btn_text } = component.data;

    // Assert
    expect(container.innerHTML).toContain(img_alt_text);
    expect(container.innerHTML).toContain(title);
    expect(container.innerHTML).toContain(description);
    expect(container.innerHTML).toContain(btn_text);
  });
});
