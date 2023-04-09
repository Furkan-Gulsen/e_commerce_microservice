import { Length } from 'class-validator';

export class ServiceInput {
	action: string;

	@Length(12, 24)
	productId: string;
}
