import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from "@testing-library/react";


import { EditorProvider } from '../../../../context';
import { PageDetail } from '@lths/features/mms/data-access';
import ToolbarMock from '../../toolbar-mock';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';

describe("PromotionOneIsToOneAspectRatio Toolbar", () => {
  let container: HTMLElement;
  const props = {
    ...mockComponent,
    __ui_id__ : "3333333",
    component_id: Component.PromotionOneIsToOneAspectRatio,
    properties_data: {    
        image: 'https://i.im.ge/2022/10/13/2qHPSF.Image-1.png',
        img_alt_text: "image alth text name",
        title: 'Explore Honda Center',
        description: "mock description",
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

  test("should render PromotionOneIsToOneAspectRatio toolbar component", () => {
    // Arrange
    const labelBeforeSelect = screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar");
    // Assert
    expect(labelBeforeSelect).toBeNull();

    // Act
    act(() => {
      fireEvent.click(container.querySelector('button.add-component-button'));
    });

    // Assert
    const labelAfterSelect = screen.getByLabelText("Promotion One Is To One Aspect Ratio Toolbar");
    expect(labelAfterSelect).toBeInTheDocument();

  });

    test("should render PromotionOneIsToOneAspectRatio toolbar with text props", () => {
        expect(screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeNull();
        act(() => {
        fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { img_alt_text, btn_text } = props.properties_data;
        // Assert
        expect(container.innerHTML).toContain(btn_text);
        expect(container.innerHTML).toContain(img_alt_text);

    });

    test("should render PromotionOneIsToOneAspectRatio toolbar with section labels", () => {
      expect(screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeNull();
      act(() => {
      fireEvent.click(container.querySelector('button.add-component-button'));
      });

      // Assert
      const toolbarTitle = screen.getByText('Promotion')
      expect(toolbarTitle).toBeInTheDocument();

      const imageSectionLabel= screen.getByText('Image')
      expect(imageSectionLabel).toBeInTheDocument();

      const buttonSectionLabel= screen.getByText('Button')
      expect(buttonSectionLabel).toBeInTheDocument();

      const actionSectionLabel= screen.getByText('Action')
      expect(actionSectionLabel).toBeInTheDocument();
  });



    test("should render PromotionOneIsToOneAspectRatio toolbar with correct Labels", () => {
        expect(screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeNull();
        act(() => {
            fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { btn_text, img_alt_text } = props.properties_data;

        // Test Image alt-text TextArea
        const imageAltTextTextArea = screen.getByText('Image alt-text', { selector: 'label' }).parentElement.querySelector('textarea');
        expect(imageAltTextTextArea.value).toBe(img_alt_text);

        // Test Label TextArea
        const labelTextArea = screen.getByText('Label', { selector: 'label' }).parentElement.querySelector('textarea');
        expect(labelTextArea.value).toContain(btn_text);

    });

    test("should update component on text TextArea changes", () => {
        expect(screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeNull();
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });

        const { btn_text, img_alt_text} = props.properties_data;

        // Get Inputs
        const imageAltTextTextArea = screen.getByText('Image alt-text', { selector: 'label' }).parentElement.querySelector("textarea");
        const labelTextArea = screen.getByText('Label', { selector: 'label' }).parentElement.querySelector("textarea");
    
        // test default values
        expect(imageAltTextTextArea.value).toContain(img_alt_text);
        expect(labelTextArea.value).toContain(btn_text);

        // Change TextArea values
        fireEvent.change(imageAltTextTextArea, { target: { value: 'The Best Image Alt Text' } });
        fireEvent.change(labelTextArea, { target: { value: 'The Best Label' } });

        // test changed values
        expect(imageAltTextTextArea.value).toContain('The Best Image Alt Text');
        expect(labelTextArea.value).toContain('The Best Label');
    });

    describe("Image Picker Integration", () => {
        test('renders PromotionOneIsToOneAspectRatio Toolbar with SimpleImagePickers', () => {
            expect(screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeNull();
            expect(screen.queryByTestId('SimpleSimpleImagePicker')).toBeNull();
            act(() => {
              fireEvent.click(container.querySelector('button.add-component-button'));
            });

            expect(screen.getByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeInTheDocument();
            // Check if the SimpleImagePicker is rendered
            expect(screen.getByTestId('SimpleImagePicker')).toBeInTheDocument();

        });

        test('renders SimpleImagePicker with default image value', () => {
            expect(screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeNull();
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

      test('renders PromotionOneIsToOneAspectRatio Toolbar with Correct Action Option for type', () => {
          expect(screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeNull();
          act(() => {
            fireEvent.click(container.querySelector('button.add-component-button'));
          });

          const { action: { page_id, page_link }} = props.properties_data;

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

      test('updates PromotionOneIsToOneAspectRatio Toolbar when page_link changes', () => {
        expect(screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeNull();
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

      test('updates PromotionOneIsToOneAspectRatio Toolbar when page_id changes', () => {
        expect(screen.queryByLabelText("Promotion One Is To One Aspect Ratio Toolbar")).toBeNull();
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