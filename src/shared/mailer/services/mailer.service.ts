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
    protected subject: string | undefined;
    protected body: string | undefined;

    constructor(mailerData: MailerInterface) {
        Object.assign(this, mailerData);
    }

    // Setters
    setSubject(subject: string): void {
        this.subject = subject;
    }

    setBody(body: string): void {
        this.body = body;
    }
    
    /**
     * Send Mail
     */
    async sendMail(): Promise<void> {
        const host = Environment.get(ENVIRONMENT.MAILER_HOST);
        const port = Number(Environment.get(ENVIRONMENT.MAILER_PORT));
        const user = Environment.get(ENVIRONMENT.MAILER_USER) ?? '';
        const pass = Environment.get(ENVIRONMENT.MAILER_PASS) ?? '';

        const transporterOptions: any = {
            host,
            port,
            // secure: true,
        };

        if (user && pass) {
            transporterOptions.auth = { user, pass };
        }

        const transporter = nodemailer.createTransport(transporterOptions);

        await transporter.sendMail({
            from: user || undefined,
            to: this.email,
            subject: this.subject,
            text: this.body,
        });
    }
}