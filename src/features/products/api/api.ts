import { httpClient } from '../../../services/http';
import {
  ProductsResponse,
  ProductsResponseSchema,
  DeleteProductResponse,
  DeleteProductResponseSchema,
} from '../../../utils/types';

/**
 * Fetch all products
 */
export const fetchAllProducts = async (): Promise<ProductsResponse> => {
  const response = await httpClient.get<ProductsResponse>('/products');

  // Validate response with Zod in development
  if (__DEV__) {
    ProductsResponseSchema.parse(response.data);
  }

  return response.data;
};

/**
 * Fetch products by category
 */
export const fetchProductsByCategory = async (
  category: string
): Promise<ProductsResponse> => {
  const response = await httpClient.get<ProductsResponse>(
    `/products/category/${category}`
  );

  // Validate response with Zod in development
  if (__DEV__) {
    ProductsResponseSchema.parse(response.data);
  }

  return response.data;
};

/**
 * Delete a product (simulated, returns isDeleted flag)
 */
export const deleteProduct = async (
  id: number
): Promise<DeleteProductResponse> => {
  const response = await httpClient.delete<DeleteProductResponse>(
    `/products/${id}`
  );

  // Validate response with Zod in development
  if (__DEV__) {
    DeleteProductResponseSchema.parse(response.data);
  }

  return response.data;
};
