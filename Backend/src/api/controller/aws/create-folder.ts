import { Request, Response } from "express";

import fs from 'fs';
import AWS from 'aws-sdk';
const fileName = 'src/Apple-logo.png';

export const CreateFolder = async (req: any, res: Response) => {

    // fs.writeFile("src/test.txt", "Hey there!", function(err: any) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("The file was saved!");
    // }); 

    try {
        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        const blob = fs.readFileSync(fileName)

        // await fs.readFile(fileName, async (err: any, data: any) => {
        //     console.log('data', data)
        //     console.log('blob', blob)
        //     if (err) {
        //         return res.status(400).json({
        //             success: false,
        //             message: err
        //         })
        //     }

            const params = {
                Bucket: 'test-bucket-7th-mar',
                Key: 'Apple-logo.png',
                Body: blob,
                ContentType: 'image/png',
            };
            await s3.upload(params, function (s3Err: any, data: any) {
        console.log('s3Err', s3Err)

                if (s3Err) {
                    return res.status(400).json({
                        success: false,
                        message: s3Err
                    })
                }
                return res.status(200).json({
                    success: true,
                    message: `File uploaded successfully at ${data.Location}`
                })
            });
        // });

    } catch (error) {
        console.log('error', error)
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}