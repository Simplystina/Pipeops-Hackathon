const express = require('express');
const router = express.Router();
import validate from "../middlewares/validate";
import   auth from "../middlewares/authMiddleware"; 
import orderValidation from "../validation/orderValidation";
import orderController from "../controller/orderController";


router.post('/generate-url', auth, validate(orderValidation.createAnOrder), orderController.generateAnOrderURL);
router.post('/check-code', auth, validate(orderValidation.checkCode), orderController.checkPaymentCode)
export default router;