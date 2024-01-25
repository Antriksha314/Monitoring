import { Request, Response } from "express";
import { userRepository } from "../../utils/repositories";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await userRepository.find({ where: { role: 'user' } })
        return res.status(200).json({
            success: true,
            data: { users }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}