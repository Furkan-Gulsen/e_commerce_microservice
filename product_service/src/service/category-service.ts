import { APIGatewayEvent } from 'aws-lambda';
import { CategoryRepository } from '../repository/cateogry-repository';
import { ErrorResponse, SuccessResponse } from '../utility/response';
import { CategoryInput } from '../dto/category-input';
import { plainToClass } from 'class-transformer';
import { AppValidationError } from '../utility/errors';

export class CategoryService {
	_repository: CategoryRepository;
	constructor(repository: CategoryRepository) {
		this._repository = repository;
	}

	async ResponseWithError(event: APIGatewayEvent) {
		return ErrorResponse(404, new Error('method not allowed!'));
	}

	async createCategory(event: APIGatewayEvent) {
		const input = plainToClass(CategoryInput, event.body);
		const error = await AppValidationError(input);
		if (error) return ErrorResponse(404, error);
		const data = await this._repository.createCategory(input);
		return SuccessResponse(data);
	}

	async getCategories(event: APIGatewayEvent) {
		const type = event.queryStringParameters?.type;
		if (type === 'top') {
			const data = await this._repository.getTopCategories();
			return SuccessResponse(data);
		}
		const data = await this._repository.getAllCategories();
		return SuccessResponse(data);
	}

	async getCategory(event: APIGatewayEvent) {
		const productId = event.pathParameters?.id;
		if (!productId) return ErrorResponse(404, 'Category id not found');
		const data = await this._repository.getCategoryById(productId);
		return SuccessResponse(data);
	}

	async editCategory(event: APIGatewayEvent) {
		const productId = event.pathParameters?.id;
		if (!productId) return ErrorResponse(404, 'Category id not found');
		const input = plainToClass(CategoryInput, event.body);
		const error = await AppValidationError(input);
		if (error) return ErrorResponse(404, error);
		input.id = productId;
		const data = await this._repository.updateCategory(input);
		return SuccessResponse(data);
	}

	async deleteCategory(event: APIGatewayEvent) {
		const productId = event.pathParameters?.id;
		if (!productId) return ErrorResponse(404, 'Category id not found');
		const data = await this._repository.deleteCategory(productId);
		return SuccessResponse(data);
	}
}
