/**
 * Template port interface
 * Defines method for rendering templates
 */
export interface Template {
    render(template: string, variables: Record<string, string>): Promise<string>;
}