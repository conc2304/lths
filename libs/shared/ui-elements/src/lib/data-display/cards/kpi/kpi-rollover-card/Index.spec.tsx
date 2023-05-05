import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";


import { KpiRolloverCard, KpiRolloverCardProps } from './index';

const roloverDataList = [	
    {	
      duration: 7,	
      span: {	
        title: "Prev 7 days",	
        unit: "%",	
        value: 31,	
        direction: "up"	
      },	
      median: {	
        title: "Median",	
        unit: "%",	
        value: 1,	
        direction: "down"
      }	    
    },
    {	
      duration: 30,	
      span: {	
        title: "Prev 30 days",	
        unit: "%",	
        value: 27,	
        direction: "up"	
      },	
      median: {	
        title: "Median",	
        unit: "%",	
        value: 3,	
        direction: "down"	
      }	
    },	
  ]

describe("KpiRolloverCard Component", () => {
  let props: KpiRolloverCardProps;
  beforeEach(() => {
    props = {
      title: "Revenue",
      hero: 1000,
      heroUnit: "%",
      trends: {
        duration: 7,
        span: {
          title: "Last 7 days",
          unit: "%",
          value: 50,
          direction: "up",
        },
        median: {
          title: "Median",
          unit: "%",
          value: 25,
          direction: "down",
        },
      },
      tooltip: { 
        description: "The ratio of users who return to continue using the app. If retention is low, it means that users are not engaging with the app and steps must be taken to attract usage.",
        action: { 
          url: "https://en.wikipedia.org/wiki/Retention",
          title: "Learn More",
        }, 
        title: "Retention"
      },
      sparkLine: <div data-testid="SparkLine">react Spark1 line</div>,
      rolloverData: roloverDataList,
      rolloverTitle: "Retention Average",
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render KpiRolloverCard component with sparkline", () => {
    render(<KpiRolloverCard {...props} />);

    const sparkLineContainer = screen.getByTestId("SparkLineContainer");
    expect(sparkLineContainer).toBeInTheDocument();
    const sparkLine = screen.queryByTestId("SparkLine");
    expect(sparkLine).toBeInTheDocument();
  });

  test("should render KpiRolloverCard component without sparkline when not given one", () => {
    props.sparkLine = undefined;
    render(<KpiRolloverCard {...props} />);

    const sparkLineContainer = screen.getByTestId("SparkLineContainer");
    expect(sparkLineContainer).toBeInTheDocument();
    const sparkLine = screen.queryByTestId("SparkLine");
    expect(sparkLine).not.toBeInTheDocument();
  });

  describe("KpiCard Render", () => {
    test("should render KpiCard component with correct data", () => {
        render(<KpiRolloverCard {...props} />);

        expect(screen.getByText(props.title.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(props.hero.toLocaleString("en-US"))).toBeInTheDocument();
        expect(screen.getByText(props.heroUnit.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(props.trends.span.title)).toBeInTheDocument();
        expect(screen.getByText(`${props.trends.span.value}${props.trends.span.unit}`)).toBeInTheDocument();
        expect(screen.getByText(props.trends.median.title)).toBeInTheDocument();
        expect(screen.getByText(`${props.trends.median.value}${props.trends.median.unit}`)).toBeInTheDocument();

    });

    test("should render KpiRolloverCard component with tooltip icon", () => {
        render(<KpiRolloverCard {...props} />);

        const tooltipIcon = screen.getByTestId("InfoOutlinedIcon");

        expect(tooltipIcon).toBeInTheDocument();
    });

    test("should render KpiRolloverCard component without tooltip icon when tooltipDesc is not provided", () => {
        props.tooltip = undefined;
        render(<KpiRolloverCard {...props} />);
        
        expect(screen.queryByTestId("InfoOutlinedIcon")).not.toBeInTheDocument();
    });
  });

});