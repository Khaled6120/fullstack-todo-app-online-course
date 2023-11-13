import * as yup from "yup";

const usernameSchema = yup
  .string()
  .required("Username is required")
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters");

const emailSchema = yup.string().required("Email is required").email("Invalid email address");

const passwordSchema = yup.string().required("Password is required").min(8, "Password must be at least 8 characters");

export const registerSchema = yup.object().shape({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});
