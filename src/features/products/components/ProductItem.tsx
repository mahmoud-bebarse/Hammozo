import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Product } from '../../../utils/types';
import { colors } from '../../../theme/colors';
import { spacing, borderRadius, hitSlop } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { LIST_CONFIG } from '../../../utils/constants';

interface ProductItemProps {
  product: Product;
  showDelete?: boolean;
  onDelete?: (id: number) => void;
}

export const ProductItem = memo<ProductItemProps>(
  ({ product, showDelete = false, onDelete }) => {
    const handleDelete = useCallback(() => {
      Alert.alert(
        'Delete Product',
        `Are you sure you want to delete "${product.title}"?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => onDelete?.(product.id),
          },
        ]
      );
    }, [product.id, product.title, onDelete]);

    return (
      <View style={styles.container}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>
        {showDelete && onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            hitSlop={hitSlop.md}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

ProductItem.displayName = 'ProductItem';

const styles = StyleSheet.create({
  container: {
    height: LIST_CONFIG.ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  deleteButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.error,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  deleteButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
});
