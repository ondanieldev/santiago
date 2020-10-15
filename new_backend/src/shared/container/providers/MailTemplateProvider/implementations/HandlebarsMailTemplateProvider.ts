import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default class FakeHandlebarsTemplateProvider
    implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseMailTemplateDTO): Promise<string> {
        const stylesPath = path.resolve(__dirname, '..', 'views', 'styles.hbs');
        const headerPath = path.resolve(__dirname, '..', 'views', 'header.hbs');
        const filePath = path.resolve(__dirname, '..', 'views', file);
        const footerPath = path.resolve(__dirname, '..', 'views', 'footer.hbs');

        const styles = await fs.promises.readFile(stylesPath, {
            encoding: 'utf-8',
        });

        const header = await fs.promises.readFile(headerPath, {
            encoding: 'utf-8',
        });

        const templateContent = await fs.promises.readFile(filePath, {
            encoding: 'utf-8',
        });

        const footer = await fs.promises.readFile(footerPath, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templateContent);

        const document = styles + header + parseTemplate(variables) + footer;

        return document;
    }
}
