const nodemailer = require("nodemailer");
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async({email, html}) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.PASSWORD,
        },
      });
        const info = await transporter.sendMail({
          from: '"Cửa hàng của SÔ LEE" <no-reply@cuahangcuatuine.com>',
          to: email, 
          subject: "Cập nhật lại mật khẩu...", 
          text: "Đây là link mà cửa hàng cung cấp cho bạn lấy lại mật khẩu. Vui lòng nhấp vào liên kết: ", 
          html: html, 
        });
});

exports.module = {
    sendMail
}