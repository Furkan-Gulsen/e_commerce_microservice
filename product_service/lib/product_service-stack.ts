import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGatewayStack } from './api-gateway-stack';
import { S3BucketStack } from './s3bucket-stack';
import { ServiceStack } from './service-stack';

export class ProductServiceStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);
		const { bucket } = new S3BucketStack(this, 'productImages');
		const { productService, categoryService, dealsService, imageService } = new ServiceStack(this, 'ProductService', {
			bucket: bucket.bucketName,
		});
		bucket.grantReadWrite(imageService);
		new ApiGatewayStack(this, 'ProductApiGateway', {
			productService,
			categoryService,
			dealsService,
			imageService,
		});
	}
}
