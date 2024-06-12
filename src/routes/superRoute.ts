const express = require('express');
const router = express.Router();
import superController from "../controller/superController";
import authValidation from "../validation/authValidation";
import validate from "../middlewares/validate";
import { businessValidation, userValidation } from "../validation";
import superAuth from "../middlewares/superAuthMiddleware";

router.get('/users', validate(userValidation.getUsers), superController.getAllUsers);
router.post('/invite-business', superAuth, validate(authValidation.InviteBusiness), superController.InviteBusiness)
export default router;