import { Response } from "express";

const jwt = require('jsonwebtoken');


export const privateKey = "kfchauytwiudchnfoiwrcuhtibuh"
const expireTime = process.env.INVITE_TOKEN_EXPIRE_TIME || '1m'

export const generateToken = <T = {}>(body: T) => {
    const token = jwt.sign(body, privateKey);
    return token
}
export const limitedTimeToken = <T = {}>(body: T) => {
    const token = jwt.sign(body, privateKey, {
        expiresIn: expireTime
    });
    return token
}

export const verifiedAdminToken = async (res: Response, token: string) => {
    try {

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Login required"
            })
        }

        await jwt.verify(token, privateKey, function (err: any, decoded: { email: string, role: string }) {
            if (err.message === "invalid signature") {
                return res.status(400).json({
                    success: false,
                    message: "Unauthorized user"
                })
            } else if (decoded.role === 'admin') {
                return true
            }
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }

}

export const verifyToken = async (res: Response, token: string) => {
    if (token) {
        try {
            return jwt.verify(token, privateKey);
        } catch (err: any) {
            return res.status(400).json({
                success: false,
                mesage: err.message === "invalid signature" ? "Unauthorized user" : err
            });
        }
    }
}
