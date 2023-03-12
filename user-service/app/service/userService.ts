import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { ErrorResponse, SuccessResponse } from '../utility/response';
import { UserRepository } from '../repository/userRepository';
import { autoInjectable } from 'tsyringe';
import { plainToClass } from 'class-transformer';
import { SignupInput } from '../models/dto/SignupInput';
import { AppValidationError } from '../utility/errors';
import { GetHashedPassword, GetSalt, GetToken, ValidatePassword, verifyToken } from '../utility/password';
import { LoginInput } from '../models/dto/LoginInput';
import { GenerateAccessCode } from '../utility/notification';
import { VerificationInput } from '../models/dto/UpdateInput';
import { TimeDifference } from '../utility/datahelper';

@autoInjectable()
export class UserService {
	repository: UserRepository;
	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	async ResponseWithError(event: APIGatewayProxyEventV2) {
		return ErrorResponse(404, 'Method Not Found');
	}

	// * User Creation & Validation & Login
	async CreateUser(event: APIGatewayProxyEventV2) {
		try {
			const input = plainToClass(SignupInput, event.body);
			const error = await AppValidationError(input);
			if (error) return ErrorResponse(404, error);

			const salt = await GetSalt();
			const hashedPassword = await GetHashedPassword(input.password, salt);
			const data = await this.repository.createAccount({
				email: input.email,
				password: hashedPassword,
				salt: salt,
				phone: input.phone,
				userType: 'BUYER',
			});

			return SuccessResponse(data);
		} catch (error) {
			console.log('Error in UserService -> CreateUser: ', error);
			return ErrorResponse(500, error);
		}
	}

	async UserLogin(event: APIGatewayProxyEventV2) {
		try {
			const input = plainToClass(LoginInput, event.body);
			const error = await AppValidationError(input);
			if (error) return ErrorResponse(404, error);

			const data = await this.repository.findAccount(input.email);
			const verified = await ValidatePassword(input.password, data.password, data.salt);
			if (!verified) return ErrorResponse(404, 'Password does not match!');
			const token = GetToken(data);
			return SuccessResponse({ token });
		} catch (error) {
			console.log('Error in UserService -> UserLogin: ', error);
			return ErrorResponse(500, error);
		}
	}

	async VerifyUser(event: APIGatewayProxyEventV2) {
		const token = event.headers.authorization;
		const payload = await verifyToken(token);
		if (!payload) return ErrorResponse(403, 'Authorization failed!');

		const input = plainToClass(VerificationInput, event.body);
		const error = await AppValidationError(input);
		if (error) return ErrorResponse(404, error);

		const { verification_code, expiry } = await this.repository.findAccount(payload.email);
		console.log('verification_code, expiry', verification_code, expiry);

		if (verification_code === parseInt(input.code)) {
			const currentTimme = new Date();
			const diff = TimeDifference(expiry, currentTimme.toISOString(), 'm');
			if (diff > 0) {
				console.log('verification code is valid');
				await this.repository.updateVerificationUser(payload.user_id);
			} else {
				return ErrorResponse(403, 'Verification code expired!');
			}
		} else {
			return ErrorResponse(403, 'Verification code does not match!');
		}

		return SuccessResponse({
			message: 'User Verified!',
		});
	}

	async GetVerificationToken(event: APIGatewayProxyEventV2) {
		const token = event.headers.authorization;
		const payload = await verifyToken(token);
		if (!payload) return ErrorResponse(403, 'Authorization failed!');
		const { code, expiry } = GenerateAccessCode();
		// * save on DB to confirm verification
		await this.repository.updateVerificationCode(payload.user_id, code, expiry);
		console.log('code, expiry', code, expiry);
		// const response = await SendVerificationCode(code, payload.phone);
		return SuccessResponse({
			message: 'Verification code is sent to your registered mobile number!',
		});
	}

	//* User Profile
	async CreateProfile(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response CreateProfile!',
		});
	}

	async EditProfile(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response EditProfile!',
		});
	}

	async GetProfile(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response GetProfile!',
		});
	}

	// * Cart Section
	async CreateCart(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response Cart!',
		});
	}

	async UpdateCart(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response UpdateCart!',
		});
	}

	async GetCart(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response GetCart!',
		});
	}

	// Payment Section
	async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response CreatePaymentMethod!',
		});
	}

	async GetPaymentMethod(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response GetPaymentMethod!',
		});
	}

	async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response UpdatePaymentMethod!',
		});
	}
}
