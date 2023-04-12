import React from "react";
import { Card, CardContent, Typography, Popover, Link, Box} from '@mui/material';
import {InfoOutlined} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export type InfoTooltipProps = {
    title: string;
    tooltipDesc?: string;
    tooltipActionUrl? : string;
}

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
  
    // ToDo: switch to using theme
    const tooltipBackgroundColor = "#6c7279";
    const textColor = "#FFFFFF";
    const linkColor = "#A0D6FF";
    const infoIconColor = "#979797";
    // ToDo: switch to using theme
  
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
              backgroundColor: "transparent", boxShadow: "none", borderRadius: 0
            }
          }}
        >
          <Card sx={{ width: 264, pointerEvents: 'visible', backgroundColor: theme.palette.grey[700], border: theme.spacing(1)}} elevation={3}>
            <CardContent sx={{paddingTop: theme.spacing(2.25), paddingBottom: theme.spacing(3.75), paddingLeft: theme.spacing(2.3), paddingRight: theme.spacing(1.75)}}>
              <Typography sx={{color: textColor, marginBottom: theme.spacing(1.375), letterSpacing: "0.15px"}} variant="body2">
                {title.toUpperCase()}
              </Typography>
              <Typography sx={{ color: textColor, marginBottom: theme.spacing(2), letterSpacing: "0.15px" }} variant="body2">
                {tooltipDesc}
              </Typography>
              {
                tooltipActionUrl && (
                  <Link sx={{ color: linkColor, letterSpacing: "0.15px" }} href={tooltipActionUrl} underline="none" variant="body2">
                    LEARN MORE
                  </Link>
                )
              }
            </CardContent>
          </Card>
          <Box
            sx={{
              position: "relative",
              mb: "18px",
              "&::before": {
                backgroundColor: theme.palette.grey[700],
                content: "''", position: "absolute", width: 24, height: 24, 
                bottom: -12, transform: "rotate(45deg)", left: "calc(50% - 12px)"
              }
            }}
          />
        </Popover>
      </div>
    )
  }

export default InfoTooltip;