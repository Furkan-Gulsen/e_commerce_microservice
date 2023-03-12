import twilio from 'twilio';

const accountSid = '';
const authToken = '';

// const client = twilio(accountSid, authToken);

export const GenerateAccessCode = () => {
	const code = Math.floor(10000 + Math.random() * 900000);
	let expiry = new Date();
	expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
	console.log('code: ', code);
	return { code, expiry };
};

export const SendVerificationCode = async (code: number, toPhoneNumber: string) => {
	let message = `Your verification code is ${code}`;
	try {
		// const result = await client.messages.create({
		// 	body: message,
		// 	from: '+12058838046',
		// 	to: toPhoneNumber,
		// });
		return message;
	} catch (error) {
		console.log(error);
	}
};
