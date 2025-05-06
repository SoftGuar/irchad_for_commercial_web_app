import { apiService } from './apiService';
import { Product } from '@/types/product'; 
import { User, UsersResponse, UserDetails } from '@/types/user';
import { Dispositive } from '@/types/product';

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const commercialApi = {
  account: {
    getCurrent: async (): Promise<ApiResponse<User>> => {
      return await apiService.get('/account/');
    },
  },
  
  products: {
    getAll: async (): Promise<ApiResponse<Product[]>> => {
        // return await apiService.get('/commercial/product/');
        return await apiService.get('/sales/products/');
    },
    getById: async (id: number | string): Promise<ApiResponse<Product>> => {
        // return await apiService.get(`/commercial/product/${id}`);
        return await apiService.get(`/sales/products/${id}`);
    },
  },

  users: {
    getAll: async (): Promise<UsersResponse> => {
      return await apiService.get('/commercial/account/user');
    },

    getById: async (id: number | string): Promise<ApiResponse<UserDetails>> => {
      return await apiService.get(`/commercial/account/user/${id}`);
    },

    create: async (userData: Omit<User, 'id'>): Promise<ApiResponse<User>> => {
      return await apiService.post('/commercial/account/user', userData);
    },

    update: async (id: number | string, userData: Partial<User>): Promise<ApiResponse<User>> => {
      return await apiService.put(`/commercial/account/user/${id}`, userData);
    },

    delete: async (id: number | string): Promise<ApiResponse<void>> => {
      return await apiService.delete(`/commercial/account/user/${id}`);
    },
  },

  helpers: {
    getAll: async (): Promise<UsersResponse> => {
      return await apiService.get('/commercial/account/helper');
    },

    getById: async (id: number | string): Promise<ApiResponse<User>> => {
      return await apiService.get(`/commercial/account/helper/${id}`);
    },

    create: async (helperData: Omit<User, 'id'>): Promise<ApiResponse<User>> => {
      return await apiService.post('/commercial/account/helper', helperData);
    },

    update: async (id: number | string, helperData: Partial<User>): Promise<ApiResponse<User>> => {
      return await apiService.put(`/commercial/account/helper/${id}`, helperData);
    },

    delete: async (id: number | string): Promise<ApiResponse<void>> => {
      return await apiService.delete(`/commercial/account/helper/${id}`);
    },
  },

  dispositives: {
    getAll: async (): Promise<ApiResponse<Dispositive[]>> => {
      return await apiService.get('/commercial/dispositive/');
    },
  },
};

