const emailConfig = {
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
        secure: false,
        tls: { rejectUnauthorized: false },
        debug: true,
    },
};
export { emailConfig as email };
