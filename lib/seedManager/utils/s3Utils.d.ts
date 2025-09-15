import AWS from "aws-sdk";
export declare function ensureBucketExists(s3: AWS.S3, bucket: string): Promise<void>;
export declare function storeInS3(s3: AWS.S3, bucket: string, key: string, data: Record<string, any>): Promise<void>;
