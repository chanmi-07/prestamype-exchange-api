/**
 * Service to create a new document in a MongoDB collection.
 */
import { MongoOperation } from "@/mongodb/services/mongodbOperation.service";
import { COLLECTION } from "@/mongodb/enums/collection.enum";

export class CreateOperation<T> extends MongoOperation<T> {
    constructor(collection: COLLECTION) {
        super(collection);
    }
    async execute(data: T): Promise<T | null> {
        try {
            const db = await this.getDb();
            return db.collection(this.collection).insertOne(data as unknown as Document).then(result => result.insertedId !== null ? new Object(data) as T : null);
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}