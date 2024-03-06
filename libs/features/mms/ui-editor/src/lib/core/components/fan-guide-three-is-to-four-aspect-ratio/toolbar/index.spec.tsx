import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import FanGuideThreeIsToFourAspectRatioToolbar from './index';
import { EditorProvider, ToolbarContextProvider } from '../../../../context';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';
import { FanGuideThreeIsToFourAspectRatioComponentProps, PageAutocompleteItemProps } from '../../types';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

describe('FanGuideThreeIsToFourAspectRatio Toolbar', () => {
  let initialState;
  let component: FanGuideThreeIsToFourAspectRatioComponentProps;
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
      component_id: Component.FanGuideThreeIsToFourAspectRatio,
      data: {
        image: 'image.one',
        img_alt_text: 'image_alt_text1',
        title: 'A title',
        description: 'description 1',
        action: {
          type: 'native',
          page_id: mockCallbackData[0].value,
          page_link: 'first aid link',
        },
        btn_text: 'Get help',
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
          <FanGuideThreeIsToFourAspectRatioToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    );

    const renderToolContainer = screen.getByLabelText('Fan Guide Three Is To Four Aspect Ratio Toolbar');
    expect(renderToolContainer).toBeInTheDocument();
  });

  test('renders toolbar with section labels', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <FanGuideThreeIsToFourAspectRatioToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    );

    // Assert
    const toolbarlabel = screen.getByText('Fan guide');
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
        <ToolbarContextProvider initialValue={{}}>
          <FanGuideThreeIsToFourAspectRatioToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
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
        <ToolbarContextProvider initialValue={{}}>
          <FanGuideThreeIsToFourAspectRatioToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </ToolbarContextProvider>
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
