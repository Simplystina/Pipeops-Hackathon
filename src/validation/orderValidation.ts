import Joi from 'joi';
import { password } from './customValidation';



const createAnOrder = {
  body: Joi.object().keys({
  customerPhone: Joi.string(),
  totalAmount: Joi.number().default(0),
  itemOrdered: Joi.array().items(
    Joi.object({
      item: Joi.string().required(),
      total: Joi.number().required()
    })
  ),
  paidDelivery: Joi.boolean().required(),
  customerLocation: Joi.string(),
  address: Joi.string(),
  customerAddress: Joi.string(),
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

