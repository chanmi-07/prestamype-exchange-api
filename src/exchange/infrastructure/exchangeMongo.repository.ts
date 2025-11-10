import { COLLECTION } from "@/mongodb/enums/collection.enum";
import { CreateOperation } from "@/mongodb/services/createOperation.service";
import { ExchangeInterface } from "@/exchange/domain/types/exchange.interface";
import { ObjectId } from "mongodb";
import { FindOneOperation } from "@/mongodb/services/findOneOperation.service";
import { DeleteOperation } from "@/mongodb/services/deleteOperation.service";
import { AggregationOperation } from "@/mongodb/services/aggregationOperation";

export class ExchangeMongoRepository {
    private readonly collectionName = COLLECTION.EXCHANGE;

    async createExchange(exchangeData: ExchangeInterface): Promise<ExchangeInterface | null> {
        const operation = new CreateOperation<ExchangeInterface>(this.collectionName);
        return await operation.execute(exchangeData);
    }

    async findExchangeById(exchangeId: ObjectId, userId: string): Promise<ExchangeInterface | null> {
        const operation = new FindOneOperation<ExchangeInterface>(this.collectionName);
        return await operation.execute({ _id: new ObjectId(exchangeId), userId: new ObjectId(userId) });
    }

    async deleteExchange(exchangeId: ObjectId, userId: string): Promise<boolean> {
        const operation = new DeleteOperation<ExchangeInterface>(this.collectionName);
        const result =  await operation.execute({ _id: new ObjectId(exchangeId), userId: new ObjectId(userId) });
        return result;
    }

    async getAllExchangesPaginated(userId: string, page: number, limit: number): Promise<ExchangeInterface[]> {
        const operation = new AggregationOperation<ExchangeInterface>(this.collectionName);
        const pipeline = [
            { $match: { userId: new ObjectId(userId) } },
            { $sort: { _id: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ];
        return await operation.execute(pipeline);
    }
}