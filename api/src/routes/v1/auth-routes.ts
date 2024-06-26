import express from "express";
import AuthController from '../../controller/auth-controller';

const router = express.Router();

router.post('/signup',AuthController.signUp);
router.post('/signin',AuthController.signIn);

export default router;