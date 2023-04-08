import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ErrorResponse } from './utility/response';
import { CategoryService } from './service/category-service';
import { CategoryRepository } from './repository/cateogry-repository';
import './utility';
import middy from '@middy/core';
import bodyParser from '@middy/http-json-body-parser';

const service = new CategoryService(new CategoryRepository());

export const handler = middy((event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
	const isRoot = event.pathParameters === null;

	switch (event.httpMethod.toLowerCase()) {
		case 'post':
			if (isRoot) return service.createCategory(event);
			break;
		case 'get':
			return isRoot ? service.getCategories(event) : service.getCategory(event);
		case 'put':
			if (!isRoot) return service.editCategory(event);
			break;
		case 'delete':
			if (!isRoot) return service.deleteCategory(event);
			break;
	}

	return service.ResponseWithError(event);
}).use(bodyParser());
