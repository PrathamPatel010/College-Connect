import * as express from "express";
import authenticateUser from "../../middlewares/auth-middleware";
import MessageController from "../../controller/message-controller";

const router = express.Router();

router.post('/',authenticateUser,MessageController.sendMessage);
router.get('/:chatId',authenticateUser,MessageController.fetchMessages);

export default router;