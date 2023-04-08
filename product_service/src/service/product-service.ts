import { APIGatewayEvent } from 'aws-lambda';
import { plainToClass } from 'class-transformer';
import { ProductInput } from '../dto/product-input';
import { ProductRepository } from '../repository/product-repository';
import { AppValidationError } from '../utility/errors';
import { ErrorResponse, SuccessResponse } from '../utility/response';
import { CategoryRepository } from '../repository/cateogry-repository';

export class ProductService {
	_repository: ProductRepository;
	constructor(repository: ProductRepository) {
		this._repository = repository;
	}

	async createProduct(event: APIGatewayEvent) {
		const input = plainToClass(ProductInput, JSON.parse(event.body!));
		const error = await AppValidationError(input);
		if (error) return ErrorResponse(404, error);
		const data = await this._repository.createProduct(input);
		await new CategoryRepository().addItem({ id: input.category_id, products: [data._id] });
		return SuccessResponse(data);
	}

	async getProducts(event: APIGatewayEvent) {
		const data = await this._repository.getAllProducts();
		return SuccessResponse(data);
	}

	async getProduct(event: APIGatewayEvent) {
		const productId = event.pathParameters?.id;
		if (!productId) return ErrorResponse(404, 'Product id not found');
		const data = await this._repository.getProductById(productId);
		return SuccessResponse(data);
	}

	async editProduct(event: APIGatewayEvent) {
		const productId = event.pathParameters?.id;
		if (!productId) return ErrorResponse(404, 'Product id not found');

		const input = plainToClass(ProductInput, JSON.parse(event.body!));
		const error = await AppValidationError(input);
		if (error) return ErrorResponse(404, error);
		input.id = productId;
		const data = await this._repository.updateProduct(input);
		return SuccessResponse(data);
	}

	async deleteProduct(event: APIGatewayEvent) {
		const productId = event.pathParameters?.id;
		if (!productId) return ErrorResponse(404, 'Product id not found');
		const { category_id, deleteRes } = await this._repository.deleteProduct(productId);
		await new CategoryRepository().removeItem({ id: category_id, products: [productId] });
		return SuccessResponse(deleteRes);
	}
}
