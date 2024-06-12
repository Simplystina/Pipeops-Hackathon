import Joi from 'joi';
import { password } from './customValidation';



const getUsers = {
  query: Joi.object().keys({
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const InviteBusiness = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
}


export default{
  InviteBusiness,
  getUsers 
}