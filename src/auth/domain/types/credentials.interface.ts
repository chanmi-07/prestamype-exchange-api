import { ObjectId } from "mongodb";

export interface CredentialsInterface {
    email: string;
    password: string;
}

export interface JwtPayloadInterface {
    sub: ObjectId;
    email: string;
    name: string;
}
