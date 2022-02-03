import { jwtsign } from "../config/jwt";

class GenerateTokenProvider {
    async execute(userId: string): Promise<any> {
        const token = jwtsign({
            user: userId
        });

        return token;
    }
}

export { GenerateTokenProvider }