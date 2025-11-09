/**
 * Mailer interface
 * Defines the structure for mailer data
 */
export interface MailerInterface {
    email: string;
}

export interface WelcomeMailerInterface extends MailerInterface {
    firstName: string;
}