import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import PromotionOneIsToOneAspectRatioComponent from './index';
import { PromotionOneIsToOneAspectRatioComponentProps } from '../../types';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';

describe('PromotionOneIsToOneAspectRatioComponent', () => {
  let props: PromotionOneIsToOneAspectRatioComponentProps;

  beforeEach(() => {
    props = {
      ...mockComponent,
      __ui_id__: '3333333',
      component_id: Component.PromotionOneIsToOneAspectRatio,
      data: {
        image: 'https://i.im.ge/2022/10/13/2qHPSF.Image-1.png',
        img_alt_text: 'image alth text name',
        title: 'Explore Honda Center',
        description: 'mock description',
        btn_text: 'button text',
        action: {
          type: 'native',
          page_id: 'explorehondacenter',
          page_link: 'linkToExploreCenter',
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with default data', () => {
    render(<PromotionOneIsToOneAspectRatioComponent {...props} />);
    const { btn_text } = props.data;

    const btnTextElement = screen.getByText(btn_text);
    expect(btnTextElement).toBeInTheDocument();
    // Component not interactable so action props not included
  });

  test('renders component with diffrent default data', () => {
    props.data.btn_text = `The cool btn_text`;

    render(<PromotionOneIsToOneAspectRatioComponent {...props} />);
    const { btn_text } = props.data;

    const btnTextElement = screen.getByText(btn_text);
    expect(btnTextElement).toBeInTheDocument();
  });

  test('renders Component with background image', () => {
    render(<PromotionOneIsToOneAspectRatioComponent {...props} />);
    const {
      data: { image, img_alt_text },
    } = props;

    const backgroundImageElement = screen.getByLabelText(img_alt_text);
    expect(backgroundImageElement).toBeInTheDocument();

    const styles = window.getComputedStyle(backgroundImageElement);

    expect(styles.backgroundImage).toBe(`url(${image})`);
  });

  test('background image has one is to one aspect ratio', () => {
    render(<PromotionOneIsToOneAspectRatioComponent {...props} />);
    const {
      data: { img_alt_text },
    } = props;

    const backgroundImageElement = screen.getByLabelText(img_alt_text);
    // const styles = window.getComputedStyle(backgroundImageElement);

    expect(backgroundImageElement.clientWidth).toBe(backgroundImageElement.clientHeight);
  });
});
