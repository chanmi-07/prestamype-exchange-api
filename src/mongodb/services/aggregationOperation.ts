/**
 * AggregationOperation class for performing aggregation operations using aggregation pipeline in MongoDB.
 */
import { MongoOperation } from "@/mongodb/services/mongodbOperation.service";
import { COLLECTION } from "@/mongodb/enums/collection.enum";

export class AggregationOperation<T> extends MongoOperation<T[]> {
    constructor(collection: COLLECTION) {
        super(collection);
    }

    async execute(pipeline: object[]): Promise<T[]> {
        try {
            const db = await this.getDb();
            const documents = await db.collection(this.collection).aggregate(pipeline).toArray();
            const results: Array<T> = [];
            for await (const document of documents) {
                results.push(new Object(document) as T);
            }
            
            return results;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}