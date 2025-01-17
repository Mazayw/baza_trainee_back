import express from 'express';
import mongoose from 'mongoose';

import { config } from 'dotenv';

import swaggerDocs from './swagger.js';

import authRoutes from './routes/authRoutes.js';
import fileUploadRoutes from './routes/fileUploadRoutes.js';
import partnersRoutes from './routes/partnersRoutes.js';
import teamMembersRoutes from './routes/teamMembersRoutes.js';
import testimonialsRoutes from './routes/testimonialsRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';

config();

const { PORT, USER_NAME, PASSWORD_DB } = process.env;

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
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`Wow! It works! Server running on port ${port}`);
});

app.use('/auth', authRoutes);
app.use('/upload', fileUploadRoutes);
app.use('/partners', partnersRoutes);
app.use('/members', teamMembersRoutes);
app.use('/testimonials', testimonialsRoutes);
app.use('/projects', projectsRoutes);
app.use('/roles', rolesRoutes);

const port = PORT || 3000;
app.listen(port, (error) => {
	if (error) {
		return console.log('Something went wrong', error);
	}
	console.log(`Server started on port ${port}`);
});
swaggerDocs(app, port);
