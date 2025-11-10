import { COLLECTION } from "@/mongodb/enums/collection.enum";
import { CreateOperation } from "@/mongodb/services/createOperation.service";
import { ExchangeInterface } from "@/exchange/domain/types/exchange.interface";
import { ObjectId } from "mongodb";
import { FindAllOperation } from "@/mongodb/services/findAllOperation.service";
import { FindOneOperation } from "@/mongodb/services/findOneOperation.service";

export class ExchangeMongoRepository {
    private readonly collectionName = COLLECTION.EXCHANGE;

    async createExchange(exchangeData: ExchangeInterface): Promise<ExchangeInterface | null> {
        const operation = new CreateOperation<ExchangeInterface>(this.collectionName);
        return await operation.execute(exchangeData);
    }

    async findAllExchanges(userId: ObjectId): Promise<ExchangeInterface[]> {
        const operation = new FindAllOperation<ExchangeInterface>(this.collectionName);
        return await operation.execute({ userId });
    }

    async findExchangeById(exchangeId: ObjectId, userId: ObjectId): Promise<ExchangeInterface | null> {
        const operation = new FindOneOperation<ExchangeInterface>(this.collectionName);
        return await operation.execute({ _id: exchangeId, userId });
    }

    // async deleteExchange(exchangeId: ObjectId, userId: ObjectId): Promise<boolean> {
    // }
}