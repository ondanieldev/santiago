import path from 'path';
import fs from 'fs';
import mime from 'mime';
import S3 from 'aws-sdk/clients/s3';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class AmazonS3StorageProvider implements IStorageProvider {
    private clientS3: S3;

    constructor() {
        this.clientS3 = new S3({
            region: uploadConfig.config.s3.region,
        });
    }

    public async saveFile(file: string): Promise<string> {
        const filePath = path.resolve(uploadConfig.tmpFolder, file);

        const ContentType = mime.getType(filePath);

        if (!ContentType) {
            throw new Error('arquivo não encontrado!');
        }

        const fileContent = await fs.promises.readFile(filePath);

        await this.clientS3
            .putObject({
                Bucket: uploadConfig.config.s3.bucket,
                Key: file,
                ACL: uploadConfig.config.s3.permission,
                Body: fileContent,
                ContentType,
            })
            .promise();

        try {
            await fs.promises.stat(filePath);

            await fs.promises.unlink(filePath);
        } catch {}

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.clientS3
            .deleteObject({
                Bucket: uploadConfig.config.s3.bucket,
                Key: file,
            })
            .promise();
    }
}

export default AmazonS3StorageProvider;
