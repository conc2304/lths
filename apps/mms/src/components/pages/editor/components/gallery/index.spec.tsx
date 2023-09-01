import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { ComponentProps } from '@lths/features/mms/ui-editor';

import ComponentGallery from './';

describe('ComponentGallery', () => {
  const mockComponents: ComponentProps[] = [
    {
      __ui_id__: 'ui_id_1',
      _id: 'id_1',
      component_id: 'comp_id_1',
      name: 'Component 1',
      description: 'Description 1',
      image_url: 'image_url_1',
      default_data: undefined,
      schema: {},
      display_order: 0,
      variation_id: '',
    },
    {
      __ui_id__: 'ui_id_2',
      _id: 'id_2',
      component_id: 'comp_id_2',
      name: 'Component 2',
      description: 'Description 2',
      image_url: 'image_url_2',
      default_data: undefined,
      schema: {},
      display_order: 0,
      variation_id: '',
    },
  ];

  it('should render component cards', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<ComponentGallery components={mockComponents} onSelect={onSelect} />);

    // Check if component names are rendered
    const component1 = getByText('Component 1');
    const component2 = getByText('Component 2');

    expect(component1).toBeInTheDocument();
    expect(component2).toBeInTheDocument();
  });

  it('should call onSelect when a component card is clicked', () => {
    const onSelect = jest.fn();
    const { getByText } = render(<ComponentGallery components={mockComponents} onSelect={onSelect} />);

    const component1 = getByText('Component 1');
    fireEvent.click(component1);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('comp_id_1');
  });
});
