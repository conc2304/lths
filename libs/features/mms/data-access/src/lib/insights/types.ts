import { FilterSettingsPayload } from '@lths/types/ui-filters';

export type InsightRequest = FilterSettingsPayload;
export type InsightItem = {
  kpi: Array<KPI>;
  histogram: Array<Histogram>;
  segmentations: DonutChartData;
  overview: TableData;
};
export type InsightResponse = {
  data: InsightItem;
};
export type InsightKpiResponse = { data: Array<KPI> };
export type InsightHistogramResponse = { data: Array<Histogram> };
export type InsightSegmentationResponse = { data: DonutChartData };
export type InsightTabularResponse = { data: TableData };

export type KPI = {
  title: string | null; // metric title
  subtitle?: string | null; // a prompt about what insight this metrics give
  value: number; // the value of the metric
  info: Info;
  unit: string | null; // the unit type like "%", "sec", "hours" or null if just a plain number
  data: Array<{
    // data array should have multiple array items
    //duration: string | number; // 7,
    duration: number;
    span: {
      title: string; // "Prev 7 days",
      unit: string | null; // "%",
      value: string | number; // 31,
      direction: 'up' | 'down';
    };
    median: {
      title: string; // "Prev 7 days",
      unit: string | null; // "%",
      value: string | number; // 31,
      direction: 'up' | 'down';
    };
  }>;
  sparkline: { date: Date; value: number }[]; //include 10 steps, may be utilize histogram[] data
};

type DonutChartData = {
  title: string | null; // User Segments & Location
  subtitle?: string | null; // "Who is using the app? And where do they use it?"
  info: Info;
  metrics: Array<{
    title: string | null; // "users"
    description?: string | null;
    subtitle?: string | null;
    data: Array<{ title: string; value: string | number }>;
  }>;
};

export type Histogram = {
  title: string | null; // "Active Users",
  subtitle: string | null; //  "How many people are using the app?",
  info: Info;
  unit: string | null; // like "%", "sec", "minutes"
  data: Array<{
    //DATA LAKE: each data point needs to generate pre day, prev 7 days, past 30 days trends
    datetime: string | Date; // "2021-08-11T13:06:89Z",
    value: number | null; // 1930,
    trends: {
      duration: number; // 7,
      span: {
        title: string; // "Prev 7 days",
        unit: string | null; // "%",
        value: string | number; // 31,
        direction: 'up' | 'down';
      };
      median: {
        title: string; // "Prev 7 days",
        unit: string | null; // "%",
        value: string | number; // 31,
        direction: 'up' | 'down';
      };
    };
  }>;
  options: {
    events: Array<Event>;
  };
};

type Event = {
  datetime: string;
  title: string;
  id: string; // "a-v90as0b9";
  descripton?: string | null;
  details?: string | null; // "if we have any";
};

type TableData = {
  title: string | null; // usage metrics  // ?? is this static or does it change when a new filter is selected
  // subtitle is derived from the selected metric type if blank
  subtitle?: string | null;
  info: Info;
  options: {
    curr_filter: string; // the current filter selected, it should title of one of the objects in the metric array
  };
  metrics: TableMetric[];
};

type TableMetric = {
  // expecting to have multiple metrics, one for each table to be displayed
  //id: maybe not  to match filters so that when we change selected value we can filter for the correct data set
  id: string;
  title: string;
  // subtitle: here this changes for each different filter selected
  subtitle?: string | null; // "What are our users viewing?"
  labels: Array<Record<string, string>>; // these are the table headers, the key is a slug, and the value is a display label
  data: Array<
    // data items are the individual rows that have a data item for each label
    | Record<string, string> // where key is the a slug, and value is the display label
    | Record<string, { value: string | number; unit: string | null }> // where key is the slug and value is an object with the metric value and the type of unit of that value
  >;
};

type Info = {
  description?: string | null; // brief description about the type of metric
  url?: string | null; // link to learn more about the metric type
};
