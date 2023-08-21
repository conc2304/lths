import '@testing-library/jest-dom';
import { render, screen, fireEvent, act } from "@testing-library/react";


import { EditorProvider } from '../../../../context';
import { PageDetail } from '@lths/features/mms/data-access';
import ToolbarMock from '../../toolbar-mock';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';

describe("Live Data Toolbar", () => {
  
  const props = {
    ...mockComponent,
    __ui_id__ : "3333333",
    component_id: Component.HeroEvent,
    properties_data: { }
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render ExternalDataToolbar component", () => {
    // Arrange
    const container  = render(
      <EditorProvider<PageDetail> initialValue={initialState}>
        <ToolbarMock componentProps={props} />
      </EditorProvider>
    ).container;

    const labelBeforeSelect = screen.queryByLabelText(props.component_id + " Toolbar");
    // Assert
    expect(labelBeforeSelect).toBeNull();

    // Act
    act(() => {
      fireEvent.click(container.querySelector('button.add-component-button'));
    });

    // Assert
    const labelAfterSelect = screen.getByLabelText(props.component_id + " Toolbar");
    expect(labelAfterSelect).toBeInTheDocument();

  });

  describe("HeroEvent Toolbar", () => {
    beforeEach(() => {
        props.component_id = Component.HeroEvent;
    });
    
    test("renders correct component", () => {
        // Arrange
        const container  = render(
          <EditorProvider<PageDetail> initialValue={initialState}>
            <ToolbarMock componentProps={props} />
          </EditorProvider>
        ).container;
        const labelBeforeSelect = screen.queryByLabelText(props.component_id + " Toolbar");

        // Assert
        expect(labelBeforeSelect).toBeNull();
    
        // Act
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });
    
        // Assert
        const labelAfterSelect = screen.getByLabelText(props.component_id + " Toolbar");
        expect(labelAfterSelect).toBeInTheDocument();
    
    });

    test("renders correct title and description", () => {
        // Arrange
        const container  = render(
          <EditorProvider<PageDetail> initialValue={initialState}>
            <ToolbarMock componentProps={props} />
          </EditorProvider>
        ).container;
        const labelBeforeSelect = screen.queryByLabelText(props.component_id + " Toolbar");
        expect(labelBeforeSelect).toBeNull(); // Assert
        // Act
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });
    
        // Assert correct title
        const toolbarTitle = screen.getByText('Event')
        expect(toolbarTitle).toBeInTheDocument();
        // correct description
        const toolbarDesc = screen.getByText('Content and data from NHL.com.')
        expect(toolbarDesc).toBeInTheDocument();
    });
  });

  describe("HeroGameBox Toolbar", () => {
    beforeEach(() => {
        props.component_id = Component.HeroGameBox;
    });

    test("renders correct component", () => {
        // Arrange
        const container  = render(
          <EditorProvider<PageDetail> initialValue={initialState}>
            <ToolbarMock componentProps={props} />
          </EditorProvider>
        ).container;
        const labelBeforeSelect = screen.queryByLabelText(props.component_id + " Toolbar");

        // Assert
        expect(labelBeforeSelect).toBeNull();
    
        // Act
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });
    
        // Assert
        const labelAfterSelect = screen.getByLabelText(props.component_id + " Toolbar");
        expect(labelAfterSelect).toBeInTheDocument();
    });

    test("renders correct title and description", () => {
        // Arrange
        const container  = render(
          <EditorProvider<PageDetail> initialValue={initialState}>
            <ToolbarMock componentProps={props} />
          </EditorProvider>
        ).container;
        const labelBeforeSelect = screen.queryByLabelText(props.component_id + " Toolbar");
        expect(labelBeforeSelect).toBeNull(); // Assert
        // Act
        act(() => {
          fireEvent.click(container.querySelector('button.add-component-button'));
        });
    
        // Assert correct title
        const toolbarTitle = screen.getByText('Gamebox')
        expect(toolbarTitle).toBeInTheDocument();
        // correct description
        const toolbarDesc = screen.getByText('Content and data from NHL.com.')
        expect(toolbarDesc).toBeInTheDocument();
    });
  });
});