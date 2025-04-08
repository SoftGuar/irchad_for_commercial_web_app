export interface Sale {
    id: number;
    userName: string;
    commercialName: string;
    date: string;
    dispositiveId: number;
    Status: boolean;
}

export type Quotation = {
    id: number;
    user_id: number;
    date: string;
    
};
  
export type Product = {
    id: number;
};
  
export type QuotationProductAssociation = {
    product_id: number;
    count: number;
};
  
export type QuotationDemand = {
    user_id: number;
    products: QuotationProductAssociation[];
};