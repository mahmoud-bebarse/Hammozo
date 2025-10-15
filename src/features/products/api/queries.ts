import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAllProducts, fetchProductsByCategory, deleteProduct } from './api';
import { CHOSEN_CATEGORY } from '../../../utils/constants';
import { Product } from '../../../utils/types';

// Query keys
export const productKeys = {
  all: ['products', 'all'] as const,
  category: (category: string) => ['products', 'category', category] as const,
};

/**
 * Hook to fetch all products
 */
export const useAllProducts = () => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: fetchAllProducts,
  });
};

/**
 * Hook to fetch products by category
 */
export const useCategoryProducts = (category: string = CHOSEN_CATEGORY) => {
  return useQuery({
    queryKey: productKeys.category(category),
    queryFn: () => fetchProductsByCategory(category),
  });
};

/**
 * Hook to delete a product (superadmin only)
 */
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onMutate: async (productId: number) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: productKeys.all });

      // Snapshot previous value
      const previousProducts = queryClient.getQueryData(productKeys.all);

      // Optimistically update cache
      queryClient.setQueryData(productKeys.all, (old: any) => {
        if (!old?.products) return old;
        return {
          ...old,
          products: old.products.filter((p: Product) => p.id !== productId),
          total: old.total - 1,
        };
      });

      return { previousProducts };
    },
    onError: (_err, _productId, context) => {
      // Rollback on error
      if (context?.previousProducts) {
        queryClient.setQueryData(productKeys.all, context.previousProducts);
      }
    },
    onSettled: () => {
      // Refetch after mutation
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: ['products', 'category'],
      });
    },
  });
};
