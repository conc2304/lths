export type Info = {
    description?: string | null;
    url?: string | null;
  };
  
  export type SpanData = {
    title: string;
    unit: string | null;
    value: string | number;
    direction: 'up' | 'down';
  };
  
  export type MedianData = {
    title: string;
    unit: string | null;
    value: string | number;
    direction: 'up' | 'down';
  };
  
  export type TrendData = {
    duration: string | number;
    span: SpanData;
    median: MedianData;
  };
  
  export type HistogramData = {
    datetime: string | Date;
    value: number | null;
    trends: TrendData;
  };
  
  export type EventData = {
    datetime: string;
    title: string;
    id: string;
    description?: string | null;
    details?: string | null;
  };
  
  export type HistogramComponentProps = {
    title: string | null;
    value: number | null;
    trends: TrendData;
    subtitle: string | null;
    info: Info;
    unit: string | null;
    data: HistogramData[];
    options: {
      events: EventData[];
    };
  };
  
  export type CustomTooltipProps = {
    active?: boolean;
    payload?: any[];
    label?: string;
  };
  