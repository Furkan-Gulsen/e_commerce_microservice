import { validate, ValidationError } from 'class-validator';

export const AppValidationError = async (input: any): Promise<ValidationError[] | false> => {
	const error = await validate(input, {
		validationError: { target: true },
	});
	if (error.length) {
		return error;
	}
	return false;
};
