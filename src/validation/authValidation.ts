import Joi from 'joi';
import { password } from './customValidation';


const InviteBusiness = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
}

const login = {
     body: Joi.object().keys({
         email: Joi.string().email().required(),
         password: Joi.string().required()
  })
}
const signup = {
  body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required()

  })
}

export default{
  InviteBusiness,
  login,  
  signup
}