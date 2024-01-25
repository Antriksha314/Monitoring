import * as yup from 'yup'

export const inviteSchema = yup.object().shape({
    firstName: yup.string().required().label("First name"),
    lastName: yup.string().required().label("Last name"),
    phone: yup.string().required().label("Phone number"),
    email: yup.string().email().required().label("Email"),
});

export const CreatePasswordSchema = yup.object({
    newPassword: yup.string().min(6).required().label('Create new password'),
    confirmNewPassword: yup.string().min(6).label('Confirm new password').required().oneOf([yup.ref('newPassword')], 'Passwords must match'),
})

export const EmailValidate = yup.object({
    email: yup.string().email().required().label("Email"),
})