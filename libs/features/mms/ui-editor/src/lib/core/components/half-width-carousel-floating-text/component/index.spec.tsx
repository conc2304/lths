import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import HalfWidthCarouselFloatingTextComponent from './index';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';
import { HalfWidthCarouselFloatingTextComponentProps } from '../../types';

describe('HalfWidthCarouselFloatingTextComponent', () => {
  let props: HalfWidthCarouselFloatingTextComponentProps;

  beforeEach(() => {
    props = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.HalfWidthCarouselFloatingText,
      data: {
        sub_component_data: [
          {
            name: 'Carousel Name 1',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-1.png',
            img_alt_text: 'ImageAlt1',
            title: 'A Title 1',
            action: { type: '', page_id: '', page_link: '' },
          },
          {
            name: 'Carousel Name 2',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-2.png',
            img_alt_text: 'ImageAlt2',
            title: 'A Title 2',
            action: { type: '', page_id: '', page_link: '' },
          },
          {
            name: 'Carousel Name 3',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-3.png',
            img_alt_text: 'ImageAlt3',
            title: 'A Title 3',
            action: { type: '', page_id: '', page_link: '' },
          },
          {
            name: 'Carousel Name 4',
            image: 'https://i.im.ge/2023/03/21/DVJcSM.Image-4.png',
            img_alt_text: 'ImageAlt4',
            title: 'A Title 4',
            action: { type: '', page_id: '', page_link: '' },
          },
        ],
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with default data', () => {
    render(<HalfWidthCarouselFloatingTextComponent {...props} />);
    const { sub_component_data } = props.data;

    sub_component_data.forEach(({ title }) => {
      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();
    });
  });

  test('renders component with diffrent default data', () => {
    props.data.sub_component_data.forEach((item, index) => {
      props.data.sub_component_data[index].title = `The cool title ${index}`;
    });

    render(<HalfWidthCarouselFloatingTextComponent {...props} />);
    const { sub_component_data } = props.data;

    sub_component_data.forEach(({ title }) => {
      const titleElement = screen.getByText(title);
      expect(titleElement).toBeInTheDocument();
    });
  });

  test('renders Component with background image', () => {
    render(<HalfWidthCarouselFloatingTextComponent {...props} />);
    const { sub_component_data } = props.data;

    sub_component_data.forEach(({ img_alt_text, image }) => {
      const imgElement = screen.getByAltText(img_alt_text);

      // Assert that the img element is found and has correct src
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', image);
      expect(imgElement).toHaveAttribute('alt', img_alt_text);
    });
  });

  test('renders Component with no background image', () => {
    props.data.sub_component_data.forEach((item, index) => {
      // only change even
      if (index % 2 === 2) props.data.sub_component_data[index].image = '';
    });
    render(<HalfWidthCarouselFloatingTextComponent {...props} />);
    const { sub_component_data } = props.data;

    sub_component_data.forEach(({ img_alt_text, image }) => {
      const imgElement = screen.getByAltText(img_alt_text);

      // Assert that the img element is found and has correct src
      expect(imgElement).toBeInTheDocument();
      if (image === '') {
        expect(imgElement).not.toHaveAttribute('src');
        expect(imgElement).toHaveAttribute('alt', img_alt_text);
      } else {
        expect(imgElement).toHaveAttribute('src', image);
        expect(imgElement).toHaveAttribute('alt', img_alt_text);
      }
    });
  });
});
