import * as nodemailer from 'nodemailer';

class email {
    transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: Config.email.smtp.host,
            port: Config.email.smtp.port,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: Config.email.smtp.auth.user,
                pass: Config.email.smtp.auth.pass,
            },
        });
    }

    async sendMail(from: string, to: string, subject: string, text: string) {
        await this.transporter.sendMail({
            from,
            to,
            subject,
            text,
        });
    }
}

export default new email();
