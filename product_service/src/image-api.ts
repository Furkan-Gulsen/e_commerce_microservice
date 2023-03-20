import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { v4 as uuidv } from 'uuid';
const S3Client = new S3();

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
	const file = event.queryStringParameters?.file;
	const fileName = `${uuidv()}__${file}`;
	const s3Params = {
		Bucket: process.env.BUCKET_NAME,
		Key: fileName,
		ContentType: 'image/jpeg',
	};
	const url = await S3Client.getSignedUrlPromise('putObject', s3Params);
	console.log('Upload URL: ', s3Params, url);

	return {
		statusCode: 200,
		body: JSON.stringify({
			url,
			key: fileName,
		}),
	};
};
