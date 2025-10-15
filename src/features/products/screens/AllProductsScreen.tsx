import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { ProductList } from '../components/ProductList';
import { useAllProducts, useDeleteProduct } from '../api/queries';
import { selectIsSuperadmin } from '../../auth/selectors';
import { colors } from '../../../theme/colors';

export const AllProductsScreen: React.FC = () => {
  const { data, isLoading, error, refetch, isRefetching } = useAllProducts();
  const deleteProductMutation = useDeleteProduct();
  const isSuperadmin = useSelector(selectIsSuperadmin);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteProductMutation.mutateAsync(id);
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    },
    [deleteProductMutation]
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <View style={styles.container}>
      <ProductList
        products={data?.products ?? []}
        isLoading={isLoading}
        isRefreshing={isRefetching}
        onRefresh={handleRefresh}
        showDelete={isSuperadmin}
        onDelete={handleDelete}
        error={error}
        onRetry={handleRetry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
