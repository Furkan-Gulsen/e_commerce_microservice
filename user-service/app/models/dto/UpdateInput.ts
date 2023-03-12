import { Length } from 'class-validator';

export class VerificationInput {
	@Length(6)
	code: string;
}
