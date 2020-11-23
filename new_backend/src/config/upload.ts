import multer, { StorageEngine } from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = path.resolve(__dirname, '..', '..', 'tmp', 'upload');

interface IUploadConfig {
    tmpFolder: string;
    uploadFolder: string;
    driver: 'disk' | 's3';
    multer: {
        storage: StorageEngine;
    };
    config: {
        disk: {};
        s3: {
            region: string;
            bucket: string;
            permission: string;
            baseURL: string;
        };
    };
}

export default {
    tmpFolder,
    uploadFolder,
    driver: process.env.STORAGE_PROVIDER || 'disk',
    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = v4();
                const fileName = `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            },
        }),
    },
    config: {
        disk: {},
        s3: {
            region: process.env.AWS_DEFAULT_REGION,
            bucket: process.env.AWS_S3_BUCKET,
            permission: process.env.AWS_S3_PERMISSION,
            baseURL: process.env.AWS_S3_URL,
        },
    },
} as IUploadConfig;
