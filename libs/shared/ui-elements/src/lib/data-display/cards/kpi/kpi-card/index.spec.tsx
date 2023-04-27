import React from "react";
import { green, red } from "@mui/material/colors";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";


import KpiCard from '../kpi-card';
import { KpiCardProps } from "../types";

describe("KpiCard Component", () => {
  let props: KpiCardProps;
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
      }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render KpiCard component with correct values", () => {
    render(<KpiCard {...props} />);

    expect(screen.getByText(props.title.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(props.hero.toLocaleString("en-US"))).toBeInTheDocument();
    expect(screen.getByText(props.heroUnit.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(props.trends.span.title)).toBeInTheDocument();
    expect(screen.getByText(`${props.trends.span.value}${props.trends.span.unit}`)).toBeInTheDocument();
    expect(screen.getByText(props.trends.median.title)).toBeInTheDocument();
    expect(screen.getByText(`${props.trends.median.value}${props.trends.median.unit}`)).toBeInTheDocument();
  });

  describe("Up Down Icons", () => {
    test("should render KpiCard component with up arrow icon", () => {
        render(<KpiCard {...props} />);

        const upArrowIcon = screen.getByTestId("UpArrowOutwardIcon");
        expect(upArrowIcon).toBeTruthy();
        expect(upArrowIcon).toHaveStyle(`color: ${green[500]}`);
    });

    test("should render KpiCard component with up add icon", () => {
        props.trends.median.direction = "up";
        render(<KpiCard {...props} />);

        const downArrowIcon = screen.getByTestId("AddIcon");

        expect(downArrowIcon).toBeTruthy();
        expect(downArrowIcon).toHaveStyle(`color: ${green[500]}`);
    });

    test("should render KpiCard component with down arrow icon", () => {
        props.trends.span.direction = "down";

        render(<KpiCard {...props} />);

        const downArrowIcon = screen.getByTestId("DownArrowOutwardIcon");

        expect(downArrowIcon).toBeTruthy();
        expect(downArrowIcon).toHaveStyle(`color: ${red[500]}`);
    });

    test("should render KpiCard component with down remove icon", () => {
        render(<KpiCard {...props} />);

        const downArrowIcon = screen.getByTestId("RemoveIcon");

        expect(downArrowIcon).toBeTruthy();
        expect(downArrowIcon).toHaveStyle(`color: ${red[500]}`);
    });
  });

  describe("Tooltip Icon Render", () => {
    test("should render KpiCard component with tooltip icon", () => {
        render(<KpiCard {...props} />);

        const tooltipIcon = screen.getByTestId("InfoOutlinedIcon");

        expect(tooltipIcon).toBeInTheDocument();
    });
    test("should render KpiCard component without tooltip icon when tooltipDesc is not provided", () => {
        props.tooltip = undefined;
        render(<KpiCard {...props} />);
        
        expect(screen.queryByTestId("InfoOutlinedIcon")).not.toBeInTheDocument();
    });
  });

});