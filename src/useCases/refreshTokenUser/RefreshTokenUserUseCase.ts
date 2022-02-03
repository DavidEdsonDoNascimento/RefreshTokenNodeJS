import dayjs from "dayjs";
import { client } from "../../prisma/client"
import { GenerateRefreshTokenProvider } from "../../provider/GenerateRefreshToken";
import { GenerateTokenProvider } from "../../provider/GenerateTokenProvider";

class RefreshTokenUserUseCase {
    async execute(refreshTokenId: string): Promise<any> {
        const refreshToken = await client.refreshToken.findFirst({
            where: {
                id: refreshTokenId
            }
        });

        if (!refreshToken) {
            throw new Error('Refresh token invalid.');
        }

        // verificação se a data já expirou
        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
        const generateTokenProvider = new GenerateTokenProvider();
        const token = await generateTokenProvider.execute(refreshToken.userId);

        if (refreshTokenExpired) {
            // remove qualquer refresh token q exista na base de dados com o userId informado
            await client.refreshToken.deleteMany({
                where: {
                    userId: refreshToken.userId
                }
            });

            // gerar um novo refresh token
            const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();
            const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId);
            return { token, refreshToken: newRefreshToken };
        }

        return { token };
    }
}

export { RefreshTokenUserUseCase }