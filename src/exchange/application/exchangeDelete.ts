import { ObjectId } from "mongodb";
import { ExchangeRepository } from "@/exchange/domain/exchange.repository";

export class ExchangeDelete {
    constructor(private readonly exchangeRepository: ExchangeRepository) {}

    async execute(id: string, userId: ObjectId): Promise<boolean> {
        return await this.exchangeRepository.deleteExchange(id, userId);
    }
}