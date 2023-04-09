import { ProductInput } from '../dto/product-input';
import { ProductDoc, products } from '../models';

export class ProductRepository {
	constructor() {}

	async createProduct({ name, description, category_id, image_url, price }: ProductInput): Promise<ProductDoc> {
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
		return (await products.findById(id)) as ProductDoc;
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
		const { category_id } = (await products.findById(_id)) as ProductDoc;
		const deleteRes = products.findByIdAndDelete(_id);
		return { category_id, deleteRes };
	}
}
