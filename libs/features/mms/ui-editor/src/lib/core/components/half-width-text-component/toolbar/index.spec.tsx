import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import HalfWidthTextToolbar from './index';
import { EditorProvider, ToolbarContextProvider } from '../../../../context';
import mockComponentProps from '../../../../context/mock-data';
import { AutocompleteOptionProps } from '../../../../elements';
import { Component } from '../../enum';
import { HalfWidthTextComponentProps, PageAutocompleteItemProps } from '../../types';

jest.mock('../../../../elements/color-picker', () => ({
    __esModule: true,
    default: jest.fn(({ value }) => <div data-testid="mocked-color-picker">{value}</div>),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}));

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
}))

describe('HalfWidthText Toolbar', () => {
  let initialState;
  let component: HalfWidthTextComponentProps;
  let mockCallbackActionsData: PageAutocompleteItemProps[];
  let mockCallbackIconsData: AutocompleteOptionProps[];

  beforeEach(() => {
    component = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.HalfWidthText,
      data: {
        btn_text: 'Map',
        description: 'Test description pizza tastes good',
        icon: "icon.one.link",
        image: "iamge url",
        section: 'Section 206',
        sub_title: 'Pizza, Drinks',
        title: 'Anaheim Pizza Co',
        action: {
          type: 'native',
          page_id: 'map page',
          page_link: 'maplink',
        },
      },
    };

    initialState = {
      components: [],
      selectedComponent: component,
    };

    mockCallbackActionsData = [
        { label: 'actionOne', value: 'action.one', type: '', static: false },
        { label: 'actionTwo', value: 'action.two', type: '', static: false },
        { label: 'actionThree', value: 'action.three', type: '', static: false },
    ];

    mockCallbackIconsData = [
      { label: 'iconOne', value: 'icon.one.link' },
      { label: 'iconTwo', value: 'icon.two.link' },
      { label: 'iconThree', value: 'icon.three.link' },
    ];
  });

  function createMockOnPropChange(callbackDataActions, callbackDataIcons) {
    return function mockOnPropChange(propName, callback) {
      if (propName === 'action') {
        callback(callbackDataActions);
      } else if (propName === 'quickLinkIcons') {
        callback(callbackDataIcons);
      }
    };
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render HalfWidthText toolbar component', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <HalfWidthTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackActionsData, mockCallbackIconsData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    );

    const labelAfterSelect = screen.getByLabelText('Half Width Text Toolbar');
    expect(labelAfterSelect).toBeInTheDocument();
    
  });

  test('should render HalfWidthText toolbar with section labels', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <HalfWidthTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackActionsData, mockCallbackIconsData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    );

    // Assert
    const toolbarlabel = screen.getByText('Component');
    expect(toolbarlabel).toBeInTheDocument();

    const imageSectionLabel = screen.getByText('Image');
    expect(imageSectionLabel).toBeInTheDocument();

    const textSectionLabel = screen.getByText('Text');
    expect(textSectionLabel).toBeInTheDocument();

    const sectionSectionLabel = screen.getByText('Section');
    expect(sectionSectionLabel).toBeInTheDocument();

    const buttonSectionLabel = screen.getByText('Button');
    expect(buttonSectionLabel).toBeInTheDocument();

  });

  test('should render HalfWidthText toolbar with text props', () => {
    const container = render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <HalfWidthTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackActionsData, mockCallbackIconsData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    ).container;

    const { title, sub_title, description, section, btn_text } = component.data;

    // Assert
    expect(container.innerHTML).toContain(title);
    expect(container.innerHTML).toContain(sub_title);
    expect(container.innerHTML).toContain(description);
    expect(container.innerHTML).toContain(section);
    expect(container.innerHTML).toContain(btn_text);
  });

  test('should render HalfWidthText with correct icon value', () => {
    component.data.icon = mockCallbackIconsData[0].value

    render(
      <EditorProvider initialValue={initialState}>
        <ToolbarContextProvider initialValue={{}}>
          <HalfWidthTextToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackActionsData, mockCallbackIconsData)} />
        </ToolbarContextProvider>
      </EditorProvider>
    );

    const iconInputContainer = screen.getByText('Icon', {selector: 'label'}).parentElement as HTMLElement;
    const iconInput = iconInputContainer.querySelector('input');
    expect(iconInput?.value).toContain(mockCallbackIconsData[0].label);
  });
});
