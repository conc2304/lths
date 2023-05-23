import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";


import { KpiSparklineCard, KpiSparklineCardProps } from './index';


describe("KpiSparklineCard Component", () => {
  let props: KpiSparklineCardProps;
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
      detail: { 
        url: "https://en.wikipedia.org/wiki/Retention",
      },
      sparkLine: <div data-testid="SparkLine">react Spark1 line</div>,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render KpiSparklineCard component with sparkline", () => {
    render(<KpiSparklineCard {...props} />);

    const sparkLineContainer = screen.getByTestId("SparkLineContainer");
    expect(sparkLineContainer).toBeInTheDocument();
    const sparkLine = screen.queryByTestId("SparkLine");
    expect(sparkLine).toBeInTheDocument();
  });

  test("should render KpiSparklineCard component without sparkline when not given one", () => {
    props.sparkLine = undefined;
    render(<KpiSparklineCard {...props} />);

    const sparkLineContainer = screen.getByTestId("SparkLineContainer");
    expect(sparkLineContainer).toBeInTheDocument();
    const sparkLine = screen.queryByTestId("SparkLine");
    expect(sparkLine).not.toBeInTheDocument();
  });

  test('renders the detail link in the KpiSparklineCard', () => {
    render(<KpiSparklineCard {...props} />);
    const link = screen.getByRole('link');
    expect(link).toHaveTextContent('VIEW DETAILS');
    expect(link).toHaveAttribute('href', props.detail.url);
  });

  test('does not render the detail link in the KpiSparklineCard', () => {
    props.action = undefined;
    render(<KpiSparklineCard {...props} />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });


  describe("KpiCard Render", () => {
    test("should render KpiCard component with correct data", () => {
        render(<KpiSparklineCard {...props} />);

        expect(screen.getByText(props.title.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(props.hero.toLocaleString("en-US"))).toBeInTheDocument();
        expect(screen.getByText(props.heroUnit.toUpperCase())).toBeInTheDocument();
        expect(screen.getByText(props.trends.span.title)).toBeInTheDocument();
        expect(screen.getByText(`${props.trends.span.value}${props.trends.span.unit}`)).toBeInTheDocument();
        expect(screen.getByText(props.trends.median.title)).toBeInTheDocument();
        expect(screen.getByText(`${props.trends.median.value}${props.trends.median.unit}`)).toBeInTheDocument();

    });

    test("should render KpiSparklineCard component with tooltip icon", () => {
        render(<KpiSparklineCard {...props} />);

        const tooltipIcon = screen.getByTestId("InfoOutlinedIcon");

        expect(tooltipIcon).toBeInTheDocument();
    });

    test("should render KpiSparklineCard component without tooltip icon when tooltipDesc is not provided", () => {
        props.tooltip = undefined;
        render(<KpiSparklineCard {...props} />);
        
        expect(screen.queryByTestId("InfoOutlinedIcon")).not.toBeInTheDocument();
    });
  });

});