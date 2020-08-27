import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

const directory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory,
    storage: multer.diskStorage({
        destination: directory,
        filename(request, file, callback) {
            const fileHash = uuid();
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
