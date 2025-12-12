import express from 'express';
import {
    registerController,
    loginController,
    logoutController
} from '../controllers/foodPartner.controller.js';

const foodPartnerRouter = express.Router();
foodPartnerRouter.post('/register', registerController);
foodPartnerRouter.post('/login', loginController);
foodPartnerRouter.post('/logout', logoutController);

export default foodPartnerRouter;
