import { AppError } from "backend-error-handler";
import jwt, { JwtPayload } from "jsonwebtoken";


const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRES_IN as string;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRES_IN as string;

export const generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiry });
}

export const generateRefreshToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExpiry });
}

export const generateAccessAndRefreshToken = (payload: JwtPayload): { accessToken: string, refreshToken: string } => {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload)
    }
}


export const verifyRefreshToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, refreshTokenSecret) as JwtPayload;
    } catch (error) {
        throw AppError.invalidCredentials("Invalid refresh token");
    }
}