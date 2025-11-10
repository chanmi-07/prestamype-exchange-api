import { ExchangeRepository } from "@/exchange/domain/exchange.repository";
import { ExchangeInterface } from "@/exchange/domain/types/exchange.interface";
import { ObjectId } from "mongodb";

export class ExchangeGetAllPaginated {
    constructor(private readonly exchangeRepository: ExchangeRepository) {}

    async execute(userId: string, page: number, limit: number): Promise<ExchangeInterface[]> {
        return await this.exchangeRepository.getAllExchangesPaginated(new ObjectId(userId), page, limit);
    }
}