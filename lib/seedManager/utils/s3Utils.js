"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureBucketExists = ensureBucketExists;
exports.storeInS3 = storeInS3;
async function ensureBucketExists(s3, bucket) {
    try {
        await s3.headBucket({ Bucket: bucket }).promise();
    }
    catch (err) {
        if (err.statusCode === 404) {
            await s3.createBucket({ Bucket: bucket }).promise();
        }
        else {
            throw err;
        }
    }
}
async function storeInS3(s3, bucket, key, data) {
    await s3.putObject({
        Bucket: bucket,
        Key: key,
        Body: JSON.stringify(data),
        ContentType: "application/json",
    }).promise();
}
