import Joi from 'joi';
import { password } from './customValidation';

const updateBusinessProfile = {
  body: Joi.object().keys({
    businessName: Joi.string(),
    phone: Joi.string(),
    image: Joi.string(),
    businessLogo: Joi.string(),
    stateOfResidence: Joi.string(),
    localGovtOfResidence: Joi.string(),
     address: Joi.string(),
  })
}

const changeBusinessPassword = {
  body: Joi.object().keys({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  })
}

const changeInitialPassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().required(),
  })
}
export default{
  updateBusinessProfile,
  changeBusinessPassword,
  changeInitialPassword
}