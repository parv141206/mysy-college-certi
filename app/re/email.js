"use server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import fs from "fs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with the SMTP server host of your institution
  port: 587, // Replace with the appropriate port number
  secure: false,
  auth: {
    user: "mysy@vpmp.ac.in", // Replace with your email address
    pass: "dclq bdqx iclq ksjj",
    // Replace with your email password
  },
});

export default async function sendEmail(base64Content, eno, date) {
  let pdfAttachment = fs.readFileSync(
    "D:/0-Projects-/WEBDEV/NEXT/mysy-college-certi/app/re/1.pdf"
  );

  const bufferContent = Buffer.from(base64Content, "base64");

  await transporter.sendMail({
    from: "mysy@vpmp.ac.in",
    to: "mysy@vpmp.ac.in",
    subject: eno,
    text: `MYSY College certificate ${date}`,
    attachments: [
      {
        filename: "document.pdf",
        content: bufferContent,
      },
    ],
  });
}
// xjcn exhb qvqm qtuj
