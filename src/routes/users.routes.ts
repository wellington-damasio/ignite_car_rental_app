import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

// -------------------------------------------
//             Creates a New User
// -------------------------------------------
const createUserController = new CreateUserController();
usersRoutes.post("/", createUserController.handle);

// -------------------------------------------
//                  List Users
// -------------------------------------------
const listUsersController = new ListUsersController();
usersRoutes.get("/", listUsersController.handle);

// -------------------------------------------
//              Update User Avatar
// -------------------------------------------
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const updateUserAvatarController = new UpdateUserAvatarController();
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
