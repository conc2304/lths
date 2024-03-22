import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ExternalDataToolbar from './index';
import { Component } from '../../enum';

describe('ExternalData Toolbar', () => {
  let props: { id: string; title: string; desc: string; component_id: string };

  beforeEach(() => {
    props = {
      id: '33333',
      component_id: Component.HeroEvent,
      title: 'Event',
      desc: 'Get Data from cloud.',
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders toolbar component', () => {
    render(
        <ExternalDataToolbar {...props}/>
    );
    const toolLabel = props.component_id + ' Toolbar'
    const renderToolContainer = screen.getByLabelText(toolLabel);
    expect(renderToolContainer).toBeInTheDocument();
  });

  test('renders toolbar with props', () => {
    render(
        <ExternalDataToolbar {...props}/>
    );

    // Assert
    const toolbarlabel = screen.getByText(props.title);
    expect(toolbarlabel).toBeInTheDocument();

    const descLabel = screen.getByText(props.desc);
    expect(descLabel).toBeInTheDocument();
  });

  test('renders toolbar with diffrent props', () => {
    props.title = "Cool Toobar"
    props.desc = "Data is from the sky"
    render(
        <ExternalDataToolbar {...props}/>
    );

    // Assert
    const toolbarlabel = screen.getByText(props.title);
    expect(toolbarlabel).toBeInTheDocument();

    const descLabel = screen.getByText(props.desc);
    expect(descLabel).toBeInTheDocument();
  });
});