import express from "express";
import UserController from "../../controller/user-controller";
import authenticateUser from "../../middlewares/auth-middleware";

const router = express.Router();

router.get('/',authenticateUser,UserController.searchUsers);

export default router;