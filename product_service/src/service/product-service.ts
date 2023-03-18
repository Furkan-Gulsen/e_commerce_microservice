import { ProductRepository } from '../repository/product-repository';
import { SuccessResponse } from '../utility/response';

export class ProductService {
	_repository: ProductRepository;
	constructor(repository: ProductRepository) {
		this._repository = repository;
	}

	async createProduct() {
		return SuccessResponse({ message: 'product created!' });
	}

	async getProducts() {
		return SuccessResponse({ message: 'get products!' });
	}

	async getProduct() {
		return SuccessResponse({ message: 'get product!' });
	}

	async editProduct() {
		return SuccessResponse({ message: 'edit product!' });
	}

	async deleteProduct() {
		return SuccessResponse({ message: 'delete product!' });
	}
}
