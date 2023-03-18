import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ErrorResponse } from './utility/response';
import { ProductService } from './service/product-service';
import { ProductRepository } from './repository/product-repository';
import './utility';

const service = new ProductService(new ProductRepository());

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
	const isRoot = event.pathParameters === null;

	switch (event.httpMethod.toLowerCase()) {
		case 'post':
			if (isRoot) return service.createProduct(event);
			break;
		case 'get':
			return isRoot ? service.getProducts(event) : service.getProduct(event);
		case 'put':
			if (!isRoot) return service.editProduct(event);
			break;
		case 'delete':
			if (!isRoot) return service.deleteProduct(event);
			break;
	}

	return ErrorResponse(404, 'Requested resource not found');
};
