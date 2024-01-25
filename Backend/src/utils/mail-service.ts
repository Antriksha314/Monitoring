import nodemailer from "nodemailer";

const sender = {
  email: process.env.SENDER_MAIL,
  password: process.env.SENDER_PASS,
};

import { Response } from "express";



var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: sender.email,
    pass: sender.password,
  }
});

export const sendEmail = (res: Response, sendsTo: string, subject: string, html: string) => {

  var mailOption = {
    from: 'no-reply@test.org',
    to: sendsTo,
    subject: subject,
    html: html
  };

  transport.sendMail(mailOption, function (error: any, info: { response: string; }) {
    try {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Email sent"
        });
      }
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err
      });
    }

  });
};