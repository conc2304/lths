import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

import QuicklinkButtonGroupComponent from './index';
import mockComponent from '../../../../context/mockdata';
import { Component } from '../../enum';
import { QuicklinkButtonGroupComponentProps } from '../../types';

describe("QuicklinkButtonGroupComponent", () => {
    let props: QuicklinkButtonGroupComponentProps;

    beforeEach(() => {
      props = {
          ...mockComponent,
          __ui_id__ : "3333333",
          component_id: Component.QuicklinkButtonGroup,
          properties_data: {    
            sub_properties_data: [
              {
                card_background_color: "",
                icon: "nonexistent png",
                text_color: "",
                title: "LABEL",
                action: {
                  type: 'webview',
                  page_id: 'medical page',
                  page_link: 'first aid link',
                },
              },
              {
                card_background_color: "",
                icon: "nonexistent png 2",
                text_color: "",
                title: "LABEL2",
                action: {
                  type: 'webview',
                  page_id: 'report crime',
                  page_link: 'local police department link',
                },
              }
            ],
          }
      }
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders component with default data', () => {
    render(<QuicklinkButtonGroupComponent {...props} />);
    const { sub_properties_data } = props.properties_data;

    const firstlabelElement = screen.getByText(sub_properties_data[0].title);
    expect(firstlabelElement).toBeInTheDocument();

    const secondlabelElement = screen.getByText(sub_properties_data[1].title);
    expect(secondlabelElement).toBeInTheDocument();

  });

  test('renders component with diffrent default data', () => {
    props.properties_data.sub_properties_data[0].title = `The cool label 1`
    props.properties_data.sub_properties_data[0].icon = `The cool icon 1`
    props.properties_data.sub_properties_data[1].title = `The cool label 2`
    props.properties_data.sub_properties_data[1].icon = `The cool icon 2`

    render(<QuicklinkButtonGroupComponent {...props} />);
    const { sub_properties_data } = props.properties_data;

    const firstlabelElement = screen.getByText(sub_properties_data[0].title);
    expect(firstlabelElement).toBeInTheDocument();

    const secondlabelElement = screen.getByText(sub_properties_data[1].title);
    expect(secondlabelElement).toBeInTheDocument();

  });

  test("renders Component with icons", () => {
    render(<QuicklinkButtonGroupComponent {...props} />);
    const { sub_properties_data } = props.properties_data;
    const firstImageAlt = sub_properties_data[0].title + "_icon";
    const secondImageAlt = sub_properties_data[1].title + "_icon";

    const firstIconElement = screen.getByAltText(firstImageAlt);
    const secondIconElement = screen.getByAltText(secondImageAlt);

    expect(firstIconElement).toBeInTheDocument();
    expect(firstIconElement).toHaveAttribute('src', sub_properties_data[0].icon);
    expect(firstIconElement).toHaveAttribute('alt', firstImageAlt);

    expect(secondIconElement).toBeInTheDocument();
    expect(secondIconElement).toHaveAttribute('src', sub_properties_data[1].icon);
    expect(secondIconElement).toHaveAttribute('alt', secondImageAlt);
  });

});