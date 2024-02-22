const nodemailer = require("nodemailer");
require("dotenv").config();
const link = process.env.PROJECT_LINK;
const transportor = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const getEmailForPasswordChange = (name, link) => {
  return `<span>Dear ${name}</span> <br> <br>
  <span>Please click  below button to create new Password</span><br> 
  <a href="${link}"><button style="background-color: #555555;
  border: none;
  color: white;
  padding: 12px 26px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  border-radius:5px;
  cursor: pointer;">Click here</button></a>

  <br> 
  <br> 
  <span>Thanks and Regards,</span><br> 
  <span>If you did not forget your password, you can ignore this email.</span>`;
};

const emailSubjectForPasswordChange = (name) => {
  return `${name} You can Change Your Password`;
};

const sendEmail = async (email, subject, htmlcontent) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${email}`,
    subject: subject,
    html: htmlcontent,
  };
  await transportor.sendMail(mailOptions);
};

// Eamil send using nodemailer
const sendEmailToGenerate_newPassword = async (name, email, link) => {
  await sendEmail(
    email,
    emailSubjectForPasswordChange(name),
    getEmailForPasswordChange(name, link)
  );
};

const sentOTP = async (otp,email) => {
  await sendEmail(
    email,
    `Send OTP successfully`,
    `You OTP is ${otp}`
  );
};



module.exports = {
  sendEmailToGenerate_newPassword,
  link,
  sentOTP
};
