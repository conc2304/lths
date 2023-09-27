// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';

// import QuicklinkButtonGroupToolbar from './index';
// import { EditorProvider } from '../../../../context';
// import mockComponentProps from '../../../../context/mock-data';
// import { AutocompleteOptionProps } from '../../../../elements';
// import { Component } from '../../enum';
// import { QuicklinkButtonGroupComponentProps } from '../../types';

// describe('QuicklinkButtonGroup Toolbar', () => {
//   let initialState;
//   let component: QuicklinkButtonGroupComponentProps;
//   let mockCallbackData: AutocompleteOptionProps[];

//   beforeEach(() => {
//     component = {
//       ...mockComponentProps,
//       __ui_id__: '3333333',
//       component_id: Component.QuicklinkButtonGroup,
//       data: {
//         sub_component_data: [
//           {
//             card_background_color: '',
//             icon: 'nonexistent png',
//             text_color: '',
//             title: 'LABEL',
//             action: {
//               type: 'webview',
//               page_id: 'medical page',
//               page_link: 'first aid link',
//             },
//           },
//           {
//             card_background_color: '',
//             icon: 'nonexistent png 2',
//             text_color: '',
//             title: 'LABEL2',
//             action: {
//               type: 'webview',
//               page_id: 'report crime',
//               page_link: 'local police department link',
//             },
//           },
//         ],
//       },
//     };

//     initialState = {
//       components: [],
//       selectedComponent: component,
//     };

//     mockCallbackData = [
//       { label: 'iconOne', value: 'icon.one.link' },
//       { label: 'iconTwo', value: 'icon.two.link' },
//       { label: 'iconThree', value: 'icon.three.link' },
//     ];
//   });

