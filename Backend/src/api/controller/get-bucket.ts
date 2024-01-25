import { Request, Response } from "express";
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");

function convertToTreeStructure(data: any) {
  const tree = {};
  for (const item of data) {
    const path = item.Key.split("/");
    let currentNode = tree;
    for (const folder of path) {
      // @ts-ignore
      if (!currentNode[folder]) {
        // @ts-ignore
        currentNode[folder] = {};
      }
      // @ts-ignore
      currentNode = currentNode[folder];
    }
    // @ts-ignore
    currentNode[item.Key] = item;
  }
  return tree;
}

export const getBucket = async (req: Request, res: Response) => {
  try {
    const config = {
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    };

    const s3Client = new S3Client(config);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
    };

    const command = new ListObjectsV2Command(params);
    const response = await s3Client.send(command);

    const folderPath = "/my-folder";
    const folder = { name: folderPath, children: [] };

    const finalData = await convertToTreeStructure(response.Contents);

    return res.status(200).json({
      success: true,
      data: { bucket: finalData },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
