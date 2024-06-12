const express = require('express');
const router = express.Router();
import { login } from "../controller/authController";
import authValidation from "../validation/authValidation";
import validate from "../middlewares/validate";
import { businessValidation } from "../validation";
import  businessAuth from "../middlewares/authMiddleware"; 
import businessController from "../controller/businessController";

router.put('/', businessAuth, validate(businessValidation.updateBusinessProfile), businessController.businessUpdateProfile);
router.put('/change-password', businessAuth, validate(businessValidation.changeBusinessPassword), businessController.changeBusinessPassword);
router.put('/change-initial-password', businessAuth, validate(businessValidation.changeInitialPassword), businessController.changeInitialPassword);
export default router;