//   function createMockOnPropChange(callbackData) {
//     return function mockOnPropChange(propName, callback) {
//       if (propName === 'quickLinkIcons') {
//         callback(callbackData);
//       }
//     };
//   }

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   test('should render QuicklinkButtonGroup toolbar component', () => {
//     render(
//       <EditorProvider initialValue={initialState}>
//         <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
//       </EditorProvider>
//     );

//     const labelAfterSelect = screen.getByLabelText('Quicklink Button Group Toolbar');
//     expect(labelAfterSelect).toBeInTheDocument();
//   });

//   test('should render QuicklinkButtonGroup toolbar with section labels', () => {
//     render(
//       <EditorProvider initialValue={initialState}>
//         <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
//       </EditorProvider>
//     );

//     // Assert
//     const toolbarlabel = screen.getByText('Quick Link');
//     expect(toolbarlabel).toBeInTheDocument();

//     const imageSectionLabel = screen.getByText('First');
//     expect(imageSectionLabel).toBeInTheDocument();

//     const textSectionLabel = screen.getByText('Second');
//     expect(textSectionLabel).toBeInTheDocument();

//     const actionSectionLabels = screen.getAllByText('Action');
//     expect(actionSectionLabels.length).toBe(2);
//   });

//   test('should render QuicklinkButtonGroup toolbar with text props', () => {
//     const container = render(
//       <EditorProvider initialValue={initialState}>
//         <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
//       </EditorProvider>
//     ).container;

//     const { sub_component_data } = component.data;

//     // Assert
//     // test quicklink 1
//     expect(container.innerHTML).toContain(sub_component_data[0].title);
//     expect(container.innerHTML).toContain(sub_component_data[0].icon);

//     // test quicklink 2
//     expect(container.innerHTML).toContain(sub_component_data[1].title);
//     expect(container.innerHTML).toContain(sub_component_data[1].icon);
//   });

//   test('should render QuicklinkButtonGroup toolbar with correct Labels', () => {
//     render(
//       <EditorProvider initialValue={initialState}>
//         <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
//       </EditorProvider>
//     );
//     const { sub_component_data } = component.data;

//     // Test First Label TextArea
//     const firstLabelInput = screen.getByLabelText('First Label');
//     expect(firstLabelInput.querySelector('label').textContent).toContain('Label');
//     expect(firstLabelInput.querySelector('textarea').value).toBe(sub_component_data[0].title);

//     // Test First Icon Input
//     const firstIconInput = screen.getByLabelText('First Icon');
//     expect(firstIconInput.querySelector('label').textContent).toContain('Icon');
//     expect(firstIconInput.querySelector('input').value).toBe(sub_component_data[0].icon);

//     // Test Second Label TextArea
//     const secondLabelInput = screen.getByLabelText('Second Label');
//     expect(secondLabelInput.querySelector('label').textContent).toContain('Label');
//     expect(secondLabelInput.querySelector('textarea').value).toBe(sub_component_data[1].title);

//     // Test Second Icon Input
//     const secondIconInput = screen.getByLabelText('Second Icon');
//     expect(secondIconInput.querySelector('label').textContent).toContain('Icon');
//     expect(secondIconInput.querySelector('input').value).toBe(sub_component_data[1].icon);
//   });

//   test('should render QuicklinkButtonGroup toolbar with correct diffrent initial Labels', () => {
//     component.data.sub_component_data[0].title = 'Cool title 1';
//     component.data.sub_component_data[1].title = 'Cool title 2';
//     component.data.sub_component_data[0].icon = 'Cool icon 1';
//     component.data.sub_component_data[1].icon = 'Cool icon 2';

//     render(
//       <EditorProvider initialValue={initialState}>
//         <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
//       </EditorProvider>
//     );
//     const { sub_component_data } = component.data;

//     // Test First Label TextArea
//     const firstLabelInput = screen.getByLabelText('First Label');
//     expect(firstLabelInput.querySelector('label').textContent).toContain('Label');
//     expect(firstLabelInput.querySelector('textarea').value).toBe(sub_component_data[0].title);

//     // Test First Icon Input
//     const firstIconInput = screen.getByLabelText('First Icon');
//     expect(firstIconInput.querySelector('label').textContent).toContain('Icon');
//     expect(firstIconInput.querySelector('input').value).toBe(sub_component_data[0].icon);

//     // Test Second Label TextArea
//     const secondLabelInput = screen.getByLabelText('Second Label');
//     expect(secondLabelInput.querySelector('label').textContent).toContain('Label');
//     expect(secondLabelInput.querySelector('textarea').value).toBe(sub_component_data[1].title);

//     // Test Second Icon Input
//     const secondIconInput = screen.getByLabelText('Second Icon');
//     expect(secondIconInput.querySelector('label').textContent).toContain('Icon');
//     expect(secondIconInput.querySelector('input').value).toBe(sub_component_data[1].icon);
//   });

//   xdescribe('Test Page Link and Page Id', () => {
//     test('renders QuicklinkButtonGroup Toolbar with Correct Action Option for type', () => {
//       component.data.sub_component_data[0].action.type = 'webview';
//       component.data.sub_component_data[1].action.type = 'native';

//       render(
//         <EditorProvider initialValue={initialState}>
//           <QuicklinkButtonGroupToolbar {...component} onPropChange={createMockOnPropChange(mockCallbackData)} />
//         </EditorProvider>
//       );
//       const { sub_component_data } = component.data;

//       // ASSERT
//       const firstLinkTextArea = screen.getByLabelText('Link ' + 1).querySelector('textarea');
//       expect(firstLinkTextArea.value).toContain(sub_component_data[0].action.page_link);
//       expect(screen.queryByLabelText('Page ID ' + 1)).toBeNull();

//       const secondPageIDTextArea = screen.getByLabelText('Page ID ' + 2).querySelector('textarea');
//       expect(secondPageIDTextArea.value).toContain(sub_component_data[1].action.page_id);
//       expect(screen.queryByLabelText('Link ' + 2)).toBeNull();
//     });
//   });
// });
