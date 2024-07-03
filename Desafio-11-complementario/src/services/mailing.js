import mailer from "nodemailer";
import { entorno } from "../config/entorno.config.js";

export default class MailingService {
  constructor() {
    this.client = mailer.createTransport({
      service: entorno.mail_service,
      host: entorno.mail_host,
      port: 587,
      auth: {
        user: entorno.mail_username,
        pass: entorno.mail_password,
      },
    });
  }

  sendSimpleMail = async ({ from, to, subject, html, attachments = [] }) => {
    let result = await this.client.sendMail({
      from,
      to,
      subject,
      html,
      attachments,
    });
    console.log(result);
    return result;
  };
}
