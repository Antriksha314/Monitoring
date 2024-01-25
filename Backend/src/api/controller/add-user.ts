import { Request, Response } from "express";
import { User } from "../../typeorm/entities/user";
import { sendEmail } from "../../utils/mail-service";
import { userRepository } from "../../utils/repositories";
import { limitedTimeToken, privateKey, verifyToken } from "../../utils/token";
import { RegisterSchema } from "../../utils/validations";
const jwt = require('jsonwebtoken');

export const UserRegistration = async (req: Request, res: Response) => {
    const { firstName, lastName, email, phone } = req.body;

    try {

        const headersToken = req.headers.authorization?.split(' ')[1] as string

        const isVerify = await verifyToken(res, headersToken)

        const { error } = RegisterSchema.validate(req.body);
        const getUSer = await userRepository.findOne({ where: { email } })

        if (isVerify.role !== "admin") {
            return res.status(400).json({
                success: false,
                message: "Only admin can perform this action"
            })
        }

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            })
        }

        if (getUSer) {
            return res.status(400).json({
                success: false,
                message: "User already exist"
            })
        }

        const user = new User()
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;

        await userRepository.save(user);

        const token = await limitedTimeToken({
            email: email,
        });

        const validLink = new Date(new Date().setHours(new Date().getHours() + 1))

        const html = `Hello, ${user?.firstName} ${user?.lastName}.
        <br>
        Seems like you create your password. If this is true, Open this 
        <a style="font-size: 17px;  font-weight: bold; cursor: pointer;
        text-decoration: underline;" href="${process.env.MAIL_ENDPOINT}create-password/${token}">Link</a> 
        to set your password. <br>If you do not want to set your password you can safely ignore this email.
        <br/> This link is valid till ${validLink}.
        <br>Regards, Monitoring system TEAM.`;

        sendEmail(res, email, "Create password", html);

        return res.status(200).json({
            success: true,
            message: `User is added and create password link sent to their email`
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}