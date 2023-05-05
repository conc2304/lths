import React from "react";
import { green, red } from "@mui/material/colors";
import { RBThemeProvider, RBTheme } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

import { KpiCard } from '../kpi-card';
import { KpiCardProps } from "../types";

describe("KpiCard Component", () => {
  let component: JSX.Element;
  let props: KpiCardProps;
  beforeEach(() => {
    // Set up the props for each test case
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
    // Set up the props for each test case
    jest.clearAllMocks();
  });

  test("should render KpiCard component with correct values", () => {
    render(<KpiCard {...props} />);

    // Assert that the expected elements are rendered with the correct values
    expect(screen.getByText(props.title.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(props.hero.toLocaleString("en-US"))).toBeInTheDocument();
    expect(screen.getByText(props.heroUnit.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(props.trends.span.title)).toBeInTheDocument();
    expect(screen.getByText(`${props.trends.span.value}${props.trends.span.unit}`)).toBeInTheDocument();
    expect(screen.getByText(props.trends.median.title)).toBeInTheDocument();
    expect(screen.getByText(`${props.trends.median.value}${props.trends.median.unit}`)).toBeInTheDocument();
    const hrElement = screen.getByRole("separator");
    expect(hrElement).toBeInTheDocument();
  });

  test("should render KpiCard component without median if no median in trends", () => {
    props.trends.median = undefined;
    render(<KpiCard {...props} />);

    // Assert that second trend for median is not rendered
    expect(screen.queryByLabelText("AddIcon")).not.toBeInTheDocument();;
    expect(screen.queryByLabelText("RemoveIcon")).not.toBeInTheDocument();;
    const hrElement = screen.queryByRole("separator");
    expect(hrElement).not.toBeInTheDocument();
  });


  describe("Hero Units", () => {
    test("should render KpiCard component without heroUnit", () => {
      props.heroUnit = undefined;
      render(<KpiCard {...props} />);
      const heroUnit = screen.queryByLabelText("HeroUnit");

      // Assert that the hero unit is not rendered when heroUnit is undefined
      expect(heroUnit).not.toBeInTheDocument();;
     });

     test("should render KpiCard component heroUnit with diffrent style when hero unit length equal to 1", () => {
      props.heroUnit = "%";

      component = (<KpiCard {...props} />);
      render(RBThemeProvider({ children: component }));

      const heroUnit = screen.getByLabelText("HeroUnit");

      // Assert that the hero unit has the expected styles when the length is equal to 1
      expect(heroUnit).toBeTruthy();
      expect(heroUnit).toHaveStyle(`
        font-size: ${RBTheme.spacing(6)};
        font-weight: 500;
      `);

     });

     test("should render KpiCard component heroUnit with diffrent style when hero unit length greater than 1", () => {
      props.heroUnit = "SECS";

      component = (<KpiCard {...props} />);
      render(RBThemeProvider({ children: component }));

      const heroUnit = screen.getByLabelText("HeroUnit");

      // Assert that the hero unit has the expected styles when the length is greater than 1
      expect(heroUnit).toBeTruthy();
      expect(heroUnit).toHaveStyle(`
        font-size: ${RBTheme.spacing(1.75)};
        padding-left: ${RBTheme.spacing(1)};
      `);

     });
  });

  describe("Up Down Icons", () => {
    test("should render KpiCard component with up arrow icon", () => {
      render(<KpiCard {...props} />);
      const upArrowIcon = screen.getByLabelText("UpArrowOutwardIcon");

      // Assert that the up arrow icon is rendered with the correct style
      expect(upArrowIcon).toBeTruthy();
      expect(upArrowIcon).toHaveStyle(`color: ${green[500]}`);
    });

    test("should render KpiCard component with up add icon", () => {
      props.trends.median.direction = "up";
      render(<KpiCard {...props} />);

      const downArrowIcon = screen.getByLabelText("AddIcon");

      // Assert that the up add icon is rendered with the correct style
      expect(downArrowIcon).toBeTruthy();
      expect(downArrowIcon).toHaveStyle(`color: ${green[500]}`);
    });

    test("should render KpiCard component with down arrow icon", () => {
      props.trends.span.direction = "down";

      render(<KpiCard {...props} />);

      const downArrowIcon = screen.getByLabelText("DownArrowOutwardIcon");

      // Assert that the down arrow icon is rendered with the correct style
      expect(downArrowIcon).toBeTruthy();
      expect(downArrowIcon).toHaveStyle(`color: ${red[500]}`);
    });

    test("should render KpiCard component with down remove icon", () => {
      render(<KpiCard {...props} />);

      const downArrowIcon = screen.getByLabelText("RemoveIcon");

      // Assert that the down remove icon is rendered with the correct style
      expect(downArrowIcon).toBeTruthy();
      expect(downArrowIcon).toHaveStyle(`color: ${red[500]}`);
    });
  });

  describe("Tooltip Icon Render", () => {
    test("should render KpiCard component with tooltip icon", () => {
      render(<KpiCard {...props} />);

      const tooltipIcon = screen.getByTestId("InfoOutlinedIcon");

      // Assert that the tooltip icon is rendered
      expect(tooltipIcon).toBeInTheDocument();
    });
    test("should render KpiCard component without tooltip icon when tooltip is not provided", () => {
      props.tooltip = undefined;
      render(<KpiCard {...props} />);
      
      // Assert that the tooltip icon is not rendered when tooltip is undefined
      expect(screen.queryByTestId("InfoOutlinedIcon")).not.toBeInTheDocument();
    });

    test("should render KpiCard component without tooltip icon when tooltip title and description not provided", () => {
      props.tooltip.title = undefined;
      props.tooltip.description = undefined;
      render(<KpiCard {...props} />);
      
      // Assert that the tooltip icon is not rendered when tooltip is undefined
      expect(screen.queryByTestId("InfoOutlinedIcon")).not.toBeInTheDocument();
    });
  });

});