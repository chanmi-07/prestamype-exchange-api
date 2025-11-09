import { ENVIRONMENT } from "@/shared/config/enums/environment.enum";

export class Environment {
    private static loaded = false;

    private static loadDotEnv(): void {
        if (Environment.loaded) return;
        Environment.loaded = true;
        try {
            const fs = require('fs');
            const path = require('path');
            const envPath = path.resolve(process.cwd(), '.env');
            if (!fs.existsSync(envPath)) return;
            const content = fs.readFileSync(envPath, { encoding: 'utf8' });
            for (const line of content.split(/\r?\n/)) {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) continue;
                const eq = trimmed.indexOf('=');
                if (eq === -1) continue;
                const k = trimmed.substring(0, eq).trim();
                let v = trimmed.substring(eq + 1).trim();
                if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
                    v = v.substring(1, v.length - 1);
                }
                if (process.env[k] === undefined) process.env[k] = v;
            }
        } catch (err) {
            // don't crash on .env read errors; environment will be validated when values are requested
        }
    }

    static get(key: ENVIRONMENT): string {
        Environment.loadDotEnv();
        const env = process.env[key];
        if (!env) {
            throw new Error(`Environment variable ${key} is not set`);
        }
        return env;
    }
}