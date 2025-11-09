/**
 * Mailer service implementation
 * Uses nodemailer to send emails
 */
import { Environment } from "@/shared/config/classes/environment";
import { ENVIRONMENT } from "@/shared/config/enums/environment.enum";
import { Mailer } from "@/shared/mailer/ports/mailer.port";
import { MailerInterface } from "@/shared/mailer/services/types/mailer.interface";
import * as nodemailer from 'nodemailer';

export abstract class MailerService implements Mailer {
    protected email: string;
    protected subject: string;
    protected body: string;

    constructor(mailerData: MailerInterface) {
        Object.assign(this, mailerData);
    }
    
    async sendMail(): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: Environment.get(ENVIRONMENT.MAILER_HOST),
            port: Number(Environment.get(ENVIRONMENT.MAILER_PORT)),
            auth: {
                user: Environment.get(ENVIRONMENT.MAILER_USER),
                pass: Environment.get(ENVIRONMENT.MAILER_PASS),
            },
        });

        await transporter.sendMail({
            from: Environment.get(ENVIRONMENT.MAILER_USER),
            to: this.email,
            subject: this.subject,
            text: this.body,
        });
    }
}