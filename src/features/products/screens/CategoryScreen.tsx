import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { ProductList } from '../components/ProductList';
import { useCategoryProducts } from '../api/queries';
import { CHOSEN_CATEGORY } from '../../../utils/constants';
import { colors } from '../../../theme/colors';

export const CategoryScreen: React.FC = () => {
  const { data, isLoading, error, refetch, isRefetching } =
    useCategoryProducts(CHOSEN_CATEGORY);

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
        showDelete={false}
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
