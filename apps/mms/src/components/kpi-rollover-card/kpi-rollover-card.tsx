import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';

import Popover from '@mui/material/Popover';

import Popper from '@mui/material/Popper';
import {InfoOutlined, Add, Remove, ArrowOutward, ExpandLess, ExpandMore } from '@mui/icons-material';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

import { useTheme } from '@mui/material/styles';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { relative } from "path";
 
export type TrendDataPoint = {
  title: string; // "Prev 7 days"
  unit: string; // "%"
  value: number; // 31
  direction: string;  // "up"
}

export type TrendProps = {
  //types of trens: Time duration, Median
  duration: number; // 7
  span: TrendDataPoint,
  median: TrendDataPoint
};

interface Props {
  title?: string,
  hero?: number, // comp format to add commas
  trends?: TrendProps,
  sparkLine?: React.ReactElement; // ToDo; Switch to sparkline format
  tooltipDesc?: string;
  tooltipActionUrl? : string;
  rolloverData?: TrendProps[]; // what is that
  rolloverTitle?: string;
}

export const KpiRolloverCard: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { title, hero, trends, sparkLine } = props;

  const DisplayTrendDataPoint = (trendDataPoint: TrendDataPoint, useArrow: boolean) => {
    const { title, unit, value, direction  } = trendDataPoint;
    const displayColor = (direction === "up") ? "#01A611" : "#FF0000";
    const iconStyle = { marginLeft: theme.spacing(-0.625), width: theme.spacing(2.5), height: theme.spacing(2.5), color: displayColor };

    const displayIcon = useArrow ? ((direction === "up") ? <ArrowOutward sx={iconStyle} /> : <ArrowOutward sx={{...iconStyle, transform: "rotate(90deg)" }} />) : ( (direction === "up") ? <Add sx={iconStyle}/> : <Remove sx={iconStyle}/>);
    // Add, Remove, ArrowOutward, ExpandLess, ExpandMore
  
    return (
      <Stack>
        <Stack direction="row" spacing={0.5}>
          {displayIcon}
          <Typography sx={{ color: displayColor }} variant="h6">
            {value}{unit}
          </Typography>
        </Stack>
        <Typography noWrap={true} sx={{ fontSize: theme.spacing(1.25), letterSpacing: "0.15px", color: "text.secondary" }}>
          {title}
        </Typography>
      </Stack>
    )
  }

  return (
    <Paper sx={{ width: 276, backgroundColor: "white", marginBottom: "48px"}} elevation={3} >
      <Card sx={{ width: 276, border: "none", boxShadow: "none" }}>
        <InfoToolTip {...props}/>
        <CardContent sx={{ paddingRight: theme.spacing(1.25)}}>
          <Typography sx={{paddingTop: theme.spacing(0.5), paddingLeft: theme.spacing(0.5), fontSize: theme.spacing(1.5), letterSpacing: "0.15px"}} variant="body2">
            {title.toUpperCase()}
          </Typography>
          <Stack direction="row" spacing={1.125} alignItems="center" sx={{paddingTop: theme.spacing(2)}}>
            <Typography sx={{ paddingRight: theme.spacing(0.25), fontWeight: 500, fontSize: theme.spacing(6), lineHeight: 1}}>
              {hero.toLocaleString("en-US")}
            </Typography>
            {DisplayTrendDataPoint(trends.span, true)}
            <Divider orientation="vertical" sx={{ height: theme.spacing(3.75) }} />
            {DisplayTrendDataPoint(trends.median, false)}
          </Stack>
        </CardContent>
      </Card>
      <Accordion disableGutters sx={{ width: 276, transform: "rotate(180deg)", zIndex:2, position:'absolute', boxShadow: "0px -3px 3px -2px rgba(0,0,0,0.2), 0px -3px 4px 0px rgba(0,0,0,0.14), 0px -1px 8px 0px rgba(0,0,0,0.12)"  }} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
          sx={{transform: "rotate(180deg)", height: theme.spacing(6)}}
        >
          {sparkLine}
        </AccordionSummary>
        <AccordionDetails  sx={{backgroundColor: "white", transform: "rotate(180deg)"}}>
          <Typography sx={{}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> 
      {/* <div style={{height: theme.spacing(6), width:278, zIndex:1, position:'absolute', backgroundColor: "white"}}></div> */}
      {/* <div style={{height: theme.spacing(6)}}>WhiteSpace</div> */}
    </Paper>
  );
  // transform: "rotate(180deg)"
}

const InfoToolTip = (props: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open  = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const {title, tooltipDesc, tooltipActionUrl} = props;
  
  // ToDo: switch to using theme
  const tooltipBackgroundColor = "#6c7279";
  const textColor = "#FFFFFF";
  const linkColor = "#A0D6FF2";

  return (
    <div style={{float: "right", margin: theme.spacing(1)}} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
      >
        <InfoOutlined/>
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
        <Card sx={{ width: 264, pointerEvents: 'visible', backgroundColor: tooltipBackgroundColor}} elevation={3}>
          <CardContent sx={{paddingTop: theme.spacing(2.25), paddingBottom: theme.spacing(3.75), paddingLeft: theme.spacing(2.3), paddingRight: theme.spacing(1.75)}}>
            <Typography sx={{color: textColor, marginBottom: theme.spacing(1.375), letterSpacing: 0.15}} variant="body2">
              {title.toUpperCase()}
            </Typography>
            <Typography sx={{ color: textColor, marginBottom: theme.spacing(2), letterSpacing: 0.15 }} variant="body2">
              {tooltipDesc}
            </Typography>
            <Link sx={{ color: linkColor, letterSpacing: 0.15 }} href={tooltipActionUrl} underline="none" variant="body2">
              LEARN MORE
            </Link>
          </CardContent>
        </Card>
        <Box
          sx={{
            position: "relative",
            mb: "18px",
            "&::before": {
              backgroundColor: tooltipBackgroundColor,
              content: "''", position: "absolute", width: 24, height: 24, 
              bottom: -12, transform: "rotate(45deg)", left: "calc(50% - 12px)"
            }
          }}
        />
      </Popover>
    </div>
  )
}

export default KpiRolloverCard;