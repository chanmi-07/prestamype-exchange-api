/**
 * WelcomeMailerService
 * Service for sending welcome emails to new users
 */
import { WelcomeMailerInterface } from "@/shared/mailer/services/types/mailer.interface";
import { MailerService } from "@/shared/mailer/services/mailer.service";
import { TEMPLATE } from "./enums/template.enum";
import { TemplateService } from "@/shared/mailer/services/template.service";
import { SUBJECT } from "./enums/subject.enum";

export class WelcomeMailerService extends MailerService {
    private firstName: string;
    private readonly template = TEMPLATE.WELCOME;

    constructor(
        mailerData: WelcomeMailerInterface,
        private readonly templateService: TemplateService
    ) {
        super(mailerData);
        this.firstName = mailerData.firstName;
    }

    async sendWelcomeEmail(): Promise<void> {
        const variables = {
            firstName: this.firstName,
        };
        
        this.body = await this.templateService.render(this.template, variables);
        this.subject = SUBJECT.WELCOME;

        await this.sendMail();
    }
}