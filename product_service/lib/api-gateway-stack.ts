import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { IFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { aws_apigateway } from 'aws-cdk-lib';

interface ApiGatewayStackProps {
	productService: IFunction;
	categoryService: IFunction;
	dealsService: IFunction;
	imageService: IFunction;
	queueService: IFunction;
}

interface ResourceType {
	name: string;
	methods: string[];
	child?: ResourceType;
}

export class ApiGatewayStack extends Construct {
	constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
		super(scope, id);
		this.addResource('product', props);
	}

	addResource(serviceName: string, { categoryService, dealsService, productService, imageService, queueService }: ApiGatewayStackProps) {
		const apgw = new aws_apigateway.RestApi(this, `${serviceName}-ApiGtw`);

		// product/{id}
		this.createEndpoints(productService, apgw, {
			name: 'product',
			methods: ['GET', 'POST'],
			child: {
				name: '{id}',
				methods: ['GET', 'PUT', 'DELETE'],
			},
		});

		// product/{id}
		this.createEndpoints(categoryService, apgw, {
			name: 'category',
			methods: ['GET', 'POST'],
			child: {
				name: '{id}',
				methods: ['GET', 'PUT', 'DELETE'],
			},
		});

		// product/{id}
		this.createEndpoints(dealsService, apgw, {
			name: 'deals',
			methods: ['GET', 'POST'],
			child: {
				name: '{id}',
				methods: ['GET', 'PUT', 'DELETE'],
			},
		});

		// product/{id}
		this.createEndpoints(imageService, apgw, {
			name: 'uploader',
			methods: ['GET'],
		});

		this.createEndpoints(queueService, apgw, {
			name: 'products-queue',
			methods: ['POST'],
		});
	}

	createEndpoints(handler: IFunction, resource: RestApi, { name, methods, child }: ResourceType) {
		const lambdaFunction = new LambdaIntegration(handler);
		const rootResource = resource.root.addResource(name);

		methods.forEach((item) => {
			rootResource.addMethod(item, lambdaFunction);
		});

		if (child) {
			const childResource = rootResource.addResource(child.name);
			child.methods.map((item) => {
				childResource.addMethod(item, lambdaFunction);
			});
		}
	}
}
