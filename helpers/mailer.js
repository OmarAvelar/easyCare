require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'omar.avelar.f@gmail.com',
    pass: 'addodd902347abd.'
  },
  });

exports.welcomeMail = (username, email) => {
  transporter
    .sendMail({
      from: "Easy Care",
      to: email,
      subject: "Bienvenido a Easy Care",
      html: `
      <h2>Bienvenido ${username} a Easy Care, </h2>
      <p>Ahora podrás encontrar el mejor servicio médico a tu alcance</p>
    `
    })
    .then(info => {
      console.log(info);
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
};