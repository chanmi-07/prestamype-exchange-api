/**
 * FindOneAndUpdateOperation class to perform findOneAndUpdate operation on a MongoDB collection.
 */
import { MongoOperation } from "@/mongodb/services/mongodbOperation.service";
import { COLLECTION } from "@/mongodb/enums/collection.enum";

export class FindOneAndUpdateOperation<T> extends MongoOperation<T | null> {
    constructor(collection: COLLECTION) {
        super(collection);
    }
    async execute(query: object, update: object, options?: object): Promise<T | null> {
        try {
            const db = await this.getDb();
            let updatedDocument = await db.collection(this.collection).findOneAndUpdate(
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