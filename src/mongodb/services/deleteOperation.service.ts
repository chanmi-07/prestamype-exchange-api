/**
 * Service for deleting documents from a MongoDB collection.
 */
import { MongoOperation } from "@/mongodb/services/mongodbOperation.service";
import { COLLECTION } from "@/mongodb/enums/collection.enum";

export class DeleteOperation<T> extends MongoOperation<T> {
    constructor(collection: COLLECTION) {
        super(collection);
    }

    async execute(filter: Partial<T>): Promise<boolean> {
        try {
            const db = await this.getDb();
            const result = await db.collection(this.collection).deleteOne(filter);
            return result.deletedCount === 1;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}