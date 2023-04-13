import React from "react";
import { CardContent, Typography, Popover} from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import Box, { BoxProps } from '@mui/material/Box';
import Card, { CardProps } from '@mui/material/Card';
import { blue } from "@mui/material/colors";
import Link, { LinkProps } from '@mui/material/Link';
import { useTheme, styled } from '@mui/material/styles';

export type InfoTooltipProps = {
    title: string;
    tooltipDesc?: string;
    tooltipActionUrl? : string;
}

 // ToDo: switch to using theme for color
const GreyCard = styled(Card)<CardProps>(({ theme }) => ({
  color: "#FFFFFF",   // const textColor = "#FFFFFF";
  backgroundColor: theme.palette.grey[700], // tooltipBackgroundColor = "#6c7279";
}));

const GreyCardArrowBox = styled(Box)<BoxProps>(({ theme }) => ({
  position: "relative",
  marginBottom: "18px",
  "&::before": {
    boxShadow: '2.5 px 2.5px 3.5px 0px rgba(0,0,0,0.15)',
    backgroundColor: theme.palette.grey[700], // tooltipBackgroundColor = "#6c7279";
    content: "''", position: "absolute", width: 24, height: 24, 
    bottom: -12, transform: "rotate(45deg)", left: "calc(50% - 12px)"
  }
}));

const GreyCardLink = styled(Link)<LinkProps>(() => ({
  color: blue[200], // const linkColor = "#A0D6FF";
}));
// ToDo: switch to using theme for color

const InfoTooltip: React.FC<InfoTooltipProps> = (props)  => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const open  = Boolean(anchorEl);
  
    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
      setAnchorEl(null);
    };
  
    const {title, tooltipDesc, tooltipActionUrl} = props;
    const theme = useTheme();
    if (!tooltipDesc || !title) return null;
  
    // ToDo: switch to using theme for color
    const infoIconColor = theme.palette.grey[500];
  
    return (
      <div style={{float: "right", margin: theme.spacing(0.8)}} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
        >
          <InfoOutlined sx={{color: infoIconColor, fontSize: theme.spacing(2.55)}}/>
        </Typography>
        <Popover
          id={"mouse-over-popover"}
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          PaperProps={{
            style: {
              backgroundColor: "transparent", boxShadow: "none", borderRadius: 0, padding: theme.spacing(0.5),
            }
          }}
        >
          <GreyCard sx={{ width: 264, pointerEvents: 'visible', border: theme.spacing(1)} }>
            <CardContent sx={{paddingTop: theme.spacing(2.25), paddingBottom: theme.spacing(3.75), paddingLeft: theme.spacing(2.3), paddingRight: theme.spacing(1.75)}}>
              <Typography sx={{ marginBottom: theme.spacing(1.375)}} variant="body2">
                {title.toUpperCase()}
              </Typography>
              <Typography sx={{ marginBottom: theme.spacing(2) }} variant="body2">
                {tooltipDesc}
              </Typography>
              {
                tooltipActionUrl && (
                  <GreyCardLink href={tooltipActionUrl} underline="none" variant="body2">
                    LEARN MORE
                  </GreyCardLink>
                )
              }
            </CardContent>
          </GreyCard>
          <GreyCardArrowBox/>
        </Popover>
      </div>
    )
  }

export default InfoTooltip;