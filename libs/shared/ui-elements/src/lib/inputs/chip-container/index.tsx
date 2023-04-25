import { useLayoutEffect, useRef } from 'react';
import { Badge, Box, Button, Chip, Typography, styled } from '@mui/material';
import { FormState } from '@lths/shared/ui-filters';

type ChipContainerProps = {
  title?: string;
  onDelete: (parentID: string, itemID: string) => void;
  selectedFilters: FormState;
  variant?: 'modal' | 'inline';
  onClearAll?: () => void;
  openModal?: () => void;
};

const StyledTitle = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  fontWeight: 600,
  fontSize: '0.75rem',
  lineHeight: '0.75rem',
  letterSpacing: '0.15px',
  marginRight: theme.spacing(1.5),
  whiteSpace: 'nowrap',
}));

export const ChipContainer = ({
  title,
  selectedFilters = {},
  onDelete,
  onClearAll,
  openModal,
  variant = 'modal',
}: ChipContainerProps) => {
  const overflowMode = useRef(false);
  const maxChipIndex = useRef(Infinity);

  const containerRef = useRef<HTMLDivElement>(null);
  const chipWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const seeMoreBtnClassName = 'ChipContainer--see-more-chip-btn';

  const itemsSelectedCount = Object.values(selectedFilters).reduce(
    (count, currentItem) => count + Object.entries(currentItem).length,
    0
  );

  useLayoutEffect(() => {
    // We need to calculate whether or not this chips overflow their container,
    // If they do, cut them off and render a seeMore button in their place
    if (variant === 'inline' && !!itemsSelectedCount && !!containerRef.current) {
      if (!chipWrapperRef.current?.childNodes) return;

      const childNodes = chipWrapperRef.current.childNodes;
      const containerWidth = containerRef.current?.getBoundingClientRect().width ?? 0;
      const titleWidth = titleRef.current?.getBoundingClientRect().width ?? 0;
      const buttonWidth = buttonRef.current?.getBoundingClientRect().width ?? 0;

      const seeMoreButtonExists = (childNodes.item(childNodes.length - 1) as HTMLElement).className.includes(
        seeMoreBtnClassName
      );
      const moreButtonWidth = seeMoreButtonExists
        ? (childNodes.item(childNodes.length - 1) as HTMLElement).offsetWidth
        : 0;

      const paddingAllowance = 50;
      const maxChipContainerWidth = containerWidth - buttonWidth - titleWidth - paddingAllowance - moreButtonWidth;

      let currContainerWidth = 0;

      let done = false;
      childNodes.forEach((node, index) => {
        if (!node || done) return;

        const element = node as HTMLElement;
        const style = window.getComputedStyle(element);
        const width = element.offsetWidth;
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
        const totalWidth = width + margin + padding + border;
        const nextContainerWidth = totalWidth + currContainerWidth;

        if (nextContainerWidth < maxChipContainerWidth) {
          currContainerWidth = nextContainerWidth;
          overflowMode.current = true;
        } else {
          // last one that fit was the one before this current one
          done = true;
          maxChipIndex.current = index - 1;
          overflowMode.current = true;
          return;
        }
      });
    }
  }, [selectedFilters, itemsSelectedCount, variant]);

  if (variant === 'modal') {
    return (
      <div>
        <Box display="flex" justifyContent="flex-start" alignItems="baseline" mb={2}>
          <StyledTitle variant="h5">{title}</StyledTitle>
          <Badge
            badgeContent={itemsSelectedCount || 0}
            color="primary"
            sx={{
              // force the badge icon to vertically center again
              '& .MuiBadge-badge': {
                backgroundColor: '#0760A4',
                position: 'relative',
                transform: 'unset',
              },
            }}
          ></Badge>
        </Box>

        <Box display="flex" justifyContent="flex-start" alignContent="baseline" flexWrap="wrap">
          {Object.keys(selectedFilters).map((groupID) => {
            const group = selectedFilters[groupID];
            return Object.values(group).map((item) => {
              return (
                <Chip
                  label={item.title}
                  onDelete={() => onDelete(groupID, item.id as string)}
                  key={`${groupID}--${item.id}`}
                />
              );
            });
          })}
        </Box>
      </div>
    );
  } else if (variant === 'inline' && !!itemsSelectedCount) {
    let chipIndex = 0;
    const extraChipCount = itemsSelectedCount - (maxChipIndex.current + 1);
    return (
      <div>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          mb={2}
          maxWidth="100%"
          className="ChipContainer--content"
          ref={containerRef}
        >
          <StyledTitle variant="h5" pr={2} ref={titleRef}>
            {itemsSelectedCount} {title}
          </StyledTitle>
          <Box
            ref={chipWrapperRef}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            className="ChipContainer--chips-wrapper"
          >
            {Object.keys(selectedFilters).map((groupID) => {
              const group = selectedFilters[groupID];
              return Object.values(group).map((item) => {
                if (chipIndex <= maxChipIndex.current) {
                  chipIndex++;
                  return (
                    <Chip
                      label={item.title}
                      onDelete={() => onDelete(groupID, item.id as string)}
                      key={`${groupID}--${item.id}`}
                    />
                  );
                } else return null;
              });
            })}
            {overflowMode.current && maxChipIndex.current !== Infinity && extraChipCount > 0 && (
              <Chip className={seeMoreBtnClassName} label={`MORE (${extraChipCount})`} onClick={openModal} />
            )}
          </Box>

          <div ref={buttonRef}>
            <Button
              variant="text"
              color="secondaryButton"
              size="large"
              onClick={onClearAll}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Clear All
            </Button>
          </div>
        </Box>
      </div>
    );
  } else {
    return null;
  }
};
