import { Request, Response } from "express";
import { userRepository } from "../../../utils/repositories";
import { privateKey } from "../../../utils/token";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { StatusEnum } from '../../../utils/enums'

export const SetPassword = async (req: Request, res: Response) => {
    const { newPassword, confirmNewPassword } = req.body;

    try {
        const { token } = req.params;

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Unauthorized'
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
                    user.status = StatusEnum.APPROVED
                    await userRepository.save(user)

                    return res.status(200).json({
                        success: true,
                        message: 'Your password is successfully created'
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