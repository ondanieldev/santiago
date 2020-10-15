import multer, { StorageEngine } from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = path.resolve(__dirname, '..', '..', 'tmp', 'upload');

interface IUploadConfig {
    tmpFolder: string;
    uploadFolder: string;
    driver: 'disk';
    multer: {
        storage: StorageEngine;
    };
    config: {
        disk: {};
    };
}

export default {
    tmpFolder,
    uploadFolder,
    driver: 'disk',
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
    },
} as IUploadConfig;
