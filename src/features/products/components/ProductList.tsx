import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { ProductItem } from './ProductItem';
import { Product } from '../../../utils/types';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { LIST_CONFIG } from '../../../utils/constants';

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
  error?: Error | null;
  onRetry?: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  isRefreshing,
  onRefresh,
  showDelete = false,
  onDelete,
  error,
  onRetry,
}) => {
  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  const getItemLayout = useCallback(
    (_data: Product[] | null | undefined, index: number) => ({
      length: LIST_CONFIG.ITEM_HEIGHT,
      offset: LIST_CONFIG.ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => (
      <ProductItem product={item} showDelete={showDelete} onDelete={onDelete} />
    ),
    [showDelete, onDelete]
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        tintColor={colors.primary}
        colors={[colors.primary]}
      />
    ),
    [isRefreshing, onRefresh]
  );

  // Error state
  if (error && !isLoading && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load products</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
        {onRetry && (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={onRetry}
            activeOpacity={0.7}
          >
            <Text style={styles.retryButtonText}>Tap to Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Empty state
  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No products found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      refreshControl={refreshControl}
      removeClippedSubviews
      initialNumToRender={LIST_CONFIG.INITIAL_NUM_TO_RENDER}
      maxToRenderPerBatch={LIST_CONFIG.MAX_TO_RENDER_PER_BATCH}
      windowSize={LIST_CONFIG.WINDOW_SIZE}
      contentContainerStyle={products.length === 0 ? styles.emptyContainer : undefined}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyContainer: {
    flex: 1,
  },
  errorText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.error,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  errorSubtext: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
  emptyText: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
  },
});
