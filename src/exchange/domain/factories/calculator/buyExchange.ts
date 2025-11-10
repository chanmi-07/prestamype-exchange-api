/**
 * BuyExchange class responsible for calculating the total cost of a buy exchange.
 */
import { CalculatorInterface } from "@/exchange/domain/types/calculator.interface";

export class BuyExchange {
    calculate(data: CalculatorInterface): number {
        const { amountSend, purchasePrice } = data;
        return amountSend * purchasePrice;
    }
}