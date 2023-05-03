import { ActionProps, InfoTooltipProps } from '../../icons/tooltip/info-tooltip';

export type TrendDataPointProps = {
    title: string;
    unit: string;
    value: number | string;
    direction: string;
  };
  
export type TrendProps = {
    duration: number | string; // 7
    span: TrendDataPointProps;
    median?: TrendDataPointProps;
};

export type KpiCardProps = {
    title: string;
    hero: number;
    heroUnit?: string;
    trends: TrendProps;
    tooltip?: InfoTooltipProps;
    detail?: ActionProps;
};
