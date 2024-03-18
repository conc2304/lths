import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import PromotionOneIsToOneAspectRatioToolbar from './index';
import { EditorProvider, ToolbarContextProvider } from '../../../../context';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';
import { PromotionOneIsToOneAspectRatioComponentProps, PageAutocompleteItemProps } from '../../types';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

describe('PromotionOneIsToOneAspectRatio Toolbar', () => {
  let initialState;
  let component: PromotionOneIsToOneAspectRatioComponentProps;
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
      component_id: Component.PromotionOneIsToOneAspectRatio,
      data: {
        image: 'image.one',
        img_alt_text: 'image alt text name',
        btn_text: 'button text',
        action: {
          type: 'native',
          page_id: mockCallbackData[0].value,
          page_link: 'first aid link',
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
          <PromotionOneIsToOneAspectRatioToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    );

    const renderToolContainer = screen.getByLabelText('Promotion One Is To One Aspect Ratio Toolbar');
    expect(renderToolContainer).toBeInTheDocument();
  });

  test('renders toolbar with section labels', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <PromotionOneIsToOneAspectRatioToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    );

    // Assert
    const toolbarlabel = screen.getByText('Promotion');
    expect(toolbarlabel).toBeInTheDocument();

    const imageSectionLabel = screen.getByText('Image');
    expect(imageSectionLabel).toBeInTheDocument();

    const buttonSectionLabel = screen.getByText('Button');
    expect(buttonSectionLabel).toBeInTheDocument();
  });

  test('renders toolbar with text props', () => {
    const container = render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <PromotionOneIsToOneAspectRatioToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    ).container;

    const { img_alt_text, btn_text } = component.data;

    // Assert
    expect(container.innerHTML).toContain(img_alt_text);
    expect(container.innerHTML).toContain(btn_text);

  });

  test('renders toolbar with correct diffrent initial Labels', async () => {
    component.data.img_alt_text = 'Cool Alt Text title';
    component.data.btn_text = 'Cool Button Text';

    const container = render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <PromotionOneIsToOneAspectRatioToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    ).container;

    const { img_alt_text, btn_text } = component.data;

    // Assert
    expect(container.innerHTML).toContain(img_alt_text);
    expect(container.innerHTML).toContain(btn_text);
  });
});