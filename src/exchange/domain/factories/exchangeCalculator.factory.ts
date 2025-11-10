import { EXCHANGE_TYPE } from "@/exchange/domain/enums/exchange.enum";
import { BuyExchange } from "@/exchange/domain/factories/calculator/buyExchange";
import { SellExchange } from "@/exchange/domain/factories/calculator/sellExchange";
import { CalculatorClass, CalculatorInterface } from "@/exchange/domain/types/calculator.interface";

const exchangeCalculator: Record<EXCHANGE_TYPE, new () => CalculatorClass> = {
    [EXCHANGE_TYPE.BUY]: BuyExchange,
    [EXCHANGE_TYPE.SELL]: SellExchange,
};

export class ExchangeCalculatorFactory {
    static calculate(exchangeType: EXCHANGE_TYPE, data: CalculatorInterface) {
        const ExchangeClass = exchangeCalculator[exchangeType];
        if (!ExchangeClass) {
            throw new Error(`Exchange type ${exchangeType} not supported`);
        }
        return new ExchangeClass().calculate(data);
    }
}