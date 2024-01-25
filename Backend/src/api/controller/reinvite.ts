import { Request, Response } from "express";
import { sendEmail } from "../../utils/mail-service";
import { userRepository } from "../../utils/repositories";
import { limitedTimeToken } from "../../utils/token";
import { ReinviteSchema } from "../../utils/validations";

export const ReinviteUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const { error } = ReinviteSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const token = await limitedTimeToken({
      email: email,
    });

    const html = `Hello, ${user?.firstName} ${user?.lastName}.
    <br>
    Seems like you create your password. If this is true, Open this 
    <a style="font-size: 17px;  font-weight: bold; cursor: pointer;
    text-decoration: underline;" href="${process.env.MAIL_ENDPOINT}create-password/${token}">Link</a> 
    to set your password. <br>If you do not want to set your password you can safely ignore this email.
    <br>Regards, Monitoring system TEAM.`;

    sendEmail(res, email, "Create password", html);

    return res.status(200).json({
      success: true,
      message: `Mail sent successfully to ${user.email}`,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
};
