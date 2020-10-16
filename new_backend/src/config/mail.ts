import path from 'path';

interface IMailConfig {
    imagesFolder: string;
    driver: 'ethereal';
    defaults: {
        from: {
            name: string;
            email: string;
        };
    };
}

const imagesFolder = path.resolve(__dirname, '..', 'assets', 'images');

export default {
    imagesFolder,
    driver: process.env.MAIL_PROVIDER || 'ethereal',
    defaults: {
        from: {
            name: process.env.MAIL_DEFAULT_NAME,
            email: process.env.MAIL_DEFAULT_EMAIL,
        },
    },
} as IMailConfig;
