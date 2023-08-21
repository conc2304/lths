import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from "@testing-library/react";


import { EditorProvider } from '../../../../context';
import { PageDetail } from '@lths/features/mms/data-access';
import ToolbarMock from '../../toolbar-mock';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';

describe("FanGuideThreeIsToFourAspectRatio Toolbar", () => {
  let container: HTMLElement;
  const props = {
    ...mockComponent,
    __ui_id__ : "3333333",
    component_id: Component.FanGuideThreeIsToFourAspectRatio,
    properties_data: {    
        image: 'https://i.im.ge/2022/10/13/2qHPSF.Image-1.png',
        img_alt_text: "image alth text name",
        title: 'Explore Honda Center',
        description: "A description ",
        btn_text: "button text",
        action: {
            type: '',
            page_id: 'explorehondacenter',
            page_link: 'linkToExploreCenter',
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

  test("should render FanGuideThreeIsToFourAspectRatio toolbar component", () => {
    // Arrange
    const labelBeforeSelect = screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar");
    // Assert
    expect(labelBeforeSelect).toBeNull();

    // Act
    act(() => {
      fireEvent.click(container.querySelector('button.add-component-button'));
    });

    // Assert
    const labelAfterSelect = screen.getByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar");
    expect(labelAfterSelect).toBeInTheDocument();

  });

    test("should render FanGuideThreeIsToFourAspectRatio toolbar with text props", () => {
        expect(screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeNull();
        act(() => {
        fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { img_alt_text, title, description, btn_text } = props.properties_data;
        // Assert
        expect(container.innerHTML).toContain(title);
        expect(container.innerHTML).toContain(description);
        expect(container.innerHTML).toContain(btn_text);
        expect(container.innerHTML).toContain(img_alt_text);

    });

    test("should render FanGuideThreeIsToFourAspectRatio toolbar with section labels", () => {
      expect(screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeNull();
      act(() => {
      fireEvent.click(container.querySelector('button.add-component-button'));
      });

      // Assert
      const toolbarTitle = screen.getByText('Fan guide')
      expect(toolbarTitle).toBeInTheDocument();

      const imageSectionLabel= screen.getByText('Image')
      expect(imageSectionLabel).toBeInTheDocument();

      const textSectionLabel= screen.getByText('Text')
      expect(textSectionLabel).toBeInTheDocument();

      const buttonSectionLabel= screen.getByText('Button')
      expect(buttonSectionLabel).toBeInTheDocument();

      const actionSectionLabel= screen.getByText('Action')
      expect(actionSectionLabel).toBeInTheDocument();

  });



    test("should render FanGuideThreeIsToFourAspectRatio toolbar with correct Labels", () => {
        expect(screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeNull();
        act(() => {
            fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { title, description, btn_text, img_alt_text } = props.properties_data;

        // Test Image alt-text TextArea
        const imageAltTextTextArea = screen.getByText('Image alt-text', { selector: 'label' }).parentElement.querySelector('textarea');
        expect(imageAltTextTextArea.value).toBe(img_alt_text);

        // Test Title TextArea
        const titleTextArea = screen.getByText('Title', { selector: 'label' }).parentElement.querySelector('textarea');
        expect(titleTextArea.value).toContain(title);

        // Test Description TextArea
        const descTextArea = screen.getByText('Description', { selector: 'label' }).parentElement.querySelector('textarea');
        expect(descTextArea.value).toContain(description);

        // Test Label TextArea
        const labelTextArea = screen.getByText('Label', { selector: 'label' }).parentElement.querySelector('textarea');
        expect(labelTextArea.value).toContain(btn_text);

    });

    test("should update component on text TextArea changes", () => {
        expect(screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeNull();
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { title, description, btn_text, img_alt_text } = props.properties_data;

        // Get Inputs
        const imageAltTextTextArea = screen.getByText('Image alt-text', { selector: 'label' }).parentElement.querySelector("textarea");
        const titleTextArea = screen.getByText('Title', { selector: 'label' }).parentElement.querySelector("textarea");
        const descTextArea = screen.getByText('Description', { selector: 'label' }).parentElement.querySelector("textarea");
        const labelTextArea = screen.getByText('Label', { selector: 'label' }).parentElement.querySelector("textarea");

        // test default values
        expect(imageAltTextTextArea.value).toContain(img_alt_text);
        expect(titleTextArea.value).toContain(title);
        expect(descTextArea.value).toContain(description);
        expect(labelTextArea.value).toContain(btn_text);

        // Change TextArea values
        fireEvent.change(imageAltTextTextArea, { target: { value: 'The Best Image Alt Text' } });
        fireEvent.change(titleTextArea, { target: { value: 'The Best Title' } });
        fireEvent.change(descTextArea, { target: { value: 'The Best Desc' } });
        fireEvent.change(labelTextArea, { target: { value: 'The Best Label' } });

        // test changed values
        expect(imageAltTextTextArea.value).toContain('The Best Image Alt Text');
        expect(titleTextArea.value).toContain('The Best Title');
        expect(descTextArea.value).toContain('The Best Desc');
        expect(labelTextArea.value).toContain('The Best Label');
    });

    describe("Image Picker Integration", () => {
        test('renders FanGuideThreeIsToFourAspectRatio Toolbar with SimpleImagePickers', () => {
            expect(screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeNull();
            expect(screen.queryByTestId('SimpleSimpleImagePicker')).toBeNull();
            act(() => {
              fireEvent.click(container.querySelector('button.add-component-button'));
            });

            expect(screen.getByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeInTheDocument();
            // Check if the SimpleImagePicker is rendered
            expect(screen.getByTestId('SimpleImagePicker')).toBeInTheDocument();

        });

        test('renders SimpleImagePicker with default image value', () => {
            expect(screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeNull();
            act(() => {
              fireEvent.click(container.querySelector('button.add-component-button'));
            });

            const { image } = props.properties_data;

            // Check if the default image value is rendered in the SimpleImagePicker
            const imageElement = screen.getByTestId('SimpleImagePicker').querySelector('img');
            expect(imageElement).toBeInTheDocument();
            expect(imageElement).toHaveAttribute('src', image);
        });
    });

    describe("Test Page Link and Page Id", () => {

      const changeActionType = (type: string) => {
        const actionTypeTextInput = screen.getByText('Action Type', { selector: 'label' }).parentElement.querySelector("input");

        fireEvent.change(actionTypeTextInput, {
          target: { value: type },
        });
      }

      test('renders FanGuideThreeIsToFourAspectRatio Toolbar with Correct Action Option for type', () => {
          expect(screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeNull();
          act(() => {
            fireEvent.click(container.querySelector('button.add-component-button'));
          });

          const { action: { type, page_id, page_link}} = props.properties_data;

          // ASSERT
          expect(screen.queryByText('Link', { selector: 'label' })).toBeNull();

          changeActionType('webview'); // ACT

          // ASSERT
          const linkTextArea = screen.getByText('Link', { selector: 'label' }).parentElement.querySelector("textarea");
          expect(linkTextArea.value).toContain(page_link);

          expect(screen.queryByText('Page ID', { selector: 'label' })).toBeNull();

          changeActionType('native'); // ACT

          // ASSERT
          expect(screen.queryByText('Link', { selector: 'label' })).toBeNull();

          const pageIDTextArea = screen.getByText('Page ID', { selector: 'label' }).parentElement.querySelector("textarea");
          expect(pageIDTextArea.value).toContain(page_id);

      });

      test('updates FanGuideThreeIsToFourAspectRatio Toolbar when page_link changes', () => {
        expect(screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeNull();
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { action: { page_link }} = props.properties_data;

        changeActionType('webview'); // ACT

        // ASSERT
        const linkTextArea = screen.getByText('Link', { selector: 'label' }).parentElement.querySelector("textarea");
        expect(linkTextArea.value).toContain(page_link);

        // Act
        fireEvent.change(linkTextArea, { target: { value: 'The Best page link' } });

        // Assert
        expect(linkTextArea.value).toContain('The Best page link');
      });

      test('updates FanGuideThreeIsToFourAspectRatio Toolbar when page_id changes', () => {
        expect(screen.queryByLabelText("Fan Guide Three Is To Four Aspect Ratio Toolbar")).toBeNull();
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { action: { page_id }} = props.properties_data;

        changeActionType('native'); // ACT

        // ASSERT
        const pageIDTextArea = screen.getByText('Page ID', { selector: 'label' }).parentElement.querySelector("textarea");
        expect(pageIDTextArea.value).toContain(page_id);

        // Act
        fireEvent.change(pageIDTextArea, { target: { value: 'The Best page ID' } });

        // Assert
        expect(pageIDTextArea.value).toContain('The Best page ID');
    });
  });
});