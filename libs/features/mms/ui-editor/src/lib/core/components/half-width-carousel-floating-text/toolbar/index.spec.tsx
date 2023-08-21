import '@testing-library/jest-dom';
import { render, screen, fireEvent, act, within } from "@testing-library/react";


import { EditorProvider } from '../../../../context';
import { PageDetail } from '@lths/features/mms/data-access';
import ToolbarMock from '../../toolbar-mock';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';

describe("HalfWidthCarouselFloatingText Toolbar", () => {
  let container: HTMLElement;
  const props = {
    ...mockComponent,
    __ui_id__ : "3333333",
    component_id: Component.HalfWidthCarouselFloatingText,
    properties_data: {    
      sub_properties_data: [
        {
            name: 'Carousel Name 1',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-1.png',
            img_alt_text: "ImageAlt1",
            title: 'A Title 1',
            action: { type: '', page_id: 'pageId1', page_link: 'pageLink1', },
        },
        {
            name: 'Carousel Name 2',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-2.png',
            img_alt_text: "ImageAlt2",
            title: 'A Title 2',
            action: { type: '', page_id: 'pageId2', page_link: 'pageLink2', },
        },
        {
            name: 'Carousel Name 3',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-3.png',
            img_alt_text: "ImageAlt3",
            title: 'A Title 3',
            action: { type: '', page_id: 'pageId3', page_link: 'pageLink3', },
        },
        {
            name: 'Carousel Name 4',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-4.png',
            img_alt_text: "ImageAlt4",
            title: 'A Title 4',
            action: { type: '', page_id: 'pageId4', page_link: 'pageLink4', },
        },
      ],
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
  
  describe("Carousel Item List", () => {
    test("should render HalfWidthCarouselFloatingText toolbar component", () => {
      // Arrange
      const labelBeforeSelect = screen.queryByLabelText('Half Width Carousel Floating Text Toolbar');

      // Assert
      expect(labelBeforeSelect).toBeNull();

      // Act
      act(() => {
        fireEvent.click(container.querySelector('button.add-component-button'));
      });

      // Assert
      const labelAfterSelect = screen.getByLabelText('Half Width Carousel Floating Text Toolbar');
      expect(labelAfterSelect).toBeInTheDocument();

    });

    test("should render HalfWidthCarouselFloatingText toolbar with section labels", () => {
      expect(screen.queryByLabelText("Half Width Carousel Floating Text Toolbar")).toBeNull();
      act(() => {
        fireEvent.click(container.querySelector('button.add-component-button'));
      });

      // Assert
      const toolbarTitle = screen.getByText('Carousel')
      expect(toolbarTitle).toBeInTheDocument();
    });

    test("should render HalfWidthCarouselFloatingText toolbar with correct Carousel item names", () => {
      expect(screen.queryByLabelText('Half Width Carousel Floating Text Toolbar')).toBeNull();
      act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
      });

      const {sub_properties_data } = props.properties_data;
      // Assert
      sub_properties_data.forEach(({ name }) => {
          expect(container.innerHTML).toContain(name);
      });
    });

    test("should add another Carousel Item", () => {
      expect(screen.queryByLabelText('Half Width Carousel Floating Text Toolbar')).toBeNull();
      act(() => {
        fireEvent.click(container.querySelector('button.add-component-button'));
      });

      const { sub_properties_data } = props.properties_data;
      const defaultCarouselNumber = sub_properties_data.length

      expect(screen.queryByTestId(`edit_${defaultCarouselNumber}`)).toBeNull();

      const addCarouselItem = screen.getByTestId("Add Carousel Item");
      // add new Carousel item
      fireEvent.click(addCarouselItem);

      // test Carousel item was added
      expect(screen.getByTestId(`edit_${defaultCarouselNumber}`)).toBeInTheDocument();

      // test only 1 was added
      expect(screen.queryByTestId(`edit_${defaultCarouselNumber + 1}`)).toBeNull();

    });

    test("should remove Carousel Item", () => {
      expect(screen.queryByLabelText('Half Width Carousel Floating Text Toolbar')).toBeNull();
      act(() => {
        fireEvent.click(container.querySelector('button.add-component-button'));
      });

      const { sub_properties_data } = props.properties_data;

      expect(container.innerHTML).toContain(sub_properties_data[2].name);

      const deleteCarouselItem = screen.getByTestId(`delete_${2}`);
      // delete Carousel item
      fireEvent.click(deleteCarouselItem);

      // test Carousel item was removed
      expect(container.innerHTML).not.toContain(sub_properties_data[2].name);

    });
  });

  describe("Edit Carousel Item", () => {
    test("should open edit item", () => {
      expect(screen.queryByLabelText('Half Width Carousel Floating Text Toolbar')).toBeNull();
      act(() => {
        fireEvent.click(container.querySelector('button.add-component-button'));
      });

      const editCarouselItem = screen.getByTestId(`edit_${2}`);
      // open edit Carousel item
      fireEvent.click(editCarouselItem);

      // Assert
      const toolbarTitle = screen.getByText('Carousel Item')
      expect(toolbarTitle).toBeInTheDocument();

    });

    test("should render data for each carousel item", () => {
      expect(screen.queryByLabelText('Half Width Carousel Floating Text Toolbar')).toBeNull();
      act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
      });

      const {sub_properties_data } = props.properties_data;

      sub_properties_data.forEach((item, index) => {
        fireEvent.click(screen.getByTestId(`edit_${index}`)); // Act
        const { name, title, img_alt_text } = item;

        // Test Image alt-text TextArea
        const imageAltTextTextArea = screen.getByText('Image alt-text', { selector: 'label' }).parentElement.querySelector('textarea');
        expect(imageAltTextTextArea.value).toBe(img_alt_text);

        // Test Title TextArea
        const titleTextArea = screen.getByText('Title', { selector: 'label' }).parentElement.querySelector('textarea');
        expect(titleTextArea.value).toContain(title);

        // Test Name TextArea
        const nameTextArea = screen.getByText('Name', { selector: 'label' }).parentElement.querySelector('textarea');
        expect(nameTextArea.value).toContain(name);

        fireEvent.click(screen.getByText(`CANCEL`)); // Act
      });
    });

    test("should update data for each carousel item on change", () => {
      expect(screen.queryByLabelText('Half Width Carousel Floating Text Toolbar')).toBeNull();
      act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
      });

      const {sub_properties_data } = props.properties_data;

      sub_properties_data.forEach((item, index) => {
        fireEvent.click(screen.getByTestId(`edit_${index}`)); // Act
        const { name, title, img_alt_text } = item;

        // Get Inputs
        const imageAltTextTextArea = screen.getByText('Image alt-text', { selector: 'label' }).parentElement.querySelector("textarea");
        const titleTextArea = screen.getByText('Title', { selector: 'label' }).parentElement.querySelector("textarea");
        const nameTextArea = screen.getByText('Name', { selector: 'label' }).parentElement.querySelector('textarea');

        // test default values
        expect(imageAltTextTextArea.value).toContain(img_alt_text);
        expect(titleTextArea.value).toContain(title);
        expect(nameTextArea.value).toContain(name);

        // Change TextArea values
        act(() => {
          fireEvent.change(imageAltTextTextArea, { target: { value: 'The Best Image Alt Text' } });
          fireEvent.change(titleTextArea, { target: { value: 'The Best Title' } });
          fireEvent.change(nameTextArea, { target: { value: 'The Best Name' } });
        });

        // test changed values
        expect(imageAltTextTextArea.value).toContain('The Best Image Alt Text');
        expect(titleTextArea.value).toContain('The Best Title');
        expect(nameTextArea.value).toContain('The Best Name');

        fireEvent.click(screen.getByText(`CANCEL`)); // Act
      });
    });

    test("renders SimpleImagePicker with default image value", () => {
      expect(screen.queryByLabelText('Half Width Carousel Floating Text Toolbar')).toBeNull();
      act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
      });

      const {sub_properties_data } = props.properties_data;

      sub_properties_data.forEach((item, index) => {
        expect(screen.queryByTestId('SimpleSimpleImagePicker')).toBeNull();
        fireEvent.click(screen.getByTestId(`edit_${index}`)); // Act
        expect(screen.getByTestId('SimpleImagePicker')).toBeInTheDocument();
        const { image } = item;

        // Check if the default image value is rendered in the SimpleImagePicker
        const imageElement = screen.getByTestId('SimpleImagePicker').querySelector('img');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', image);

        fireEvent.click(screen.getByText(`CANCEL`)); // Act
      });
    });

    describe("Test Page Link and Page Id", () => {
      const changeActionType = (type: string) => {
        const actionTypeTextInput = screen.getByText('Action Type', { selector: 'label' }).parentElement.querySelector("input");
  
        fireEvent.change(actionTypeTextInput, {
          target: { value: type },
        });
      }

      test("renders with default action data", () => {
        expect(screen.queryByLabelText('Half Width Carousel Floating Text Toolbar')).toBeNull();
        act(() => {
            fireEvent.click(container.querySelector('button.add-component-button'));
        });
  
        const { sub_properties_data } = props.properties_data;
  
        sub_properties_data.forEach((item, index) => {
          fireEvent.click(screen.getByTestId(`edit_${index}`)); // Act
          const { action: { type, page_id, page_link} } = item;
  
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
  
          fireEvent.click(screen.getByText(`CANCEL`)); // Act
        });
      });
    });
  });
});