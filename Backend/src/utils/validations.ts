import Joi from 'joi';
export const RegisterSchema = Joi.object({
    firstName: Joi.string().required().messages({ "any.required": "First name is required" }),
    lastName: Joi.string().required().messages({ "any.required": "Last name is required" }),
    email: Joi.string().email().required().messages({ "any.required": "Email is required" }),
    phone: Joi.string().required().messages({ "any.required": "Phone number is required" }),
    // password: Joi.string().required().messages({ "any.required": "Password is required" }),
});

export const LoginSchema = Joi.object({
    email: Joi.string().email().required().messages({ "any.required": "Email is required" }),
    password: Joi.string().required().messages({ "any.required": "Password is required" }),
});

export const ReinviteSchema = Joi.object({
    email: Joi.string().email().required().messages({ "any.required": "Email is required" }),
});

export const ValidateEmail = Joi.object({
    email: Joi.string().email().required().messages({ "any.required": "Email is required" }),
})

export const passwordValidation = Joi.object({
    newPassword: Joi.string().required().messages({ "any.required": "New password is required" }),
    confirmNewPassword: Joi.string().required().messages({ "any.required": "Confirm new password is required" }),

});