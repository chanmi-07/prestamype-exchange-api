/**
 * Calculator Interface
 */
import { BuyExchange } from "@/exchange/domain/factories/calculator/buyExchange";
import { SellExchange } from "@/exchange/domain/factories/calculator/sellExchange";

export type CalculatorClass = BuyExchange | SellExchange;

export interface CalculatorInterface {
    amountSend: number;
    purchasePrice: number;
    salePrice: number;
}