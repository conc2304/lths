import { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { Property } from 'csstype';

import { humanFileSize } from '@lths/shared/utils';

type FileListProps = {
  files: File[] | null;
  filesRemovable?: boolean;
  onRemoveFile?: (index: number) => void;
  maxHeight?: Property.MaxHeight;
};
export const FileList = (props: FileListProps) => {
  const { files: filesProp, filesRemovable, onRemoveFile, maxHeight } = props;

  const [files, setFiles] = useState<File[]>([]);
  useEffect(() => {
    if (filesProp) setFiles(filesProp);
  }, [filesProp]);

  return (
    <Box>
      <Box
        sx={{
          pt: 0.5,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            height: '25px',
            display: 'block',
            background: 'linear-gradient(to bottom, #FFF 0% 20%, transparent 90% 100%)',
            position: 'absolute',
            top: 0,
            width: 'calc(100% - 5px)',
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            height: '18px',
            display: 'block',
            background: 'linear-gradient(to top, #FFF 0% 20%, transparent 90% 100%)',
            position: 'absolute',
            bottom: 0,
            width: 'calc(100% - 5px)',
            zIndex: 1,
          }}
        />
        <List
          dense
          sx={{
            maxHeight: maxHeight || '8.5rem',
            overflowY: 'scroll',
            position: 'relative',

            '&::-webkit-scrollbar': {
              display: 'block',
              width: '5px',
              position: 'absolute',
              top: 0,
              right: 0,
            },
            '&::-webkit-scrollbar-button': {
              display: 'none',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#00000000',
            },
            '&::-webkit-scrollbar-track-piece': {
              backgroundColor: '#00000000',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '20px',
              border: (theme) => `5px solid ${theme.palette.grey[300]}`,
            },
          }}
        >
          {files &&
            Array.from(files).map((file: File, i) => (
              <ListItem
                key={file.name}
                secondaryAction={
                  filesRemovable &&
                  onRemoveFile && (
                    <IconButton
                      edge="end"
                      data-testid="Drag-Drop-File--delete-file-button"
                      aria-label="delete file"
                      onClick={() => onRemoveFile && onRemoveFile(i)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={file.name} secondary={humanFileSize(file.size)} />
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};
