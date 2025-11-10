/**
 * User interface
 * Defines the structure for user data
 */
import { ObjectId } from "mongodb";

export interface UserInterface {
    _id: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}