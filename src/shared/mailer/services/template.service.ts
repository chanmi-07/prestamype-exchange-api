/**
 * TemplateService implementation
 * Renders email templates with provided variables
 */
import { Template } from "@/shared/mailer/ports/template.port";
import { join } from "path";
import { TEMPLATE } from "@/shared/mailer/services/enums/template.enum";

export class TemplateService implements Template {
    async render(template: TEMPLATE, variables: Record<string, string>): Promise<string> {
        const templatesDir = join(__dirname, '../templates');
        const filePath = join(templatesDir, `${template}.template.html`);
        let templateContent = await import('fs/promises').then(fs => fs.readFile(filePath, 'utf-8'));

        for (const [key, value] of Object.entries(variables)) {
            const placeholder = `{{${key}}}`;
            templateContent = templateContent.replace(new RegExp(placeholder, 'g'), value);
        }
        return templateContent;
    }
}
