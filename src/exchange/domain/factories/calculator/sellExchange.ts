/**
 * Calculates the total amount for a sell exchange based on the amount sent and the sale price.
 */
import { CalculatorInterface } from "@/exchange/domain/types/calculator.interface";

export class SellExchange {
    calculate(data: CalculatorInterface): number {
        const { amountSend, salePrice } = data;
        return amountSend / salePrice;
    }
}