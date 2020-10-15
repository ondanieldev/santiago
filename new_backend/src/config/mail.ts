interface IMailConfig {
    driver: 'ethereal';
    defaults: {
        from: {
            name: string;
            email: string;
        };
    };
}

export default {
    driver: process.env.MAIL_PROVIDER || 'ethereal',
    defaults: {
        from: {
            name: process.env.MAIL_DEFAULT_NAME,
            email: process.env.MAIL_DEFAULT_EMAIL,
        },
    },
} as IMailConfig;
