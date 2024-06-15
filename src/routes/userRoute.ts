const express = require('express');
const router = express.Router();
import { updateProfile } from "../controller/userController";
import validate from "../middlewares/validate";

import Auth from "../middlewares/authMiddleware";
import { userValidation } from "../validation";

router.patch('/', Auth, validate(userValidation.updateProfile), updateProfile)



export default router;