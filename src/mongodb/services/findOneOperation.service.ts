import { MongoOperation } from "@/mongodb/services/mongodbOperation.service";
import { MongoClient } from "mongodb";

export class FindOneOperation<T> extends MongoOperation<T> {
    constructor(collection: string, client: MongoClient) {
        super(collection, client);
    }

    async execute(query: object, options?: object): Promise<T | null> {
        try {
            return await this.db.collection(this.collection).findOne<T>(query ?? {}, options);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}