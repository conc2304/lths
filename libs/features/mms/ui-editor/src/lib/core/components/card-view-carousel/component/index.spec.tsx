import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CardViewCarouselComponent from './index';
import mockComponentProps from '../../../../context/mock-data';
import { Component } from '../../enum';
import { CardViewCarouselComponentProps } from '../../types';

describe('CardViewCarouselComponent', () => {
  let props: CardViewCarouselComponentProps;

  beforeEach(() => {
    props = {
      ...mockComponentProps,
      __ui_id__: '3333333',
      component_id: Component.CardViewCarousel,
      data: {
        sub_component_data: [
          {
            image: 'https://Image-1.png',
            action: { type: 'webview', page_id: 'pageId1', page_link: 'pageLink1' },
          },
          {
            image: 'https://Image-2.png',
            action: { type: 'webview', page_id: 'pageId2', page_link: 'pageLink2' },
          },
          {
            image: 'https://Image-3.png',
            action: { type: 'native', page_id: 'pageId3', page_link: 'pageLink3' },
          },
          {
            image: 'https://Image-4.png',
            action: { type: 'native', page_id: 'pageId4', page_link: 'pageLink4' },
          },
        ],
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Component with background image', () => {
    render(<CardViewCarouselComponent {...props} />);
    const { sub_component_data } = props.data;

    sub_component_data.forEach(({ image }, index) => {
      const imgElement = screen.getByLabelText(`image ${index}`);

      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute('src', image);
    });
  });

  test('renders Component with no background image', () => {
    props.data.sub_component_data.forEach((item, index) => {
      // only change even
      if (index % 2 === 2) props.data.sub_component_data[index].image = '';
    });
    render(<CardViewCarouselComponent {...props} />);
    const { sub_component_data } = props.data;

    sub_component_data.forEach(({ image }, index) => {
      const imgElement = screen.getByLabelText(`image ${index}`);

      // Assert that the img element is found and has correct src
      expect(imgElement).toBeInTheDocument();
      if (image === '') {
        expect(imgElement).not.toHaveAttribute('src');
      } else {
        expect(imgElement).toHaveAttribute('src', image);
      }
    });
  });
});
