import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

interface SendEmailParams {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedToken = await bcrypt.hash(userId.toString(), salt);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailResponse = await transporter.sendMail({
      from: '"Tahir 👻" <admin@mrtahir.com>',
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click here to ${emailType === "VERIFY" ? "verify your email" : "reset your password"
        }: 

            ${emailType === "VERIFY"
          ? `<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a></p>`
          : `<a href="${process.env.DOMAIN}/createnewpassword?token=${hashedToken}">${process.env.DOMAIN}/createnewpassword?token=${hashedToken}</a></p>`
        }`,
    });

    return mailResponse;
  } catch (error) {
    console.log(error);
  }
};
