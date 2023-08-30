import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import CategorySection from './';

describe('CategorySection', () => {
  const mockCategories = [
    { display_order: 1, name: 'Category 1', value: 'category1' },
    { display_order: 2, name: 'Category 2', value: 'category2' },
  ];

  it('should render category buttons', () => {
    const onSelectCategory = jest.fn();
    const { getByText } = render(
      <CategorySection categories={mockCategories} selectedCategory="category1" onSelectCategory={onSelectCategory} />
    );

    // Check if category names are rendered. Use a regex with the 'i' flag to do a (case-insensitive) search
    const category1 = getByText(/CATEGORY 1/i);
    const category2 = getByText(/Category 2/i);

    expect(category1).toBeInTheDocument();
    expect(category2).toBeInTheDocument();
  });

  it('should call onSelectCategory when a category button is clicked', () => {
    const onSelectCategory = jest.fn();
    const { getByText } = render(
      <CategorySection categories={mockCategories} selectedCategory="category1" onSelectCategory={onSelectCategory} />
    );

    const category2 = getByText(/Category 2/i);
    fireEvent.click(category2);

    // Expect the onSelectCategory function to be called with the correct category value
    expect(onSelectCategory).toHaveBeenCalledTimes(1);
    expect(onSelectCategory).toHaveBeenCalledWith('category2');
  });
});
