import React from 'react';
import { render } from '@testing-library/react-native';
import { ProductItem } from '../../src/features/products/components/ProductItem';
import { Product } from '../../src/utils/types';

describe('ProductItem', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'Test description',
    price: 99.99,
    category: 'smartphones',
    thumbnail: 'https://example.com/image.jpg',
  };

  it('renders product title and category correctly', () => {
    const { getByText } = render(<ProductItem product={mockProduct} />);

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('smartphones')).toBeTruthy();
  });

  it('does not show delete button by default', () => {
    const { queryByText } = render(<ProductItem product={mockProduct} />);

    expect(queryByText('Delete')).toBeNull();
  });

  it('shows delete button when showDelete is true', () => {
    const mockDelete = jest.fn();
    const { getByText } = render(
      <ProductItem product={mockProduct} showDelete onDelete={mockDelete} />
    );

    expect(getByText('Delete')).toBeTruthy();
  });
});
