import nodemailer from 'nodemailer';
import { MailAdpter, SendMailData } from "../adapters/mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3a9d34dbb55d1a",
    pass: "eca3f64dce8cd8"
  }
});

export class NodemailerMailAdapter implements MailAdpter {
  async sendMail({subject, body}: SendMailData){

    await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Matheus Vinicius <matheuzv777@gmail.com>',
    subject ,
    html: body
  });
  }
}