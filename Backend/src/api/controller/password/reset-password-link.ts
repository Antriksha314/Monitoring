import { Request, Response } from "express";
import { sendEmail } from "../../../utils/mail-service";
import { userRepository } from "../../../utils/repositories";
import { limitedTimeToken } from "../../../utils/token";
import { ValidateEmail } from "../../../utils/validations";

export const ResetPasswordLink = async (req: Request, res: Response) => {

    const { email } = req.body

    try {
        const { error } = ValidateEmail.validate(req.body)

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
                message: "User doesn't exist, please enter a valid email"
            })
        }

        const token = await limitedTimeToken({
            email: email,
        });

        const validLink = new Date(new Date().setHours(new Date().getHours() + 1))

        const html = `Hello, ${user?.firstName} ${user?.lastName}.
        <br>
        Seems like you reset your password. If this is true, Open this 
        <a style="font-size: 17px;  font-weight: bold; cursor: pointer;
        text-decoration: underline;" href="${process.env.MAIL_ENDPOINT}reset-password/${token}">Link</a> 
        to reset your password. <br>If you do not want to reset your password you can safely ignore this email.
        <br/> This link is valid till ${validLink}.
        <br>Regards, Monitoring system TEAM.`;

        sendEmail(res, email, "Create password", html);

        return res.status(200).json({
            success: true,
            message: `Your reset password link is sent to ${email}`
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}