import nodemailer from 'nodemailer';
import 'dotenv/config';

const mailOption = {
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
};

const transporter = nodemailer.createTransport(mailOption);

export const sendMail = async (to, subject, message) => {
	const result = await transporter.sendMail({
		from: 'etrigosg@ufpso.edu.co',
		to: to,
		subject: subject,
		html : message
	});
	return result;
}
