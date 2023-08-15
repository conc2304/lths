import '@testing-library/jest-dom';
import { render, fireEvent, screen, within } from "@testing-library/react";

import { PreviewDrawerContent, PreviewDrawerContentProps } from '../assets';

describe("PreviewDrawerContent Component", () => {
  let props: PreviewDrawerContentProps;
  let handleOpenModalMock: jest.Mock;
  beforeEach(() => {
    // Set up the props for each test case
    handleOpenModalMock = jest.fn();

    props = {
      openModal: handleOpenModalMock,
      data: {
            id: "1231231231wqeqewe1231",
            name: "coolCatImage",
            created: "June 9",
            filetype: ".png",
            owner: "Steve Bob",
            dimensions: "3734 x 18582",
      },
    }
  });

  afterEach(() => {
    // Set up the props for each test case
    jest.clearAllMocks();
  });

  test("should render PreviewDrawerContent component with correct values", () => {
    render(<PreviewDrawerContent {...props} />);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText(props.data.created)).toBeInTheDocument();
    expect(screen.getByText(props.data.filetype)).toBeInTheDocument();
    expect(screen.getByText(props.data.owner)).toBeInTheDocument();
    expect(screen.getByText(props.data.dimensions)).toBeInTheDocument();
  });


  test("should render PreviewDrawerContent component with correct File details values and labels", () => {
    render(<PreviewDrawerContent {...props} />);

    // Assert that the expected elements are rendered with the correct values
    const CreatedContainer = screen.getByText('Created').parentElement;
    const createdData = within(CreatedContainer).getByText(props.data.created);
    expect(createdData).toBeInTheDocument();

    const FileTypeContainer = screen.getByText('File type').parentElement;
    const fileTypeData = within(FileTypeContainer).getByText(props.data.filetype);
    expect(fileTypeData).toBeInTheDocument();

    const OwnerContainer = screen.getByText('Owner').parentElement;
    const ownerData = within(OwnerContainer).getByText(props.data.owner);
    expect(ownerData).toBeInTheDocument();

    const DimensionsContainer = screen.getByText('Dimensions').parentElement;
    const dimensionsData = within(DimensionsContainer).getByText(props.data.dimensions);
    expect(dimensionsData).toBeInTheDocument();
  });

  test("PreviewDrawerContent buttons rendered", () => {
    render(<PreviewDrawerContent {...props} />);

    const renameButton = screen.getByText("RENAME");
    expect(renameButton).toBeInTheDocument();

    const deleteButton = screen.getByText("DELETE");
    expect(deleteButton).toBeInTheDocument();

    const previewButton = screen.getByText("PREVIEW");
    expect(previewButton).toBeInTheDocument();

    const downloadButton = screen.getByText("DOWNLOAD");
    expect(downloadButton).toBeInTheDocument();

  });

  test("PreviewDrawerContent rename and delete buttons are called with correct data", () => {
    render(<PreviewDrawerContent {...props} />);

    // Test Rename button
    // Arrange
    const renameButton = screen.getByText("RENAME");
    // Act
    fireEvent.click(renameButton);
    // Assert
    expect(handleOpenModalMock).toHaveBeenCalledWith("Rename", props.data);

    // Test Delete button
    // Arrange
    const deleteButton = screen.getByText("DELETE");
    // Act
    fireEvent.click(deleteButton);
    // Assert
    expect(handleOpenModalMock).toHaveBeenCalledWith( "Delete", props.data );

  });

  test("PreviewDrawerContent Image container rendered", () => {
    render(<PreviewDrawerContent {...props} />);

    const imageContainer= screen.getByTestId(`${props.data.id}-image-display`);
    expect(imageContainer).toBeInTheDocument();
  });

  // ToDo: test correct background image was rendered when proper url is passed as data
});