import * as express from "express";
import authenticateUser from "../../middlewares/auth-middleware";
import ChatController from "../../controller/chat-controller";

const router = express.Router();

router.get('/',authenticateUser,ChatController.getAll);
router.post('/',authenticateUser,ChatController.createP2P);
router.post('/group',authenticateUser,ChatController.createGroup);

export default router;