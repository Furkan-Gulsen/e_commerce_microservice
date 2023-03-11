import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { SuccessResponse } from '../utility/response';
import { UserRepository } from '../repository/userRepository';
import { autoInjectable } from 'tsyringe';
@autoInjectable()
export class UserService {
	repository: UserRepository;
	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	// * User Creation & Validation & Login
	async CreateUser(event: APIGatewayProxyEventV2) {
		const body = event.body;
		console.log(body);
		await this.repository.CreateUserOperation();
		return SuccessResponse({
			message: 'Response CreateUser!',
		});
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
