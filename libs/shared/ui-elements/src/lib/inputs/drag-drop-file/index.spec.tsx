import React from 'react';
import { RBThemeProvider } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DragDropFile } from './index';

describe('DragDropFile component', () => {
  const renderWithTheme = (component: JSX.Element) => {
    return render(RBThemeProvider({ children: component }));
  };

  function createMockFileList(files: File[]) {
    const mockFileList = Object.create(Object.prototype, {
      length: {
        get() {
          return files.length;
        },
      },
      item: {
        value(index: number) {
          return files[index];
        },
      },
    });

    files.forEach((file, index) => {
      Object.defineProperty(mockFileList, index, {
        get() {
          return file;
        },
      });
    });

    return mockFileList;
  }

  const mockFiles = [
    new File(['file content 1'], 'file1.txt', { type: 'text/plain' }),
    new File(['file content 2'], 'file2.txt', { type: 'text/plain' }),
  ];

  const mockFileList = createMockFileList(mockFiles);

  it('renders with default props', () => {
    renderWithTheme(
      <DragDropFile
        files={null}
        onFilesChanged={() => {
          /** do nothing */
        }}
      />
    );
    expect(screen.getByText('Drag and drop your file here.')).toBeInTheDocument();
    expect(screen.getByText('Browse Files')).toBeInTheDocument();
  });

  it('renders files added when showFilesAdded is true', () => {
    const { getByText } = renderWithTheme(
      <DragDropFile
        multiple
        files={mockFileList}
        onFilesChanged={() => {
          /**do nothing  */
        }}
        showFilesAdded={true}
      />
    );

    mockFiles.forEach((file) => {
      expect(getByText(file.name)).toBeInTheDocument();
    });
  });

  it('invokes onFilesChanged when files are uploaded', async () => {
    // Get the input element
    const onFilesChanged = jest.fn();
    const { getByTestId } = renderWithTheme(<DragDropFile files={null} onFilesChanged={onFilesChanged} />);

    const input = getByTestId('Drag-Drop-File--file-input').querySelector('input') as HTMLInputElement;
    expect(input).toBeInTheDocument();

    // Upload the files programatically through onChange event
    fireEvent.change(input, {
      target: {
        files: mockFiles,
      },
    });

    // Verify that we have the number of files expected and our change handler was called correctly
    expect(input.files).toHaveLength(mockFiles.length);
    expect(onFilesChanged).toHaveBeenCalledTimes(1);
    expect(onFilesChanged).toHaveBeenCalledWith(mockFiles);
  });

  it('removes file when delete button is clicked', async () => {
    const user = userEvent.setup();

    const onFilesChanged = jest.fn();
    const { queryAllByTestId } = renderWithTheme(
      <DragDropFile files={mockFileList} onFilesChanged={onFilesChanged} showFilesAdded={true} filesRemovable={true} />
    );
    const deleteButton = queryAllByTestId('Drag-Drop-File--delete-file-button')[0];
    expect(deleteButton).toBeInTheDocument();

    await user.click(deleteButton);

    expect(onFilesChanged).toHaveBeenCalledTimes(1);
    expect(onFilesChanged).toHaveBeenCalledWith(mockFiles[0]);
  });

  it('renders with custom props', () => {
    const testPrompt = 'Custom prompt text';
    const testButton = 'Custom button text';
    const { getByText } = renderWithTheme(
      <DragDropFile
        files={mockFileList}
        onFilesChanged={() => {
          /** do nothing */
        }}
        filesRemovable={true}
        showFilesAdded={true}
        promptText={testPrompt}
        buttonText={testButton}
      />
    );
    expect(getByText(testPrompt)).toBeInTheDocument();
    expect(getByText(testButton)).toBeInTheDocument();
  });
});
