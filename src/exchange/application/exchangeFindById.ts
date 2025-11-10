import { ObjectId } from "mongodb";
import { ExchangeRepository } from "@/exchange/domain/exchange.repository";
import { ExchangeInterface } from "@/exchange/domain/types/exchange.interface";

export class ExchangeFindById {
    constructor(private readonly exchangeRepository: ExchangeRepository) {}

    async execute(id: string, userId: ObjectId) : Promise<ExchangeInterface | null> {
        return await this.exchangeRepository.findExchangeById(id, userId);
    }
}