import React from "react";
import { Card, CardContent, Typography, Stack, Divider} from '@mui/material';
import { Add, Remove, ArrowOutward} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import InfoTooltip from "../../../icons/tooltip/info-tooltip/index";

export type TrendDataPointProps = {
  title: string;
  unit: string;
  value: number;
  direction: string;
}
  
export type TrendProps = {
  duration: number; // 7
  span: TrendDataPointProps,
  median?: TrendDataPointProps
};
  
export type KpiCardProps = {
  title: string;
  hero: number;
  heroUnit?: string;
  trends: TrendProps;
  tooltipDesc?: string;
  tooltipActionUrl? : string;
}

export const KpiCard: React.FC<KpiCardProps> = (props) => {
  const theme = useTheme();
  const { title, hero, heroUnit, trends } = props;

  const heroFormated = hero.toLocaleString("en-US");
  const heroUnitStyle = heroUnit && heroUnit.length > 1 ? {paddingLeft: theme.spacing(1), fontSize: theme.spacing(1.75), lineHeight: 2} : {fontSize: theme.spacing(6), lineHeight: 1};

  const DisplayTrendDataPoint = (trendDataPointProps: TrendDataPointProps, useArrow?: boolean) => {
    const { title, unit, value, direction } = trendDataPointProps;
    // TODO: add custum palete theme
    const displayColor = (direction === "up") ? "#01A611" : "#FF0000";
    // Todo: end
    const iconStyle = { marginLeft: theme.spacing(-0.375), marginBottom: theme.spacing(0.25),width: theme.spacing(2.25), height: theme.spacing(2.25), color: displayColor };

    const displayIcon = useArrow ? ((direction === "up") ? <ArrowOutward sx={iconStyle} /> : <ArrowOutward sx={{...iconStyle, transform: "rotate(90deg)" }} />) : ( (direction === "up") ? <Add sx={iconStyle}/> : <Remove sx={iconStyle}/>);

    return (
      <Stack>
        <Stack direction="row" alignItems="center" spacing={useArrow ? 0.5 : 0}>
          {displayIcon}
          <Typography sx={{ color: displayColor, fontSize: theme.spacing(1.75) }}>
            {value}{unit}
          </Typography>
        </Stack>
        <Typography noWrap={true} sx={{ fontSize: theme.spacing(1.375), letterSpacing: "0.15px", color: "text.secondary" }}>
          {title}
        </Typography>
      </Stack>
    )
  }

  return (
    <Card sx={{borderRadius: "8px"}} elevation={0}>
      <InfoTooltip {...props}/>
      <CardContent sx={{ paddingRight: theme.spacing(1.25), "&:last-child": { paddingBottom: theme.spacing(2)} }}>
        <Typography sx={{paddingTop: theme.spacing(0.5), paddingLeft: theme.spacing(0.5), fontSize: theme.spacing(1.5), letterSpacing: "0.15px"}} variant="body2">
          {title.toUpperCase()}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1.5} sx={{paddingTop: theme.spacing(2)}}>
          <Stack direction="row" alignItems="flex-end">
            <Typography sx={{ fontWeight: 500, fontSize: theme.spacing(6), lineHeight: 1, fontStyle: "Medium"}}>
              {heroFormated}
            </Typography>
            {
              heroUnit && (
                <Typography sx={{ ...heroUnitStyle, fontWeight: 500}}>
                  {heroUnit.toUpperCase()}
                </Typography>
              )
            }
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1.125} divider={<Divider orientation="vertical" sx={{ height: theme.spacing(3.75), minWidth: 0 }} />}>
            {DisplayTrendDataPoint(trends.span, true)}
            { 
              trends.median && (
                DisplayTrendDataPoint(trends.median, false)
              )
            }
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
  
export default KpiCard;