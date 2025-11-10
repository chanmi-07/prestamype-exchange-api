import { ObjectId } from "mongodb";
import { UserInterface } from "@/user/domain/types/user.interface";

export class User {
    private readonly _id: ObjectId;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;

    // Constructor
    constructor(userData: UserInterface) {
        Object.assign(this, userData);
    }

    // Getters
    getId(): ObjectId {
        return this._id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }
}