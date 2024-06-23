import express from 'express';
import authRoutes from "./v1/auth-routes";
import userRoutes from "./v1/user-routes";
import chatRoutes from "./v1/chat-routes";

const router = express.Router();

router.use('/v1/auth',authRoutes);
router.use('/v1/users',userRoutes);
router.use('/v1/chats',chatRoutes);
export default router;