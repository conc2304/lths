import React from 'react';
import { CardContent, Typography, Popover } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import Box, { BoxProps } from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';
import { blue } from '@mui/material/colors';
import Link, { LinkProps } from '@mui/material/Link';
import { useTheme, styled } from '@mui/material/styles';

// ToDo: switch to using theme for color
const GreyCard = styled(Card)<CardProps>(({ theme }) => ({

  color: '#FFFFFF',
  backgroundColor: theme.palette.grey[700],
}));

const GreyCardArrowBox = styled(Box)<{beforeBackgroundColor : string}>(({ beforeBackgroundColor }) => ({
  position: 'relative',
  marginBottom: '18px',
  backgroundColor: beforeBackgroundColor, // this line is just for jest testing
  '&::before': {
    boxShadow: '2.5 px 2.5px 3.5px 0px rgba(0,0,0,0.15)',
    backgroundColor: beforeBackgroundColor,
    content: "''",
    position: 'absolute',
    width: 24,
    height: 24,
    bottom: -12,
    transform: 'rotate(45deg)',
    left: 'calc(50% - 12px)',
  },
}));

const GreyCardLink = styled(Link)<LinkProps>(() => ({
  color: blue[200],
}));
// ToDo: switch to using theme for color
export type ActionProps = {
  url?: string;
  title?: string;
};
export type InfoTooltipProps = {
  title?: string;
  description: string;
  action?: ActionProps;
};

export const InfoTooltip: React.FC<InfoTooltipProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const onPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onPopperClose = () => {
    setAnchorEl(null);
  };

  const { title, description, action } = props;
  const theme = useTheme();
  if (!description && !title) return null;
  // ToDo: switch to using theme for color
  const infoIconColor = theme.palette.grey[500];

  return (
    <div onMouseEnter={onPopoverOpen} onMouseLeave={onPopperClose} data-testid="InfoTooltipOnHover">
      <Box aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" height={theme.spacing(2.55)}>
        <InfoOutlined sx={{ color: infoIconColor, fontSize: theme.spacing(2.55) }} />
      </Box>
      <Popover
        id={'mouse-over-popover'}
        data-testid="TooltipPopover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        onClose={onPopperClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: 0,
            padding: theme.spacing(0.5),
          },
        }}
      >
        <GreyCard sx={{ width: 264, pointerEvents: 'visible', border: theme.spacing(1) }} data-testid="GreyCard">
          <CardContent
            sx={{
              paddingTop: theme.spacing(2.25),
              paddingBottom: theme.spacing(3.75),
              paddingLeft: theme.spacing(2.3),
              paddingRight: theme.spacing(1.75),
            }}
          >
            <Typography sx={{ marginBottom: theme.spacing(1.375) }} variant="body2">
              {title?.toUpperCase()}
            </Typography>
            <Typography sx={{ marginBottom: theme.spacing(2) }} variant="body2">
              {description}
            </Typography>
            {action?.url && (
              <GreyCardLink href={action.url} underline="none" variant="body2">
                {action.title ? action.title : 'LEARN MORE'}
              </GreyCardLink>
            )}
          </CardContent>
        </GreyCard>
        <GreyCardArrowBox data-testid="GreyArrow" beforeBackgroundColor={theme.palette.grey[700]}/>
      </Popover>
    </div>
  );
};

InfoTooltip.defaultProps = {
  action: { title: 'LEARN MORE' },
};
