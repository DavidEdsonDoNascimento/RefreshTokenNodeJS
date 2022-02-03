import { sign, verify } from 'jsonwebtoken';

const SECRET = 'd8e70055-c40d-4e87-be94-28db692a4a98';

export const jwtsign = payload => sign(payload, SECRET, { expiresIn: '20s' });
export const jwtverify = (token: string) => verify(token, SECRET);