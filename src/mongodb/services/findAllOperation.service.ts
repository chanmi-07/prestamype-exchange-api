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
            const db = await this.getDb();
            // defining the collection and the cursor
            let collection = db.collection<T[]>(this.collection);
            let cursor = collection.find(query as unknown as Filter<T[]> ?? {}, options ?? {});

            let data: Array<T> = [];

            // if there are documents, iterate through them and add them to the array
            if ((await collection.countDocuments()) > 0) {
                for await (const document of cursor) {
                    data.push(new Object(document) as T);
                }
            }

            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}