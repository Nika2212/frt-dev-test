import * as Joi from '@hapi/joi';

export const newUserModelValidator = Joi.object({
  firstName: Joi.string().min(4).max(255).regex(/^[a-zA-Z]+$/).required(),
  lastName: Joi.string().min(4).max(255).regex(/^[a-zA-Z]+$/).required(),
  email: Joi.string().email({tlds: false}).required(),
  isActive: Joi.boolean().required(),
  role: Joi.string().required()
});
