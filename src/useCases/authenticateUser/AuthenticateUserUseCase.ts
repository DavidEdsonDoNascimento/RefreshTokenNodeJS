import { compare } from "bcryptjs";
import { client } from "../../prisma/client";
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";
import { UserLogin } from "../../types/user";

class AuthenticateUserUseCase {
    async execute({ username, password }: UserLogin): Promise<any> {

        // Verificar se usuario existe
        const userExists = await client.user.findFirst({
            where: {
                username
            }
        });

        if (!userExists) {
            throw new Error('User or password incorrect');
        }

        // verificar se a senha confere
        const passMatch = await compare(password, userExists.password);
        if (!passMatch) {
            throw new Error('User or password incorrect');
        }
        // gerar token
        const generateToken = new GenerateTokenProvider();
        const token = generateToken.execute(userExists.id);

        // deleta qualquer refresh token q exista
        await client.refreshToken.deleteMany({
            where: {
                userId: userExists.id
            }
        });

        // refresh token
        const generateRefreshToken = new GenerateRefreshTokenProvider();
        const refreshToken = await generateRefreshToken.execute(userExists.id);

        return { token, refreshToken };
    }
}

export { AuthenticateUserUseCase }