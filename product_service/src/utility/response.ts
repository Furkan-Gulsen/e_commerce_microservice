const formatResponse = (statusCode: number, message: string, data: unknown) => {
	if (data) {
		return {
			statusCode,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'Application/json',
			},
			body: JSON.stringify({
				message,
				data,
			}),
		};
	} else {
		return {
			statusCode,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'Application/json',
			},
			body: JSON.stringify({
				message,
			}),
		};
	}
};

export const SuccessResponse = (data: Object) => {
	return formatResponse(200, 'success', data);
};

export const ErrorResponse = (code = 1000, error: unknown) => {
	if (Array.isArray(error)) {
		const errorObject = error[0].constraints;
		const errorMessage = errorObject[Object.keys(errorObject)[0] || 'Error Occured'];
		return formatResponse(code, errorMessage, errorMessage);
	}
	return formatResponse(code, `${error}`, error);
};
