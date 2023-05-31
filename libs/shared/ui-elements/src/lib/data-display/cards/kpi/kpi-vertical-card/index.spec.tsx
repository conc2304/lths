import React from "react";
import { green, red } from "@mui/material/colors";
import { RBThemeProvider, RBTheme } from '@lths-mui/shared/themes';
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

import KpiVerticalCard from './index';
import { KpiCardProps } from "../types";

describe("KpiVerticalCard Component", () => {
  let component: JSX.Element;
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

  describe("Hero Units", () => {
    test("should render KpiVerticalCard component without heroUnit", () => {
      props.heroUnit = undefined;
      render(<KpiVerticalCard {...props} />);
      const heroUnit = screen.queryByLabelText("HeroUnit");

      expect(heroUnit).not.toBeInTheDocument();;
     });

     test("should render KpiVerticalCard component heroUnit with diffrent style when hero unit length equal to 1", () => {
      props.heroUnit = "%";

      component = (<KpiVerticalCard {...props} />);
      render(RBThemeProvider({ children: component }));

      const heroUnit = screen.getByLabelText("HeroUnit");

      expect(heroUnit).toBeTruthy();
      expect(heroUnit).toHaveStyle(`
        font-size: ${RBTheme.spacing(6)};
        font-weight: 500;
      `);

     });

     test("should render KpiCard component heroUnit with diffrent style when hero unit length greater than 1", () => {
      props.heroUnit = "SECS";

      component = (<KpiVerticalCard {...props} />);
      render(RBThemeProvider({ children: component }));

      const heroUnit = screen.getByLabelText("HeroUnit");

      expect(heroUnit).toBeTruthy();
      expect(heroUnit).toHaveStyle(`
        font-size: ${RBTheme.spacing(1.75)};
        padding-left: ${RBTheme.spacing(1)};
      `);

     });
  });

  describe("Up Down Icons", () => {
    test("should render KpiVerticalCard component with up arrow icon", () => {
        render(<KpiVerticalCard {...props} />);

        const upArrowIcon = screen.getByLabelText("UpArrowOutwardIcon");
        expect(upArrowIcon).toBeTruthy();
        expect(upArrowIcon).toHaveStyle(`color: ${green[500]}`);
    });

    test("should render KpiVerticalCard component with down arrow icon", () => {
        props.trends.span.direction = "down";

        render(<KpiVerticalCard {...props} />);

        const downArrowIcon = screen.getByLabelText("DownArrowOutwardIcon");

        expect(downArrowIcon).toBeTruthy();
        expect(downArrowIcon).toHaveStyle(`color: ${red[500]}`);
    });
  });
});