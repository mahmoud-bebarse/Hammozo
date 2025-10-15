import { z } from 'zod';

// Auth Types
export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
  expiresInMins: z.number().optional(),
});

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string(),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  id: z.number(),
  username: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string(),
});

// Product Types
export const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number().optional(),
  rating: z.number().optional(),
  stock: z.number().optional(),
  brand: z.string().optional(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()).optional(),
});

export const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const DeleteProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  brand: z.string(),
  category: z.string(),
  thumbnail: z.string(),
  images: z.array(z.string()),
  isDeleted: z.boolean(),
  deletedOn: z.string(),
});

// Inferred Types
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type User = z.infer<typeof UserSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductsResponse = z.infer<typeof ProductsResponseSchema>;
export type DeleteProductResponse = z.infer<typeof DeleteProductResponseSchema>;

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  AllProducts: undefined;
  CategoryProducts: undefined;
  SignOut: undefined;
};

// Auth State
export interface AuthState {
  token: string | null;
  user: User | null;
  isSuperadmin: boolean;
}
