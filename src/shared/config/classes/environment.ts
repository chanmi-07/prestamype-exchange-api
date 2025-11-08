import { ENVIRONMENT } from "@/shared/config/enums/environment.enum";

export class Environment {
    static get(key: ENVIRONMENT): string {
        const env = process.env[key];
        if (!env) {
            throw new Error(`Environment variable ${key} is not set`);
        }
        return env;
    }
}