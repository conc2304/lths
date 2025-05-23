import { useRef } from 'react';
import { Typography, Box, Chip, useTheme } from '@mui/material';

import { pxToRem } from '@lths/shared/utils';

import { SelectOptionInternal } from './types';

type SelectChipRendererProps = {
  selectedItems: SelectOptionInternal[];
  onRemoveItem: (id: string | number) => void;
  chipLimit?: number;
  showAllText?: string;
};

const MenuItemFontStyle = {
  fontSize: pxToRem(12),
  lineHeight: pxToRem(22),
  letterSpacing: '0.15px',
  pl: pxToRem(8),
};

export const SelectChipRenderer = (props: SelectChipRendererProps) => {
  const { selectedItems, onRemoveItem, chipLimit = 3, showAllText = 'Show All' } = props;

  const theme = useTheme();

  const showAllValue: [string, string] = ['all', showAllText];

  const currChipIndex = useRef(0);
  const seeMoreBtnClassName = 'ChipContainer--see-more-chip-btn';

  const extraChipCount = selectedItems.length - chipLimit;
  const seeMoreActive = !!extraChipCount;
  const seeMoreMaxChips = !seeMoreActive ? chipLimit : chipLimit - 1;

  currChipIndex.current = 0;

  return (
    <Box
      sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5, width: '100%' }}
      data-testid="MultiSelect--chip-container"
    >
      {/* Loop over all selected items and render them as chips */}
      {selectedItems.map(([id, label]) => {
        const [showAllId, showAllLabel] = showAllValue;
        // Handle show all
        if (id === showAllId) {
          return (
            <Typography key={showAllId} sx={MenuItemFontStyle}>
              {showAllLabel}
            </Typography>
          );
          // if see more is active, render max chips -1
        } else if (currChipIndex.current < seeMoreMaxChips) {
          // handle render all chips that fit
          currChipIndex.current++;
          return (
            <Chip
              key={id}
              label={label}
              onMouseDown={(e) => {
                //  Prevent the select component from stealing our focus, thats it
                e.stopPropagation();
              }}
              onDelete={() => onRemoveItem(id)}
              sx={{
                borderRadius: pxToRem(4),
                fontSize: pxToRem(12),
                my: 0,
                mr: theme.spacing(1),
                '& .MuiChip-label': { textTransform: 'none' },
              }}
            />
          );
        } else {
          currChipIndex.current++;
          return <Box key={`empty-${currChipIndex.current}`}></Box>;
        }
      })}
      {/* Render the See More Button if we need it */}
      {extraChipCount > 0 && (
        <Chip
          className={seeMoreBtnClassName}
          // "+ 1" becase we are swapping an existing chip with the see more button
          label={`MORE (${extraChipCount + 1})`}
          data-testid={seeMoreBtnClassName}
          sx={{
            cursor: 'pointer',
            borderRadius: pxToRem(4),
            fontSize: pxToRem(12),
            my: 0,
            mr: theme.spacing(1),
            '& .MuiChip-label': { textTransform: 'none' },
          }}
        />
      )}
    </Box>
  );
};
