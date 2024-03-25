import { ChangeEventHandler, DragEventHandler, useRef, useState } from 'react';
import { Box, Button, Divider, FormLabel, Input, Typography, hexToRgb, useTheme } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Property } from 'csstype';

import { FileList } from '../../data-display';

type DragDropFileProps = {
  files: FileList | null;
  onFilesChanged: (files: FileList) => void;
  borderColor?: Property.BorderColor;
  backgroundDragColor?: Property.BackgroundColor;
  maxFileSize?: number | string;
  promptText?: string;
  buttonText?: string;
  iconColor?: Property.Color;
  iconSize?: Property.FontSize;
  fullWidth?: boolean;
  multiple?: boolean;
  accept?: string;
  filesRemovable?: boolean;
  showFilesAdded?: boolean;
};

export const DragDropFile = (props: DragDropFileProps) => {
  const theme = useTheme();

  const {
    files,
    onFilesChanged,
    filesRemovable = false,
    showFilesAdded = false,
    multiple = false,
    borderColor = theme.palette.primary.main,
    backgroundDragColor = theme.palette.grey[300],
    maxFileSize = 'XXX',
    promptText = 'Drag and drop your file here.',
    buttonText = 'Browse Files',
    iconColor = theme.palette.primary.main,
    iconSize = '2.5rem',
    fullWidth = false,
    accept = '*',
  } = props;

  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxWidth = fullWidth ? '100%' : '21.125rem';

  // handle drag events
  const handleDrag: DragEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFilesChanged(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFilesChanged(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const handleRemoveFile = (index: number) => {
    if (!files) return;

    if (process.env['NODE_ENV'] === 'test') {
      // @ts-expect-error - getting around no DataTransfer being undefined in testing env
      onFilesChanged(files[index] as FileList);
      return;
    }

    const dt = new DataTransfer();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (index !== i) dt.items.add(file);
    }

    onFilesChanged(dt.files);
  };

  return (
    <Box
      component={'div'}
      data-testid="Drag-Drop-File--drag-target"
      onDragEnter={handleDrag}
      sx={{
        width: boxWidth,
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Input
        inputComponent={'input'}
        inputRef={inputRef}
        name="files"
        type="file"
        id="input-file-upload"
        data-testid="Drag-Drop-File--file-input"
        onChange={handleChange}
        sx={{ display: 'none' }}
        inputProps={{
          multiple,
          accept,
        }}
      />
      <FormLabel
        id="label-file-upload"
        htmlFor="input-file-upload"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          px: 1.5,
          py: 2.5,
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='${
            dragActive ? hexToRgb(backgroundDragColor) : 'none'
          }' rx='8' ry='8' stroke='${hexToRgb(
            borderColor
          )}' stroke-width='2' stroke-dasharray='5%2c11' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
border-radius: 8px`,
        }}
      >
        <Box>
          <UploadFileIcon htmlColor={iconColor} sx={{ fontSize: iconSize }} />
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '1.125rem',
              letterSpacing: '0.15px',
            }}
          >
            {promptText}
          </Typography>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Divider sx={{ width: '40px' }} />
            <Typography sx={{ fontSize: '1.125rem', letterSpacing: '0.15px', px: 1, py: 2 }}>or</Typography>
            <Divider sx={{ width: '40px' }} />
          </Box>
          <Button className="upload-button" variant="outlined" onClick={onButtonClick}>
            {buttonText}
          </Button>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              fontSize: '0.75rem',
              lineHeight: '1.125rem',
              letterSpacing: '0.15px',
              mt: '1rem',
            }}
          >
            Maximum file size {maxFileSize}MB
          </Typography>
        </Box>
      </FormLabel>
      {showFilesAdded && files && files.length > 0 && (
        <FileList files={files} filesRemovable={filesRemovable} onRemoveFile={handleRemoveFile} />
      )}
      {dragActive && (
        <Box
          data-testid="Drag-Drop-File--drop-target"
          component={'div'}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: ' 1rem',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }}
        />
      )}
    </Box>
  );
};
