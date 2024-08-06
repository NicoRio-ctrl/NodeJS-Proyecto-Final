import crypto from 'node:crypto'

export const secret = (async () => {
    const secret = crypto.randomBytes(64).toString('hex');
    return secret;
});