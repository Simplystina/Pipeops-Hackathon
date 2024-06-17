import Joi from 'joi';
import { password } from './customValidation';



const createAnOrder = {
  body: Joi.object().keys({
  customerPhone: Joi.string(),
  customerEmail: Joi.string().required(),
  totalAmount: Joi.number().required(),
  itemOrdered: Joi.array().items(
    Joi.object({
      item: Joi.string().required(),
      total: Joi.number().required()
    })
  ),
    paidDelivery: Joi.boolean().required(),
   deliveryPrice: Joi.number(),
  customerLocation: Joi.string(),
  address: Joi.string(),
  customerAddress: Joi.string(),
    customerStateOfResidence: Joi.string(),
  
  })
}

const checkCode = {
  body: Joi.object().keys({
  code: Joi.string().required()
  })
}


export default{
  createAnOrder,
  checkCode
}

