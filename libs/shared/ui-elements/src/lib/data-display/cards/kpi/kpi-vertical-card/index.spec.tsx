import React from "react";
import { green, red } from "@mui/material/colors";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

import KpiVerticalCard from './index';
import { KpiCardProps } from "../kpi-card/types";

describe("KpiVerticalCard Component", () => {
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
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render KpiVerticalCard component with correct values", () => {
    render(<KpiVerticalCard {...props} />);

    expect(screen.getByText(props.title.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(props.hero.toLocaleString("en-US"))).toBeInTheDocument();
    expect(screen.getByText(props.heroUnit.toUpperCase())).toBeInTheDocument();
    expect(screen.getByText(props.trends.span.title)).toBeInTheDocument();
    expect(screen.getByText(`${props.trends.span.value}${props.trends.span.unit}`)).toBeInTheDocument();
  });

  describe("Up Down Icons", () => {
    test("should render KpiVerticalCard component with up arrow icon", () => {
        render(<KpiVerticalCard {...props} />);

        const upArrowIcon = screen.getByTestId("UpArrowOutwardIcon");
        expect(upArrowIcon).toBeTruthy();
        expect(upArrowIcon).toHaveStyle(`color: ${green[500]}`);
    });

    test("should render KpiVerticalCard component with down arrow icon", () => {
        props.trends.span.direction = "down";

        render(<KpiVerticalCard {...props} />);

        const downArrowIcon = screen.getByTestId("DownArrowOutwardIcon");

        expect(downArrowIcon).toBeTruthy();
        expect(downArrowIcon).toHaveStyle(`color: ${red[500]}`);
    });
  });
});