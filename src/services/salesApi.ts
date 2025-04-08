import { apiService } from './apiService';
import { Sale } from '@/types/sale';

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const salesApi = {
  quotations: {
    getAll: async () => {
      return await apiService.get('/sales/quotations/');
    },
    create: async (data: { user_id: number; date: string }) => {
      return await apiService.post('/sales/quotations/', data);
    },
    getById: async (id: number | string) => {
      return await apiService.get(`/sales/quotations/${id}`);
    },
    update: async (id: number | string, data: any) => {
      return await apiService.put(`/sales/quotations/${id}`, data);
    },
    delete: async (id: number | string) => {
      return await apiService.delete(`/sales/quotations/${id}`);
    },
    associateProduct: async (id: number | string, data: { product_id: number; count: number }) => {
      return await apiService.post(`/sales/quotations/associate/${id}`, data);
    },
    getByUserId: async (user_id: number | string) => {
      return await apiService.get(`/sales/quotations/user/${user_id}`);
    },
    createDemand: async (data: { user_id: number; products: Array<{ product_id: number; count: number }> }) => {
      return await apiService.post('/sales/quotations/demande', data);
    },
  },

  transactions: {
    getAllSales: async (): Promise<ApiResponse<Sale[]>> => {
      return await apiService.get('/sales/transactions/sales');
    },
  },
};

