import { container } from 'tsyringe';
import middy from '@middy/core';
import bodyParser from '@middy/http-json-body-parser';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { UserService } from '../service/userService';

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
		case 'POST':
			return service.VerifyUser(event);
		case 'GET':
			return service.GetVerificationToken(event);
		default:
			return service.ResponseWithError(event);
	}
}).use(bodyParser());

export const Profile = middy((event: APIGatewayProxyEventV2) => {
	const httpMethod = event.requestContext.http.method.toUpperCase();
	switch (httpMethod) {
		case 'POST':
			return service.CreateProfile(event);
		case 'PUT':
			return service.EditProfile(event);
		case 'GET':
			return service.GetProfile(event);
		default:
			return service.ResponseWithError(event);
	}
}).use(bodyParser());

export const Cart = middy((event: APIGatewayProxyEventV2) => {
	const httpMethod = event.requestContext.http.method.toUpperCase();
	switch (httpMethod) {
		case 'POST':
			return service.CreateCart(event);
		case 'PUT':
			return service.UpdateCart(event);
		case 'GET':
			return service.GetCart(event);
		default:
			return service.ResponseWithError(event);
	}
}).use(bodyParser());

export const Payment = middy((event: APIGatewayProxyEventV2) => {
	const httpMethod = event.requestContext.http.method.toUpperCase();
	switch (httpMethod) {
		case 'POST':
			return service.CreatePaymentMethod(event);
		case 'PUT':
			return service.UpdatePaymentMethod(event);
		case 'GET':
			return service.GetPaymentMethod(event);
		default:
			return service.ResponseWithError(event);
	}
}).use(bodyParser());
