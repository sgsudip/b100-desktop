import * as yup from "yup";
var zerosReg = /[1-9]/g;

export const LoginValidationSchema = yup.object({
  phone_number: yup
    .string()
    .matches(zerosReg, "phone number is not valid")
    .min(12, "Phone number length must be 10 numbers long")
    .max(12, "Phone number length must be 10 numbers long")
    .required("Phone number is required"),
});
