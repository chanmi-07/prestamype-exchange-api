/**
 * FindAllOperation Service
 * This service is responsible for retrieving all documents from a specified MongoDB collection.
 * It extends the MongoOperation class to leverage common database operation functionalities.
 */
import { Filter } from "mongodb";
import { MongoOperation } from "@/mongodb/services/mongodbOperation.service";
import { COLLECTION } from "@/mongodb/enums/collection.enum";

export class FindAllOperation<T> extends MongoOperation<T[]> {
    constructor(collection: COLLECTION) {
        super(collection);
    }

    async execute(query?: object, options?: object): Promise<T[]> {
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