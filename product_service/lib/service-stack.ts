import { Duration } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { join } from 'path';

interface ServiceProps {
	bucket?: any;
}

export class ServiceStack extends Construct {
	public readonly productService: NodejsFunction;
	public readonly categoryService: NodejsFunction;
	public readonly dealsService: NodejsFunction;

	constructor(scope: Construct, id: string, props: ServiceProps) {
		super(scope, id);
		const nodeJsFunctionProps: NodejsFunctionProps = {
			// * The "bundling" attribute specifies that the function must contain external modules.
			// * This feature allows the "aws-sdk" module to be used by the function.
			bundling: {
				externalModules: ['aws-sdk'],
			},
			environment: {
				BUCKET_NAME: 'OUR_BUCKET_ARN',
			},
			runtime: Runtime.NODEJS_16_X,
			timeout: Duration.seconds(10),
		};

		this.productService = new NodejsFunction(this, 'productLambda', {
			entry: join(__dirname, '/../src/product-api.ts'),
			...nodeJsFunctionProps,
		});

		this.categoryService = new NodejsFunction(this, 'categoryLambda', {
			entry: join(__dirname, '/../src/category-api.ts'),
			...nodeJsFunctionProps,
		});

		this.dealsService = new NodejsFunction(this, 'dealsLambda', {
			entry: join(__dirname, '/../src/deals-api.ts'),
			...nodeJsFunctionProps,
		});
	}
}
