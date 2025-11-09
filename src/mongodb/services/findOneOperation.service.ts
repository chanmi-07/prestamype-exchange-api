/**
 * FindOneOperation class to perform a findOne operation on a MongoDB collection.
 */
import { MongoOperation } from "@/mongodb/services/mongodbOperation.service";
import { COLLECTION } from "@/mongodb/enums/collection.enum";

export class FindOneOperation<T> extends MongoOperation<T> {
    constructor(collection: COLLECTION) {
        super(collection);
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