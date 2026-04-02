export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId?: string;
  categoryName?: string;
  stock: number;
  material?: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  imageUrls: string[];
}

export interface ProductCreateVM {
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
  stock?: number;
  material?: string;
  imageUrls?: string[];
}

export interface ProductUpdateVM {
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
  stock?: number;
  material?: string;
}

export interface ProductFilterParams {
  search?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  material?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: string;
  sortDescending?: boolean;
  pageNumber?: number;
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

export interface CategoryCreateVM {
  name: string;
  description?: string;
}

export interface CategoryUpdateVM {
  name: string;
  description?: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage?: string;
  quantity: number;
  totalPrice: number;
}

export interface AddToCartVM {
  quantity: number;
}

export interface UpdateCartItemVM {
  quantity: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface UserCreateVM {
  fullName: string;
  email: string;
  password: string;
}

export interface UserUpdateVM {
  fullName: string;
}

export interface LoginRequestVM {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  addressId: string;
  addressText: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface OrderCreateVM {
  addressId: string;
}

export interface OrderStatusUpdateVM {
  status: string;
}

export interface Address {
  id: string;
  userId: string;
  fullName?: string;
  phone?: string;
  addressLine?: string;
  city?: string;
  postalCode?: string;
  createdAt: string;
}

export interface AddressCreateVM {
  fullName?: string;
  phone?: string;
  addressLine?: string;
  city?: string;
  postalCode?: string;
}

export interface AddressUpdateVM {
  fullName?: string;
  phone?: string;
  addressLine?: string;
  city?: string;
  postalCode?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface ReviewCreateVM {
  rating: number;
  comment?: string;
}

export interface ReviewUpdateVM {
  rating: number;
  comment?: string;
}

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

export interface PaymentCreateVM {
  paymentMethod?: string;
}

export interface CheckoutVM {
  addressId: string;
  paymentMethod?: string;
}

export interface WishlistItem {
  productId: string;
}

export interface AdminDashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
  totalProducts: number;
}

export interface AdminDashboardSales {
  date: string;
  amount: number;
}

export interface AdminDashboardOrder {
  id: string;
  customerName: string;
  total: number;
  status: string;
  date: string;
}

export interface AdminDashboardCustomer {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
}

export interface AdminDashboardProduct {
  id: string;
  name: string;
  stock: number;
  sales: number;
}

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface ProductImageAddVM {
  imageUrl?: string;
}
