import path from 'path';

interface IMailConfig {
    imagesFolder: string;
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            name: string;
            email: string;
        };
    };
    config: {
        ses: {
            region: string;
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
    config: {
        ses: {
            region: process.env.AWS_DEFAULT_REGION,
        },
    },
} as IMailConfig;
