import { COLLECTION } from "@/mongodb/enums/collection.enum";
import { CreateOperation } from "@/mongodb/services/createOperation.service";
import { FindAllOperation } from "@/mongodb/services/findAllOperation.service";
import { UserInterface } from "@/user/domain/types/user.interface";

export class UserMongoRepository {
    private readonly collectionName = COLLECTION.USERS;

    async createUser(userData: UserInterface): Promise<UserInterface | null> {
        const operation = new CreateOperation<UserInterface>(this.collectionName);
        return await operation.execute(userData);
    }

    async findAllUsers(): Promise<UserInterface[]> {
        const operation = new FindAllOperation<UserInterface>(this.collectionName);
        return operation.execute();
    }
}