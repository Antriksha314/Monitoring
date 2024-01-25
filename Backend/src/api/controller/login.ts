import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { userRepository } from "../../utils/repositories";
import { LoginSchema } from "../../utils/validations";
import { generateToken } from "../../utils/token";

export const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const { error } = LoginSchema.validate(req.body)

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            })
        }

        const user = await userRepository.findOne({ where: { email } })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User is not found"
            })
        }

        bcrypt.compare(password, user.password, (err, resp) => {
            if (resp) {
                return res.status(200).json({
                    success: true,
                    message: "Login successfully",
                    data: { token: generateToken({ email: user.email, role: user.role }) }
                })
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Incorrect password or email"
                })
            }

        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err
        })
    }

}