import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interface";
import { LOGIN_FORM } from "../data";
import InputErrorMessage from "../components/InputErrorMessage";
import Spinner from "../components/ui/Spinner";


interface IFormInput {
  identifier: string
  password: string
}


const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) })


  const onSubmit: SubmitHandler<IFormInput> = async (data: unknown) => {
    setIsLoading(true)

    try {
      const { status, data: resData } = await axiosInstance.post('/auth/local/', data)
      if (status === 200)
        toast.success('Registered successfully', { position: "bottom-center", duration: 1500, style: { backgroundColor: "black", color: 'white', width: "fit-content" } })


      localStorage.setItem('loggedInUser', JSON.stringify(resData))
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>
      toast.error(errorObj.response?.data?.error.message || 'Something went wrong', { position: "bottom-center", duration: 1500, style: { backgroundColor: "black", color: 'white', width: "fit-content" } })

    } finally {
      setIsLoading(false)
    }

    setInterval(() => {
      location.replace('/')
    }, 1500);
  }

  // ** Renders
  const renderLoginForm = LOGIN_FORM.map(({ name, placeholder, type, validation }, idx) => (
    <div key={idx}>
      <Input type={type} placeholder={placeholder} {...register(name, validation)} />
      {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
    </div>
  ));

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Login to get access!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {renderLoginForm}

        <Button fullWidth >{isLoading ? <Spinner color="text-gray-200" /> : 'Login'}</Button>
      </form>
    </div>
  );
};

export default LoginPage;
