import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import QuicklinkButtonGroupToolbar from './index';
import { EditorProvider } from '../../../../context';
import mockComponentProps from '../../../../context/mock-data';
import { AutocompleteOptionProps } from '../../../../elements';
import { Component } from '../../enum';
import { QuicklinkButtonGroupComponentProps } from '../../types';

describe('QuicklinkButtonGroup Toolbar', () => {
  let initialState;
  let component: QuicklinkButtonGroupComponentProps;
  let mockCallbackData: AutocompleteOptionProps[];

  beforeEach(() => {
    mockCallbackData = [
      { label: 'iconOne', value: 'icon.one.link' },
      { label: 'iconTwo', value: 'icon.two.link' },
      { label: 'iconThree', value: 'icon.three.link' },
      { label: 'iconFour', value: 'icon.four.link' },
    ];

    component = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.QuicklinkButtonGroup,
      data: {
        sub_component_data: [
          {
            card_background_color: '',
            icon: mockCallbackData[0].value,
            text_color: '',
            title: 'LABEL',
            action: {
              type: 'web',
              page_id: 'medical page',
              page_link: 'first aid link',
            },
          },
          {
            card_background_color: '',
            icon: mockCallbackData[1].value,
            text_color: '',
            title: 'LABEL2',
            action: {
              type: 'web',
              page_id: 'report crime',
              page_link: 'local police department link',
            },
          },
        ],
      },
    };

    initialState = {
      components: [],
      selectedComponent: component,
    };
  });

  function createMockOnPropChange(callbackData) {
    return function mockOnPropChange(propName, callback) {
      if (propName === 'quickLinkIcons') {
        callback(callbackData);
      }
    };
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render QuicklinkButtonGroup toolbar component', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );

    const labelAfterSelect = screen.getByLabelText('Quicklink Button Group Toolbar');
    expect(labelAfterSelect).toBeInTheDocument();
  });

  test('should render QuicklinkButtonGroup toolbar with section labels', () => {
    render(
      <EditorProvider initialValue={initialState}>
        <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );

    // Assert
    const toolbarlabel = screen.getByText('Quick Link');
    expect(toolbarlabel).toBeInTheDocument();

    const imageSectionLabel = screen.getByText('BUTTON 1');
    expect(imageSectionLabel).toBeInTheDocument();

    const textSectionLabel = screen.getByText('BUTTON 2');
    expect(textSectionLabel).toBeInTheDocument();

    const actionSectionLabels = screen.getAllByText('Link');
    expect(actionSectionLabels.length).toBe(2);
  });

  test('should render QuicklinkButtonGroup toolbar with text props', () => {
    component.data.sub_component_data[0].icon = mockCallbackData[0].value;
    component.data.sub_component_data[1].icon = mockCallbackData[1].value;

    const container = render(
      <EditorProvider initialValue={initialState}>
        <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    ).container;

    const { sub_component_data } = component.data;

    // Assert
    // test quicklink 1
    expect(container.innerHTML).toContain(sub_component_data[0].title);
    expect(container.innerHTML).toContain(mockCallbackData[0].label);

    // test quicklink 2
    expect(container.innerHTML).toContain(sub_component_data[1].title);
    expect(container.innerHTML).toContain(mockCallbackData[1].label);
  });

  test('should render QuicklinkButtonGroup toolbar with correct Labels', async () => {
    component.data.sub_component_data[0].icon = mockCallbackData[0].value;
    component.data.sub_component_data[1].icon = mockCallbackData[1].value;
    render(
      <EditorProvider initialValue={initialState}>
        <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );
    const { sub_component_data } = component.data;

    // Test First Label TextArea
    const firstLabelInput = await screen.findByTestId('first_button_label');
    expect(firstLabelInput.querySelector('label').textContent).toContain('Label');
    expect(firstLabelInput.querySelector('textarea').value).toBe(sub_component_data[0].title);

    // Test First Icon Input
    const firstIconInput = await screen.findByTestId('first_button_icon');
    expect(firstIconInput.querySelector('label').textContent).toContain('Icon');
    expect(firstIconInput.querySelector('input').value).toBe(mockCallbackData[0].label);

    // Test Second Label TextArea
    const secondLabelInput = await screen.findByTestId('second_button_label');
    expect(secondLabelInput.querySelector('label').textContent).toContain('Label');
    expect(secondLabelInput.querySelector('textarea').value).toBe(sub_component_data[1].title);

    // Test Second Icon Input
    const secondIconInput = await screen.findByTestId('second_button_icon');
    expect(secondIconInput.querySelector('label').textContent).toContain('Icon');
    expect(secondIconInput.querySelector('input').value).toBe(mockCallbackData[1].label);
  });

  test('should render QuicklinkButtonGroup toolbar with correct diffrent initial Labels', async () => {
    component.data.sub_component_data[0].title = 'Cool title 1';
    component.data.sub_component_data[1].title = 'Cool title 2';
    component.data.sub_component_data[0].icon = mockCallbackData[2].value;
    component.data.sub_component_data[1].icon = mockCallbackData[3].value;

    render(
      <EditorProvider initialValue={initialState}>
        <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
      </EditorProvider>
    );
    const { sub_component_data } = component.data;

    // Test First Label TextArea
    const firstLabelInput = await screen.findByTestId('first_button_label');
    expect(firstLabelInput.querySelector('label').textContent).toContain('Label');
    expect(firstLabelInput.querySelector('textarea').value).toBe(sub_component_data[0].title);

    // Test First Icon Input
    const firstIconInput = await screen.findByTestId('first_button_icon');
    expect(firstIconInput.querySelector('label').textContent).toContain('Icon');
    expect(firstIconInput.querySelector('input').value).toBe(mockCallbackData[2].label);

    // Test Second Label TextArea
    const secondLabelInput = await screen.findByTestId('second_button_label');
    expect(secondLabelInput.querySelector('label').textContent).toContain('Label');
    expect(secondLabelInput.querySelector('textarea').value).toBe(sub_component_data[1].title);

    // Test Second Icon Input
    const secondIconInput = await screen.findByTestId('second_button_icon');
    expect(secondIconInput.querySelector('label').textContent).toContain('Icon');
    expect(secondIconInput.querySelector('input').value).toBe(mockCallbackData[3].label);
  });

  xdescribe('Test Page Link and Page Id', () => {
    test('renders QuicklinkButtonGroup Toolbar with Correct Action Option for type', () => {
      component.data.sub_component_data[0].action.type = 'web';
      component.data.sub_component_data[1].action.type = 'native';

      render(
        <EditorProvider initialValue={initialState}>
          <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
        </EditorProvider>
      );
      const { sub_component_data } = component.data;

      // ASSERT
      const firstLinkTextArea = screen.getByLabelText('Link ').querySelector('textarea');
      expect(firstLinkTextArea.value).toContain(sub_component_data[0].action.page_link);
      expect(screen.queryByLabelText('Page ID')).toBeNull();

      const secondPageIDTextArea = screen.getByLabelText('Page ID').querySelector('textarea');
      expect(secondPageIDTextArea.value).toContain(sub_component_data[1].action.page_id);
      expect(screen.queryByLabelText('Link')).toBeNull();
    });
  });
});
