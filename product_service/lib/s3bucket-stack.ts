import { RemovalPolicy } from 'aws-cdk-lib';
import { BlockPublicAccess, Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class S3BucketStack extends Construct {
	public readonly bucket: Bucket;

	constructor(scope: Construct, id: string) {
		super(scope, id);
		this.bucket = new Bucket(scope, `${id}-bucket`, {
			blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
			encryption: BucketEncryption.S3_MANAGED,
			enforceSSL: true,
			versioned: false,
			removalPolicy: RemovalPolicy.DESTROY,
		});
	}
}
