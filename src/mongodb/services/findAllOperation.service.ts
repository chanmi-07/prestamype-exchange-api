import { Filter, MongoClient } from "mongodb";
import { MongoOperation } from "@/mongodb/services/mongodbOperation.service";

export class FindAllOperation<T> extends MongoOperation<T[]> {
    constructor(collection: string, client: MongoClient) {
        super(collection, client);
    }

    async execute(query: object, options?: object): Promise<T[]> {
        try {
                // defining the collection and the cursor
            let collection = this.db.collection<T[]>(this.collection);
            let cursor = collection.find(query as unknown as Filter<T[]> ?? {}, options ?? {});

            let data: Array<T> = [];

            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}