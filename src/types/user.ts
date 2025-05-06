export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    MAC: string;
    // created_at: string;
    // updated_at: string;
  }
  
export interface UsersResponse {
    success: boolean;
    data: User[];
}

export interface UserDetails {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  helpers?: Array<{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  }>;
}