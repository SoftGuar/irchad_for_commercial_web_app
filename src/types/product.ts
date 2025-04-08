export interface Product {
    id: number;
    name: string;
    description: string;
    price: number
}

export interface Dispositive {
    id: number;
    user_id: number | null;
    [key: string]: any;
}