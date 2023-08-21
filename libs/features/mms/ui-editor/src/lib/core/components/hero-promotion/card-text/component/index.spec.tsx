import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

import CardText from './index';
import { CardTextComponentProps } from '../../../types';
import mockComponent from '../../../../../context/mockdata';
import { Component } from '../../../enum';

describe("HeroPromotion: CardText", () => {
    let props: CardTextComponentProps;

    beforeEach(() => {
        props = {
            ...mockComponent,
            __ui_id__ : "3333333",
            component_id: Component.HeroPromotionCardText,
            properties_data: {    
                image: 'https://i.im.ge/2022/10/13/2qHPSF.Image-1.png',
                img_alt_text: "image alth text name",
                title: 'Explore Honda Center',
                description: "Best description",
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
    render(<CardText {...props} />);
    const { title, description } = props.properties_data;

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const descElement = screen.getByText(description);
    expect(descElement).toBeInTheDocument();

  });

  test('renders component with diffrent default data', () => {
    props.properties_data.title = `The cool title`
    props.properties_data.description = `The cool description`

    render(<CardText {...props} />);
    const { title, description } = props.properties_data;

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();

    const descElement = screen.getByText(description);
    expect(descElement).toBeInTheDocument();

  });

  test("renders Component with image", () => {
    render(<CardText {...props} />);
    const {__ui_id__: id, properties_data: { image, img_alt_text }} = props;

    const imageElement = screen.getByAltText(img_alt_text);

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', image);
    expect(imageElement).toHaveAttribute('alt', img_alt_text);
  });

});