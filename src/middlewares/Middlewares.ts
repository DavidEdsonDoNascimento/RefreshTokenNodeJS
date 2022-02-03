import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtverify } from '../config/jwt';

export class Middlewares {
    /**
     * intercepts the exceptions and presents its message to the receiver
     * @param error error object
     * @param req request
     * @param res response
     * @param next next method
     * @returns JSON
     */
    static async exceptions(error: Error, req: Request, res: Response, next: NextFunction): Promise<any> {
        return res.status(404).json({
            status: "error",
            message: error.message
        });
    }

    static async ensureAuthorization(req: Request, res: Response, next: NextFunction): Promise<any> {
        const authToken = req.headers.authorization;

        if (!authToken) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const [, token] = authToken.split(" ");

        try {

            jwtverify(token);
            return next();

        } catch (err) {
            return res.status(401).json({
                message: "Token invalid"
            });
        }
    }
}