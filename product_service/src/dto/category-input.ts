import { IsNumber, Length } from 'class-validator';

export class CategoryInput {
	id: string;

	@Length(3, 128)
	name: string;

	parentId?: string;

	products: string[];

	displayOrder: number;

	imageUrl: string;
}

export class AddItemInput {
	@Length(3, 128)
	id: string;

	products: string[];
}
