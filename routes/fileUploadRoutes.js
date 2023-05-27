import { Router } from 'express';
import multer from 'multer';
import checkAuth from '../utils/checkAuth.js';

const router = Router();
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

// Define the route
router.post('/', checkAuth, upload.single('image'), (req, res) => {
	res.json({ url: `/uploads/${req.file.originalname}` });
});

export default router;