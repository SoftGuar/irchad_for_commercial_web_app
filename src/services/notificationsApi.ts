import { apiService } from './apiService';
import {NotificationPayload, updateNotificationInput,Notification} from '@/types/notifications';

interface ApiResponse<T> {
success: boolean;
data: T;
}

export const notificationsApi = {
notifications: {
    getAll: async (userId: string): Promise<ApiResponse<Notification[]>> => {
        return {
            success: true,
            data: await apiService.get(`/notifications/notifications/${userId}/COMMERCIAL`),
        };
    },

    getById: async (notificationId: string): Promise<ApiResponse<Notification>> => {
        return {
            success: true,
            data: await apiService.get(`/notifications/notifications/${notificationId}`),
        }
    },

    update: async (notificationId: string, payload: updateNotificationInput): Promise<ApiResponse<Notification>> => {
        return {
            success: true,
            data: await apiService.put(`/notifications/notifications/${notificationId}`, payload),
        }
    },

    markAsRead: async (notificationId: string): Promise<ApiResponse<Notification>> => {
        const data = {}
        return {
            success: true,
            data: await apiService.put(`/notifications/notifications/${notificationId}/read`,data),
        }
    },

    markAsUnread: async (notificationId: string): Promise<ApiResponse<Notification>> => {
        const data = {}
        return {
            success: true,
            data: await apiService.put(`/notifications/notifications/${notificationId}/unread`,data),
        };
    },

    delete: async (notificationId: string): Promise<ApiResponse<void>> => {
        return {
            success: true,
            data: await apiService.delete(`/notifications/notifications/${notificationId}`),
        };
    },
},
};
