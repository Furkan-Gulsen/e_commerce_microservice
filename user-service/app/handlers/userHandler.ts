import { container } from 'tsyringe';
import middy from '@middy/core';
import bodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { UserService } from '../service/userService';
import { HttpTypes } from '../utility/httpTypes';

const service = container.resolve(UserService);

export const Signup = middy((event: APIGatewayProxyEventV2) => {
	return service.CreateUser(event);
}).use(bodyParser());

export const Login = middy((event: APIGatewayProxyEventV2) => {
	return service.UserLogin(event);
}).use(bodyParser());

export const Verify = middy((event: APIGatewayProxyEventV2) => {
	const httpMethod = event.requestContext.http.method.toUpperCase();
	switch (httpMethod) {
		case HttpTypes.post:
			return service.VerifyUser(event);
		case HttpTypes.get:
			return service.GetVerificationToken(event);
		default:
			return service.ResponseWithError(event);
	}
}).use(bodyParser());

export const Profile = middy((event: APIGatewayProxyEventV2) => {
	const httpMethod = event.requestContext.http.method.toUpperCase();
	switch (httpMethod) {
		case HttpTypes.post:
			return service.CreateProfile(event);
		case HttpTypes.put:
			return service.EditProfile(event);
		case HttpTypes.get:
			return service.GetProfile(event);
		default:
			return service.ResponseWithError(event);
	}
}).use(bodyParser());

export const Cart = middy((event: APIGatewayProxyEventV2) => {
	const httpMethod = event.requestContext.http.method.toUpperCase();
	switch (httpMethod) {
		case HttpTypes.post:
			return service.CreateCart(event);
		case HttpTypes.put:
			return service.UpdateCart(event);
		case HttpTypes.get:
			return service.GetCart(event);
		default:
			return service.ResponseWithError(event);
	}
}).use(bodyParser());

export const Payment = middy((event: APIGatewayProxyEventV2) => {
	const httpMethod = event.requestContext.http.method.toUpperCase();
	switch (httpMethod) {
		case HttpTypes.post:
			return service.CreatePaymentMethod(event);
		case HttpTypes.put:
			return service.UpdatePaymentMethod(event);
		case HttpTypes.get:
			return service.GetPaymentMethod(event);
		default:
			return service.ResponseWithError(event);
	}
}).use(bodyParser());
