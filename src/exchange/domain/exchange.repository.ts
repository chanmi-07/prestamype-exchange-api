/**
 * Exchange Repository Interface
 */
import { ObjectId } from "mongodb";
import { ExchangeInterface } from "@/exchange/domain/types/exchange.interface";

export interface ExchangeRepository {
    createExchange(data: ExchangeInterface): Promise<ExchangeInterface>;
    getAllExchangesPaginated(userId: ObjectId, page: number, limit: number): Promise<ExchangeInterface[]>;
    findExchangeById(id: string, userId: ObjectId): Promise<ExchangeInterface | null>;
    deleteExchange(id: string, userId: ObjectId): Promise<boolean>;
}