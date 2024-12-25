import {
  S3Client,
  CreateBucketCommand,
  HeadBucketCommand,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const accessKeyId = process.env.MINIO_ACCESS_KEY || "minioadmin";
const secretAccessKey = process.env.MINIO_SECRET_KEY || "minioadmin";
const bucketName = process.env.MINIO_BUCKET_NAME || "fmtc-bucket";
const minioEndpoint = process.env.MINIO_ENDPOINT || "http://localhost:9000";

if (!accessKeyId || !secretAccessKey) {
  throw new Error("MinIO credentials are not defined.");
}

if (!bucketName) {
  throw new Error("Bucket name is not defined.");
}

const expiryTime = 7 * 24 * 60 * 60; // 7 days in seconds

export default class S3Bucket {
  private s3Client: S3Client;
  private bucketName: string;
  private expiryTime: number;

  constructor() {
    this.s3Client = new S3Client({
      endpoint: minioEndpoint, // Set MinIO endpoint
      //region: "us-east-1", // MinIO does not enforce regions; use a default value
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true, // Required for MinIO
    });
    this.bucketName = bucketName;
    this.expiryTime = expiryTime;
  }

  /**
   * Ensure the bucket exists. Creates the bucket if it does not exist.
   */
  async ensureBucketExists(): Promise<void> {
    try {
      await this.s3Client.send(new HeadBucketCommand({ Bucket: this.bucketName }));
      console.log(`Bucket "${this.bucketName}" already exists.`);
    } catch (error: any) {
      if (error.name === "NotFound" || error.name === "NoSuchBucket") {
        console.log(`Bucket "${this.bucketName}" does not exist. Creating it now.`);
        await this.s3Client.send(new CreateBucketCommand({ Bucket: this.bucketName }));
        console.log(`Bucket "${this.bucketName}" created successfully.`);
      } else {
        console.error("Error checking bucket existence:", error);
        throw error;
      }
    }
  }

  async deleteObjects(keys: string[]): Promise<void> {
    const command = new DeleteObjectsCommand({
      Bucket: this.bucketName,
      Delete: {
        Objects: keys.map((k) => ({ Key: k })),
      },
    });
    await this.s3Client.send(command);
  }

  async getObjectUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: this.expiryTime });
    return url;
  }

  async putObjectUrl(filename: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
      ContentType: contentType,
    });
    const url = await getSignedUrl(this.s3Client, command, { expiresIn: this.expiryTime });
    return url;
  }

  async uploadFile(filename: string, contentType: string, body: Buffer | ReadableStream ): Promise<void> {
    await this.ensureBucketExists(); // Ensure the bucket exists before uploading
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
      Body: body,
      ContentType: contentType,
    });
    await this.s3Client.send(command);
    console.log(`File "${filename}" uploaded successfully.`);
  }
}








// import { S3Client } from "@aws-sdk/client-s3";
// import { GetObjectCommand, PutObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const accessKeyId = process.env.AWS_ACCESS_KEY_ID || "";
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || "";
// const bucketName = process.env.AWS_BUCKET_NAME || "";

// if (!accessKeyId || !secretAccessKey) {
//   throw new Error("AWS credentials are not defined.");
// }

// if (!bucketName) {
//   throw new Error("S3 bucket name is not defined.");
// }

// const expiryTime = 7 * 24 * 60 * 60; // 7 days in seconds

// export default class S3Bucket {
//   private s3Client: S3Client;
//   private bucketName: string;
//   private expiryTime: number;

//   constructor() {
//     this.s3Client = new S3Client({
//       region: process.env.AWS_REGION, // Ensure this is the correct region
//       credentials: {
//         accessKeyId,
//         secretAccessKey,
//       },
//     });
//     this.bucketName = bucketName;
//     this.expiryTime = expiryTime;
//   }

//   async deleteObjects(keys: string[]): Promise<void> {
//     const command = new DeleteObjectsCommand({
//       Bucket: this.bucketName,
//       Delete: {
//         Objects: keys.map((k) => ({ Key: k })),
//       },
//     });
//     await this.s3Client.send(command);
//   }

//   async getObjectUrl(key: string): Promise<string> {
//     const command = new GetObjectCommand({
//       Bucket: this.bucketName,
//       Key: key,
//     });
//     const url = await getSignedUrl(this.s3Client, command, { expiresIn: this.expiryTime });
//     return url;
//   }

//   async putObjectUrl(filename: string, contentType: string): Promise<string> {
//     const command = new PutObjectCommand({
//       Bucket: this.bucketName,
//       Key: filename,
//       ContentType: contentType,
//     });
//     const url = await getSignedUrl(this.s3Client, command, { expiresIn: this.expiryTime });
//     return url;
//   }
// }
