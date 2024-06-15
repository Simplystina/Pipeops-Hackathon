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

const updateProfile = {
  body: Joi.object().keys({
    phone: Joi.string(),
    image: Joi.string(),
    stateOfOrigin: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    localGovtOfOrigin: Joi.string(),
    stateOfResidence: Joi.string(),
    localGovtOfResidence: Joi.string(),
  
  })
}


export default{
  updateProfile,
  getUsers 
}