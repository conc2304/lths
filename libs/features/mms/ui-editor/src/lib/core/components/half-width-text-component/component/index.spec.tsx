import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import HalfWidthTextComponent from './index';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';
import { HalfWidthTextComponentProps } from '../../types';

describe('HalfWidthTextComponent', () => {
  let props: HalfWidthTextComponentProps;

  beforeEach(() => {
    props = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.HalfWidthText,
      data: {
        btn_text: 'Map',
        description: 'Test description pizza tastes good',
        icon: "icon url",
        image: "iamge url",
        section: 'Section 206',
        sub_title: 'Pizza, Drinks',
        text_color: 'string',
        title: 'Anaheim Pizza Co',
        action: {
          type: 'native',
          page_id: 'map page',
          page_link: 'maplink',
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with default data', () => {
    render(<HalfWidthTextComponent {...props} />);
    const { title, sub_title, btn_text, description, section } = props.data;

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const subTitleElement = screen.getByText(sub_title);
    expect(subTitleElement).toBeInTheDocument();

    const btnTextElement = screen.getByText(btn_text);
    expect(btnTextElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();

    const sectionElement = screen.getByText(section);
    expect(sectionElement).toBeInTheDocument();
  });

  test('renders component with diffrent color', () => {
    props.data.text_color = 'rgb(235, 38, 38)';

    render(<HalfWidthTextComponent {...props} />);
    const { title, sub_title, description, section, text_color } = props.data;

    const titleElement = screen.getByText(title);
    expect(window.getComputedStyle(titleElement).color).toBe(text_color);

    const subTitleElement = screen.getByText(sub_title);
    expect(window.getComputedStyle(subTitleElement).color).toBe(text_color);

    const descriptionElement = screen.getByText(description);
    expect(window.getComputedStyle(descriptionElement).color).toBe(text_color);

    const sectionElement = screen.getByText(section);
    expect(window.getComputedStyle(sectionElement).color).toBe(text_color);
  });



  test('renders Component with card image and section icon', () => {
    render(<HalfWidthTextComponent {...props} />);
    const { image, icon } = props.data;

    const imgElement = screen.getByTestId("card_image");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', image);

    const iconElement = screen.getByTestId("section_icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('src', icon);
  });

  test('renders Component with no card image and section icon', () => {
    props.data.image = '';
    props.data.icon = '';
    render(<HalfWidthTextComponent {...props} />);

    const imgElement = screen.getByTestId("card_image");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).not.toHaveAttribute('src');

    const iconElement = screen.getByTestId("section_icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).not.toHaveAttribute('src');
  });
});
