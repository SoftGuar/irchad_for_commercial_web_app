import { apiService } from "./apiService";

export const authApi = {
    login: async (email: string, password: string) => {
        try {
          const response = await apiService.post('/login', {
            email,
            password,
            role: "commercial",
          });
          
          console.log('Full login response:', response); 
          
          const token = response.data?.token;
          if (!token) {
            throw new Error('Token not found in response data');
          }
          
          return {
            token,
            userData: response.data 
          };
        } catch (error) {
          console.error('Login API Error:', error);
          throw error;
        }
    },

  logout: async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  },
};