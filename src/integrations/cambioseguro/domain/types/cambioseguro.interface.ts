/**
 * Cambio Seguro Rates Interface
 */
export interface RatesInterface {
    error: boolean;
    message: string;
    status: number;
    data: {
        sunat_purchase_price: number;
        sunat_sale_price: number;
        status: boolean;
        _id: string;
        purchase_price: number;
        sale_price: number;
        purchase_price_comparative: number;
        sale_price_comparative: number;
        purchase_price_paralelo: number;
        sale_price_paralelo: number;
    };
}