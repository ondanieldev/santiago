import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
const uploadFolder = path.resolve(__dirname, '..', '..', 'tmp', 'upload');

export default {
    tmpFolder,
    uploadFolder,
    storage: multer.diskStorage({
        destination: tmpFolder,
        filename(request, file, callback) {
            const fileHash = uuid();
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
