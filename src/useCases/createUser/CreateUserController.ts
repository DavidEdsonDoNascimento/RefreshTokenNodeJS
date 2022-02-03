import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {

    async handle(req: Request, res: Response): Promise<any> {

        const { username, name, password } = req.body;
        const createUserUseCase = new CreateUserUseCase();
        const user = await createUserUseCase.execute({
            name,
            username,
            password
        });
        return res.status(200).json(user);
    }
}

export { CreateUserController };