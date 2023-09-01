import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import QuicklinkButtonGroupComponent from './index';
import { QuicklinkButtonGroupComponentProps, QuicklinkButton } from '../../types';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';

describe('QuicklinkButtonGroupComponent', () => {
  let props: QuicklinkButtonGroupComponentProps;

  beforeEach(() => {
    props = {
      ...mockComponent,
      __ui_id__: '3333333',
      component_id: Component.QuicklinkButtonGroup,
      data: {
        first_button: {
          label: 'Medical Help',
          icon: 'https://i.im.ge/2022/12/05/S82BeW.Group.png',
          icon_alt_text: '',
          action: {
            type: '',
            page_id: 'medical page',
            page_link: 'first aid link',
          },
        },
        second_button: {
          label: 'Report',
          icon: 'https://i.im.ge/2022/12/05/S824gr.Group.png',
          icon_alt_text: '',
          action: {
            type: '',
            page_id: 'report crime',
            page_link: 'local police department link',
          },
        },
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with default data', () => {
    render(<QuicklinkButtonGroupComponent {...props} />);
    const { first_button, second_button } = props.data;

    const firstlabelElement = screen.getByText(first_button.label);
    expect(firstlabelElement).toBeInTheDocument();

    const secondlabelElement = screen.getByText(second_button.label);
    expect(secondlabelElement).toBeInTheDocument();
  });

  test('renders component with diffrent default data', () => {
    props.data.first_button.label = `The cool label 1`;
    props.data.first_button.icon = `The cool icon 1`;
    props.data.second_button.label = `The cool label 2`;
    props.data.second_button.icon = `The cool icon 2`;

    render(<QuicklinkButtonGroupComponent {...props} />);
    const { first_button, second_button } = props.data;

    const firstlabelElement = screen.getByText(first_button.label);
    expect(firstlabelElement).toBeInTheDocument();

    const secondlabelElement = screen.getByText(second_button.label);
    expect(secondlabelElement).toBeInTheDocument();
  });

  test('renders Component with icons', () => {
    render(<QuicklinkButtonGroupComponent {...props} />);
    const { first_button, second_button } = props.data;
    const firstImageAlt = first_button.label + '_icon';
    const secondImageAlt = second_button.label + '_icon';

    const firstIconElement = screen.getByAltText(firstImageAlt);
    const secondIconElement = screen.getByAltText(secondImageAlt);

    expect(firstIconElement).toBeInTheDocument();
    expect(firstIconElement).toHaveAttribute('src', first_button.icon);
    expect(firstIconElement).toHaveAttribute('alt', firstImageAlt);

    expect(secondIconElement).toBeInTheDocument();
    expect(secondIconElement).toHaveAttribute('src', second_button.icon);
    expect(secondIconElement).toHaveAttribute('alt', secondImageAlt);
  });
});
