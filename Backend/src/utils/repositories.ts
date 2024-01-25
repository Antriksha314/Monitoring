import { AppDataSource } from "../typeorm/data-source";
import { User } from "../typeorm/entities/user";

export const userRepository = AppDataSource.manager.getRepository(User)