import React from "react";
import { Card, CardContent, Typography, Stack} from '@mui/material';
import { Add, Remove, ArrowOutward} from '@mui/icons-material';
import { grey, green, red } from "@mui/material/colors";
import { useTheme } from '@mui/material/styles';

export type TrendDataPointProps = {
  title: string;
  unit: string;
  value: number;
  direction: string;
}
  
export type KpiVerticalCardProps = {
  title: string;
  hero: number;
  heroUnit?: string;
  trendDataPoint: TrendDataPointProps;
}

export const KpiVerticalCard: React.FC<KpiVerticalCardProps> = (props) => {
  const theme = useTheme();
  const { title, hero, heroUnit, trendDataPoint } = props;

  const heroFormated = hero.toLocaleString("en-US");
  const heroUnitStyle = heroUnit && heroUnit.length > 1 ? {paddingLeft: theme.spacing(1), fontSize: theme.spacing(1.75), lineHeight: 2} : {fontSize: theme.spacing(6), lineHeight: 1};

  const DisplayTrendDataPoint = (trendDataPointProps: TrendDataPointProps, useArrow?: boolean) => {
    const { title, unit, value, direction } = trendDataPointProps;
    // TODO: add custum palete theme for increase  and decrease stats
    const increaseColor = green[500]; // "#01A611";
    const decreaseColor = red[500]; //"#FF0000";
    const displayColor = (direction === "up") ? increaseColor : decreaseColor;
    // Todo: end
    const iconStyle = { marginLeft: theme.spacing(-0.375), marginBottom: theme.spacing(0.25), width: theme.spacing(2.25), height: theme.spacing(2.25), color: displayColor };

    const displayIcon = useArrow ? ((direction === "up") ? <ArrowOutward sx={iconStyle} /> : <ArrowOutward sx={{...iconStyle, transform: "rotate(90deg)" }} />) : ( (direction === "up") ? <Add sx={iconStyle}/> : <Remove sx={iconStyle}/>);

    return (
      <Stack direction="row" alignItems="flex-end" spacing={1.2}>
        <Stack direction="row" alignItems="center" spacing={useArrow ? 0.5 : 0}>
          {displayIcon}
          <Typography sx={{ color: displayColor, fontSize: theme.spacing(1.75), letterSpacing: theme.spacing(0.01875) }}>
            {value}{unit}
          </Typography>
        </Stack>
        <Typography noWrap={true} sx={{ fontSize: theme.spacing(1.375), color: "text.secondary", letterSpacing: theme.spacing(0.01875) }}>
          {title}
        </Typography>
      </Stack>
    )
  }

  return (
    <Card sx={{ boxShadow: 'none'}}>
      <CardContent sx={{ paddingRight: theme.spacing(1.25), "&:last-child": { paddingBottom: theme.spacing(2)} }}>
        <Stack direction="column" justifyContent="space-between" alignItems="flex-start" spacing={1.5} sx={{paddingTop: theme.spacing(2)}}>
          <Typography sx={{color: grey[700], fontWeight: 500, fontSize: theme.spacing(1.5), letterSpacing: theme.spacing(0.01875)}} variant="body2">
            {title.toUpperCase()}
          </Typography>
          <Stack direction="row" alignItems="flex-end" >
            <Typography sx={{ fontWeight: 500, fontSize: theme.spacing(6), lineHeight: 1, fontStyle: "Medium", letterSpacing: theme.spacing(0.01875)}}>
              {heroFormated}
            </Typography>
            {
              heroUnit && (
                <Typography sx={{ ...heroUnitStyle, fontWeight: 500, letterSpacing: theme.spacing(0.01875)}}>
                  {heroUnit.toUpperCase()}
                </Typography>
              )
            }
          </Stack>
          {DisplayTrendDataPoint(trendDataPoint, true)}
        </Stack>
      </CardContent>
    </Card>
  )
}
  
export default KpiVerticalCard;