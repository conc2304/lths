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
 