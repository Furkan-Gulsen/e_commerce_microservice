import { ProductInput } from '../dto/product-input';
import { ProductDoc, products } from '../models/product-model';

export class ProductRepository {
	constructor() {}

	async createProduct({ name, description, category_id, image_url, price }: ProductInput) {
		return products.create({
			name,
			description,
			category_id,
			image_url,
			price,
			availability: true,
		});
	}

	async getAllProducts(offset = 0, pages?: number) {
		return products
			.find()
			.skip(offset)
			.limit(pages ? pages : 500);
	}

	async getProductById(id: string) {
		return products.findById(id);
	}

	async updateProduct({ id, name, description, category_id, image_url, price, availability }: ProductInput) {
		let existingProduct = (await this.getProductById(id)) as ProductDoc;
		existingProduct.name = name;
		existingProduct.description = description;
		existingProduct.category_id = category_id;
		existingProduct.image_url = image_url;
		existingProduct.price = price;
		existingProduct.availability = availability;
		return existingProduct.save();
	}

	async deleteProduct(_id: string) {
		return products.findByIdAndDelete(_id);
	}
}
