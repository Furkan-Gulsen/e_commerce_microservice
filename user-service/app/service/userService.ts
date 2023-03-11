import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { ErrorResponse, SuccessResponse } from '../utility/response';
import { UserRepository } from '../repository/userRepository';
import { autoInjectable } from 'tsyringe';
import { plainToClass } from 'class-transformer';
import { SignupInput } from '../models/dto/SignupInput';
import { AppValidationError } from '../utility/errors';
import { GetHashedPassword, GetSalt } from '../utility/password';

@autoInjectable()
export class UserService {
	repository: UserRepository;
	constructor(repository: UserRepository) {
		this.repository = repository;
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
			console.log('Error in UserService -> CreateUser -> error', error);
			return ErrorResponse(500, error);
		}
	}

	async UserLogin(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response UserLogin!',
		});
	}

	async VerifyUser(event: APIGatewayProxyEventV2) {
		return SuccessResponse({
			message: 'Response VerifyUser!',
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
