import { client } from '../../prisma/client';
import { hash } from 'bcryptjs';
import { UserInput, UserRequest } from '../../types/user';

interface ICreateUser {
    execute(data: UserRequest): Promise<UserInput>;
}

class CreateUserUseCase implements ICreateUser {

    async execute({ name, username, password }: UserRequest): Promise<UserInput> {
        // verificar se o usuário existe
        const userExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if (userExists) {
            throw new Error('User already exists!');
        }

        const passHash = await hash(password, 8);

        // cadastrar o usuário
        const user: UserInput = await client.user.create({
            data: {
                name,
                username,
                password: passHash
            }
        });

        return user;
    }

}

export { CreateUserUseCase };