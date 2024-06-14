const express = require('express');
const router = express.Router();
import { login, register } from "../controller/authController";
import authValidation from "../validation/authValidation";
import validate from "../middlewares/validate";

router.post('/signup', validate(authValidation.signup), register)
router.post('/login', validate(authValidation.login), login);

export default router;