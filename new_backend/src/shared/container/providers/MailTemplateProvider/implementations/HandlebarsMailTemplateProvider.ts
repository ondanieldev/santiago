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
        const filePath = path.resolve(__dirname, '..', 'views', file);

        const templateContent = await fs.promises.readFile(filePath, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templateContent);

        return parseTemplate(variables);
    }
}
