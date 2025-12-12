import express from 'express'
import { loginController, logoutController, registerController } from '../controllers/auth.controller.js'

const router = express.Router()
router.post('/user/register', registerController)
router.post('/user/login', loginController)
router.post('/user/logout', logoutController)

export default router