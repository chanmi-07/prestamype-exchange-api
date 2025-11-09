/**
 * Mailer interface
 * Defines the structure for mailer data
 */
export interface MailerInterface {
    email: string;
    subject: string;
    body: string;
}

export interface WelcomeMailerInterface extends MailerInterface {
    firstName: string;
}