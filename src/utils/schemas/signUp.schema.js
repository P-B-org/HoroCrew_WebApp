import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    firstName: Yup.string().required("Firstname Required!"),
    lastName: Yup.string().required("Firstname Required!"),
    email: Yup.string().email("Email is invalid!").required("Email Required!"),
    password: Yup.string()
        .min(8, "Your password must have a minimum of 8 characters, at least one letter and one number")
        .required("Password Required!"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match!")
        .required("Confirm password is reqired!"),
    dayOfBirth: Yup.number()
        .min(1, "Minimun day 1")
        .required("Day of Birth is required!"),
    monthOfBirth: Yup.number()
        .min(1, "Minimun month 1")
        .required("Month of Birth is required!"),
    yearOfBirth: Yup.number()
        .min(1930, "Minimun year is 1930")
        .required("Year of Birth is required!"),
    timeOfBirth: Yup.string()
        .required("Time of Birth is required!"),


});