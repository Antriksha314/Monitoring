import { Request, Response } from "express"
import { passwordValidation } from "../../../utils/validations";
import jwt from 'jsonwebtoken';
import { privateKey } from "../../../utils/token";
import { userRepository } from "../../../utils/repositories";
import bcrypt from "bcrypt";

export const ResetPassword = async (req: Request, res: Response) => {

    const { newPassword, confirmNewPassword } = req.body;

    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const { error } = passwordValidation.validate(req.body)

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            })
        }
        jwt.verify(token, privateKey, async (err: any, decode: any) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Token has been expired!'
                })
            } else {
                if (confirmNewPassword !== newPassword) {
                    return res.status(400).json({
                        success: false,
                        message: 'Password did not matched'
                    })
                }

                const user = await userRepository.findOne({ where: { email: decode?.email } });
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: 'User not found'
                    })
                }

                bcrypt.hash(newPassword, 10, async (err, hashedPassword) => {
                    if (err) {
                        return res.status(400).json({
                            success: false,
                            message: err
                        })
                    }

                    user.password = hashedPassword;
                    await userRepository.save(user)

                    return res.status(200).json({
                        success: true,
                        message: `You've reset your password successfully`
                    })


                })
            }


        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}