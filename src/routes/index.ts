import { Router } from 'express';
import { Middlewares } from '../middlewares/Middlewares';
import { AuthenticateUserController } from '../useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { Request, Response } from 'express';
import { RefreshTokenUserController } from '../useCases/refreshTokenUser/RefreshTokenUserController';

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

router
    .post('/users', createUserController.handle)
    .post('/login', authenticateUserController.handle)
    .post('/refresh-token', refreshTokenUserController.handle)
    .get('/courses', Middlewares.ensureAuthorization, (req: Request, res: Response) => {
        return res.status(200).json([
            { id: 1, name: 'NodeJS' },
            { id: 2, name: 'ReactJS' },
            { id: 3, name: 'Flutter' }
        ])
    });

export { router };