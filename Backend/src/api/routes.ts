import express from 'express'
import { Login } from './controller/login'
import { UserRegistration } from './controller/add-user'
import { getUsers } from './controller/user-list'
import { SetPassword } from './controller/password/set-password'
import { getBucket } from './controller/get-bucket'
import { ReinviteUser } from './controller/reinvite'
import { CreateFolder } from './controller/aws/create-folder'
import { ResetPasswordLink } from './controller/password/reset-password-link'
import { ResetPassword } from './controller/password/reset-password'

export const routers = express.Router()

routers.route('/register').post(UserRegistration)
routers.route('/login').post(Login)
routers.route('/users/get').get(getUsers)
routers.route('/password/set/:token').post(SetPassword)
routers.route('/get-bucket').get(getBucket)
routers.route('/user/reinvite').post(ReinviteUser)
routers.route('/aws/create/folder').post(CreateFolder)
routers.route('/user/reset/password-link').post(ResetPasswordLink)
routers.route('/user/reset/password/:token').post(ResetPassword)