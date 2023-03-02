import { Router } from "express";
import { ResetPasswordUserController } from "../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgottenPasswordMailController } from "../../../../modules/accounts/useCases/sendForottenPasswordMail/SendForgottenPasswordMailController";

const passwordRoutes = Router()

const sendForgottenPasswordMailController = new SendForgottenPasswordMailController()
passwordRoutes.post("/forgot", sendForgottenPasswordMailController.handle)

const resetPasswordController = new ResetPasswordUserController()
passwordRoutes.post('/reset', resetPasswordController.handle)

export {passwordRoutes}