import jwt from 'jsonwebtoken';

const JSONWKEY = process.env.JSONWKEY;

// Función para verificar y decodificar el token JWT
export function verifyAndDecodeJWT(tokenJWT) {
    try {
        const decodedToken = jwt.verify(tokenJWT, JSONWKEY);
        return decodedToken;
    } catch (error) {
        console.error('Error al decodificar el token JWT:', error);
        return null;
    }
}