import { MongoOperation } from "@/mongodb/services/mongodbOperation.service";
import { MongoClient } from "mongodb";

export class FindOneAndUpdateOperation<T> extends MongoOperation<T | null> {
    constructor(collection: string, client: MongoClient) {
        super(collection, client);
    }
    async execute(query: object, update: object, options?: object): Promise<T | null> {
        try {
            let updatedDocument = await this.db.collection(this.collection).findOneAndUpdate(
                query,
                update,
                {
                    returnDocument: "after",
                    ...options

                }
            );
            return updatedDocument ? new Object(updatedDocument) as T : null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}