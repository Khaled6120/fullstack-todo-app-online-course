import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../config/axios.config";

import { IErrorResponse } from "../interface";
import { REGISTER_FORM } from "../data";
import { registerSchema } from "../validations";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/InputErrorMessage";
import Spinner from "../components/ui/Spinner";

interface IFormInput {
  username: string
  email: string
  password: string
}

const RegisterPage = () => {

  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(registerSchema) })


  const onSubmit: SubmitHandler<IFormInput> = async (data: unknown) => {
    setIsLoading(true)

    try {
      const { status } = await axiosInstance.post('/auth/local/register', data)
      if (status === 200)
        toast.success('Registered successfully', { position: "bottom-center", duration: 4000, style: { backgroundColor: "black", color: 'white', width: "fit-content" } })

    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>
      toast.error(errorObj.response?.data?.error.message || 'Something went wrong', { position: "bottom-center", duration: 4000, style: { backgroundColor: "black", color: 'white', width: "fit-content" } })

    } finally {
      setIsLoading(false)
    }
  }


  // ** Renders
  const renderRegisterForm = REGISTER_FORM.map(({ name, placeholder, type, validation }, idx) => (
    <div key={idx}>
      <Input type={type} placeholder={placeholder} {...register(name, validation)} />
      {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
    </div>
  ));

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button fullWidth >{isLoading ? <Spinner color="text-gray-200" /> : 'Register'}</Button>
      </form>
    </div>
  );
};

export default RegisterPage;
