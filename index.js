import express from 'express';
import mongoose from 'mongoose';
import {
	registerValidation,
	loginValidation,
	partnerCreateValidation,
} from './utils/validations.js';
import { config } from 'dotenv';
import checkAuth from './utils/checkAuth.js';

import {
	UserController,
	PartnersController,
	ProjectsController,
} from './controllers/index.js';

import multer from 'multer';

config();

const { PORT, USER_NAME, PASSWORD_DB, SECRET_KEY } = process.env;

const dbURL = `mongodb+srv://${USER_NAME}:${PASSWORD_DB}@cluster0.2x4mz6m.mongodb.net/baza?retryWrites=true&w=majority`;

mongoose
	.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

const app = express();
const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
	res.send(`Server running on port ${port}`);
});

app.get('/auth/user', checkAuth, UserController.getUserInfo);
app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({ url: `/uploads/${req.file.originalname}` });
});

app.get('/partners', PartnersController.getAll);
app.get('/partners/:id', PartnersController.getOneById);
app.post(
	'/partners',
	checkAuth,
	partnerCreateValidation,
	PartnersController.create
);
app.delete('/partners/:id', checkAuth, PartnersController.removeOneById);
app.patch(
	'/partners/:id',
	checkAuth,
	partnerCreateValidation,
	PartnersController.updateOneById
);

app.post(
	'/projects',
	checkAuth,
	partnerCreateValidation,
	PartnersController.create
);

const port = PORT || 3000;
app.listen(port, (error) => {
	if (error) {
		return console.log('Something went wrong', error);
	}
	console.log(`Server started on port ${port}`);
});
