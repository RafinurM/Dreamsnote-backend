import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type {
  Transporter,
  SendMailOptions,
} from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    const host = process.env.SMTP_HOST || 'mail.dreamsnote.info.ru';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const secure = process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE === 'true'
      : port === 465;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      logger: true,
      debug: true
    });
  }
  async sendMail(
    to: string,
    subject: string,
    html: string,
    text?: string,
  ): Promise<void> {
    const fromName = process.env.FROM_NAME || 'DreamsNote';
    const fromAddress =
      process.env.FROM_ADDRESS ||
      process.env.SMTP_USER ||
      'no-reply@dreamsnote.com';

    const mailOptions: SendMailOptions = {
      from: `"${fromName}" <${fromAddress}>`,
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Mail sending failed:', { to, subject, error: err });
      throw new InternalServerErrorException('Failed to send email');
    }
  }
}
