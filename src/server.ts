import 'express-async-errors';
import express from 'express';
import { router } from './routes';
import { Middlewares } from './middlewares/Middlewares';

const app = express();

app.use(express.json());
app.use(router);
app.use(Middlewares.exceptions);

app.listen(3000, () => console.log('Server is running on port 3000'));