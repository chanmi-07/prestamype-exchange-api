/**
 * Mailer port interface
 * Defines method for sending emails
 */
export interface Mailer {
    sendMail(): Promise<void>;
}