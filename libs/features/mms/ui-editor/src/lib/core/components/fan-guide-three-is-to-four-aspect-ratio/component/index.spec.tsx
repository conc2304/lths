import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

import FanGuideThreeIsToFourAspectRatioComponent from './index';
import { FanGuideThreeIsToFourAspectRatioComponentProps } from '../../types';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';

describe("FanGuideThreeIsToFourAspectRatioComponent", () => {
    let props: FanGuideThreeIsToFourAspectRatioComponentProps;

    beforeEach(() => {
        props = {
            ...mockComponent,
            __ui_id__ : "3333333",
            component_id: Component.FanGuideThreeIsToFourAspectRatio,
            properties_data: {    
                image: 'https://i.im.ge/2022/10/13/2qHPSF.Image-1.png',
                img_alt_text: "image alth text name",
                title: 'Explore Honda Center',
                description: "description",
                btn_text: "button text",
                action: {
                    type: 'native',
                    page_id: 'explorehondacenter',
                    page_link: 'linkToExploreCenter',
                },
            }
        }
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with default data', () => {
    render(<FanGuideThreeIsToFourAspectRatioComponent {...props} />);
    const { title, description, btn_text } = props.properties_data;

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const descElement = screen.getByText(description);
    expect(descElement).toBeInTheDocument();

    const btnTextElement = screen.getByText(btn_text);
    expect(btnTextElement).toBeInTheDocument();
    // Component not interactable so action props not included
  });

  test('renders component with fan guide', () => {
    render(<FanGuideThreeIsToFourAspectRatioComponent {...props} />);
    const fanGuideElement = screen.getByText('FAN GUIDE');
    expect(fanGuideElement).toBeInTheDocument();
  });

  test('renders component with diffrent default data', () => {
    props.properties_data.title = `The cool title`
    props.properties_data.description = `The cool description`
    props.properties_data.btn_text = `The cool btn_text`

    render(<FanGuideThreeIsToFourAspectRatioComponent {...props} />);
    const { title, description, btn_text } = props.properties_data;

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const descElement = screen.getByText(description);
    expect(descElement).toBeInTheDocument();

    const btnTextElement = screen.getByText(btn_text);
    expect(btnTextElement).toBeInTheDocument();

  });

  test("renders Component with image", () => {
    render(<FanGuideThreeIsToFourAspectRatioComponent {...props} />);
    const {__ui_id__: id, properties_data: { image, img_alt_text }} = props;

    const imageElement = screen.getByAltText(img_alt_text);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', image);
    expect(imageElement).toHaveAttribute('alt', img_alt_text);
  });

});