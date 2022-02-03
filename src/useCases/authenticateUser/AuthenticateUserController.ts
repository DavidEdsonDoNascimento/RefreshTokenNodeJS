import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
    async handle(req: Request, res: Response): Promise<any> {

        const { username, password } = req.body;
        const authenticateUserUseCase = new AuthenticateUserUseCase();
        const token = await authenticateUserUseCase.execute({
            username,
            password
        });
        return res.status(200).json(token);
    }
}

export { AuthenticateUserController }