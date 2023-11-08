import { setCookie, parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

export function handleAuthenticationResponse(data) {
    try {
        setCookie(null, 'nextauth_token', data.token, {
            maxAge: 60 * 60 * 8, // 1 hora
            path: '/',
        });

        const user = jwt.decode(data.token).tipo_usuario;
        setCookie(null, 'user', user, {
            maxAge: 60 * 60 * 8, // 1 hora
            path: '/',
        });
    } catch (err) {
        console.log(err);
    }
}

export function isAuthenticated() {
    const { 'nextauth_token': token } = parseCookies();
    return !!token;
}
