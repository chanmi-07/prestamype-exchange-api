/**
 * Exchange Interface
 */
import { EXCHANGE_TYPE } from "@/exchange/domain/enums/exchange.enum";
import { ObjectId } from "mongodb";

export interface ExchangeInterface {
    exchangeType: EXCHANGE_TYPE;
    exchangeRate: {
        id: string;
        purchasePrice: number;
        salePrice: number;
    },
    amountSend: number;
    amountReceive: number;
    userId: ObjectId;
}