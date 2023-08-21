import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from "@testing-library/react";


import { EditorProvider } from '../../../../context';
import { PageDetail } from '@lths/features/mms/data-access';
import ToolbarMock from '../../toolbar-mock';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';

describe("QuicklinkButtonGroup Toolbar", () => {
  let container: HTMLElement;
  const props = {
    ...mockComponent,
    __ui_id__ : "3333333",
    component_id: Component.QuicklinkButtonGroup,
    properties_data: {    
      first_button: {
        label: "Medical Help",
        icon: "https://i.im.ge/2022/12/05/S82BeW.Group.png",
        action: {
          type: '',
          page_id: 'medical page',
          page_link: 'first aid link',
        },
      },
      second_button: {
        label: "Report",
        icon: "https://i.im.ge/2022/12/05/S824gr.Group.png",
        action: {
          type: '',
          page_id: 'report crime',
          page_link: 'local police department link',
        },
      },
    }
  };

  const initialState: PageDetail = {
    _id: null,
    page_id: null,
    type: null,
    name: null,
    description: null,
    is_variant: null,
    status: null,
    components_schema: [],
    default_page_id: null,
    default_page_name: null,
    constraints: {
      _id: null,
      events: [],
      locations: [],
      user_segments: [],
    },
    components: [],
  };

  beforeEach(() => {
    const renderResult  = render(
      <EditorProvider<PageDetail> initialValue={initialState}>
        <ToolbarMock componentProps={props} />
      </EditorProvider>
    );
    container = renderResult.container;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render QuicklinkButtonGroup toolbar component", () => {
    // Arrange
    const labelBeforeSelect = screen.queryByLabelText("Quicklink Button Group Toolbar");
    // Assert
    expect(labelBeforeSelect).toBeNull();

    // Act
    act(() => {
      fireEvent.click(container.querySelector('button.add-component-button'));
    });

    // Assert
    const labelAfterSelect = screen.getByLabelText("Quicklink Button Group Toolbar");
    expect(labelAfterSelect).toBeInTheDocument();

  });

    test("should render QuicklinkButtonGroup toolbar with text props", () => {
        expect(screen.queryByLabelText("Quicklink Button Group Toolbar")).toBeNull();
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { first_button, second_button } = props.properties_data;
        // Assert
        // test quicklink 1
        expect(container.innerHTML).toContain(first_button.label);
        expect(container.innerHTML).toContain(first_button.icon);

        // test quicklink 2
        expect(container.innerHTML).toContain(second_button.label);
        expect(container.innerHTML).toContain(second_button.icon);
    });

    test("should render QuicklinkButtonGroup toolbar with section labels", () => {
      expect(screen.queryByLabelText("Quicklink Button Group Toolbar")).toBeNull();
      act(() => {
      fireEvent.click(container.querySelector('button.add-component-button'));
      });

      // Assert
      const toolbarlabel = screen.getByText('Quick Link')
      expect(toolbarlabel).toBeInTheDocument();

      const imageSectionLabel= screen.getByText('First')
      expect(imageSectionLabel).toBeInTheDocument();

      const textSectionLabel= screen.getByText('Second')
      expect(textSectionLabel).toBeInTheDocument();

      const actionSectionLabels = screen.getAllByText('Action');
      expect(actionSectionLabels.length).toBe(2);
    });



    test("should render QuicklinkButtonGroup toolbar with correct Labels", () => {
        expect(screen.queryByLabelText("Quicklink Button Group Toolbar")).toBeNull();
        act(() => {
            fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { first_button, second_button } = props.properties_data;

        // Test First Label TextArea
        const firstLabelInput = screen.getByLabelText('First Label');
        expect(firstLabelInput.querySelector('label').textContent).toContain('Label');
        expect(firstLabelInput.querySelector("textarea").value).toBe(first_button.label);

        // Test First Icon Input
        const firstIconInput = screen.getByLabelText('First Icon');
        expect(firstIconInput.querySelector('label').textContent).toContain('Icon');
        expect(firstIconInput.querySelector('input').value).toBe(first_button.icon);

        // Test Second Label TextArea
        const secondLabelInput = screen.getByLabelText('Second Label');
        expect(secondLabelInput.querySelector('label').textContent).toContain('Label');
        expect(secondLabelInput.querySelector("textarea").value).toBe(second_button.label);

        // Test Second Icon Input
        const secondIconInput = screen.getByLabelText('Second Icon');
        expect(secondIconInput.querySelector('label').textContent).toContain('Icon');
        expect(secondIconInput.querySelector('input').value).toBe(second_button.icon);

    });

    test("should update component on text TextArea changes", () => {
        expect(screen.queryByLabelText("Quicklink Button Group Toolbar")).toBeNull();
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { first_button, second_button } = props.properties_data;

        // Get Inputs
        const firstLabelInput = screen.getByLabelText('First Label').querySelector("textarea");
        const firstIconInput = screen.getByLabelText('First Icon').querySelector("input");
        const secondLabelInput = screen.getByLabelText('Second Label').querySelector("textarea");
        const secondIconInput = screen.getByLabelText('Second Icon').querySelector("input");

        // test default values
        expect(firstLabelInput.value).toContain(first_button.label);
        expect(firstIconInput.value).toContain(first_button.icon);
        expect(secondLabelInput.value).toContain(second_button.label);
        expect(secondIconInput.value).toContain(second_button.icon);

        // Change TextArea values
        fireEvent.change(firstLabelInput, { target: { value: 'The Best First Label' } });
        fireEvent.change(firstIconInput, { target: { value: 'https://i.im.ge/2022/12/05/S82z2p.Group.png' } });
        fireEvent.change(secondLabelInput, { target: { value: 'The Best Second Label' } });
        fireEvent.change(secondIconInput, { target: { value: 'https://i.im.ge/2022/12/05/S82Jlf.Group.png' } });

        // test changed values
        expect(firstLabelInput.value).toContain('The Best First Label');
        expect(firstIconInput.value).toContain('https://i.im.ge/2022/12/05/S82z2p.Group.png');
        expect(secondLabelInput.value).toContain('The Best Second Label');
        expect(secondIconInput.value).toContain('https://i.im.ge/2022/12/05/S82Jlf.Group.png');
    });

    describe("Test Page Link and Page Id", () => {

      const changeActionType = (type: string, buttonIndex: number) => {
        const actionTypeTextInput = screen.getByLabelText("Type Select " + (buttonIndex + 1)).querySelector("input");

        fireEvent.change(actionTypeTextInput, {
          target: { value: type },
        });
      }

      test('renders QuicklinkButtonGroup Toolbar with Correct Action Option for type', () => {
          expect(screen.queryByLabelText("Quicklink Button Group Toolbar")).toBeNull();
          act(() => {
            fireEvent.click(container.querySelector('button.add-component-button'));
          });

          const { first_button, second_button } = props.properties_data;

          // ASSERT
          expect(screen.queryByLabelText("Link " + 1)).toBeNull();
          expect(screen.queryByLabelText("Page ID " + 2)).toBeNull();

          // ACT
          changeActionType('webview', 0);
          changeActionType('native', 1);

          // ASSERT
          const firstLinkTextArea = screen.getByLabelText("Link " + 1).querySelector("textarea");
          const secondPageIDTextArea = screen.getByLabelText("Page ID " + 2).querySelector("textarea");
          expect(firstLinkTextArea.value).toContain(first_button.action.page_link);
          expect(secondPageIDTextArea.value).toContain(second_button.action.page_id);

          expect(screen.queryByLabelText("Page ID " + 1)).toBeNull();
          expect(screen.queryByLabelText("Link " + 2)).toBeNull();

          // ACT
          changeActionType('native', 0);
          changeActionType('webview', 1);

          // ASSERT
          expect(screen.queryByLabelText("Link " + 1)).toBeNull();
          expect(screen.queryByLabelText("Page ID " + 2)).toBeNull();

          const firstPageIDTextArea = screen.getByLabelText("Page ID " + 1).querySelector("textarea");
          const secondLinkTextArea = screen.getByLabelText("Link " + 2).querySelector("textarea");
          expect(firstPageIDTextArea.value).toContain(first_button.action.page_id);
          expect(secondLinkTextArea.value).toContain(second_button.action.page_link);
      });

      test('updates QuicklinkButtonGroup Toolbar when page_link changes', () => {
        expect(screen.queryByLabelText("Quicklink Button Group Toolbar")).toBeNull();
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { first_button, second_button } = props.properties_data;

        // ACT
        changeActionType('webview', 0);
        changeActionType('webview', 1);

        // ASSERT
        const firstLinkTextArea = screen.getByLabelText("Link " + 1).querySelector("textarea");
        expect(firstLinkTextArea.value).toContain(first_button.action.page_link);
        const secondLinkTextArea = screen.getByLabelText("Link " + 2).querySelector("textarea");
        expect(secondLinkTextArea.value).toContain(second_button.action.page_link);

        // Act
        fireEvent.change(firstLinkTextArea, { target: { value: 'The Best First page link' } });
        fireEvent.change(secondLinkTextArea, { target: { value: 'The Best Second page link' } });

        // Assert
        expect(firstLinkTextArea.value).toContain('The Best First page link');
        expect(secondLinkTextArea.value).toContain('The Best Second page link');
      });

      test('updates QuicklinkButtonGroup Toolbar when page_id changes', () => {
        expect(screen.queryByLabelText("Quicklink Button Group Toolbar")).toBeNull();
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { first_button, second_button } = props.properties_data;

        // ACT
        changeActionType('native', 0);
        changeActionType('native', 1);

        // ASSERT
        const firstPageIDTextArea = screen.getByLabelText("Page ID " + 1).querySelector("textarea");
        expect(firstPageIDTextArea.value).toContain(first_button.action.page_id);
        const secondPageIDTextArea = screen.getByLabelText("Page ID " + 2).querySelector("textarea");
        expect(secondPageIDTextArea.value).toContain(second_button.action.page_id);

        // Act
        fireEvent.change(firstPageIDTextArea, { target: { value: 'The Best First page ID' } });
        fireEvent.change(secondPageIDTextArea, { target: { value: 'The Best Second page ID' } });

        // Assert
        expect(firstPageIDTextArea.value).toContain('The Best First page ID');
        expect(secondPageIDTextArea.value).toContain('The Best Second page ID');
    });
  });
});