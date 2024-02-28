import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { RegisterRequest, RegisterValidator } from "../lib/validators/register";
import { useState } from "react";
import { EyeIcon, EyeOff } from "lucide-react";

const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getFieldState,
    setError,
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterValidator),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (payload: RegisterRequest) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/register`, payload);
      navigate("/login", {
        state: {
          backgroundLocation: location.state?.backgroundLocation || null,
        },
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          setError("username", {
            type: "custom",
            message: "Username already exists",
          });
        }
      }
    }
  };
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <form
      className=" py-6 px-4 rounded-md bg-white shadow-sm shadow-black dark:bg-slate-600 w-[30rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="flex flex-col items-center">
        <legend className="font-medium text-3xl mx-auto my-4">
          Join the <span className="text-green-600 font-semibold">Post</span>{" "}
          community
        </legend>
        <p className="text-xl mx-auto w-full text-center mb-10 px-10">
          Create an account to connect with others, share your thoughts, and be
          a part of our vibrant community
        </p>
        <Controller
          name="username"
          control={control}
          render={({ field }) => {
            return (
              <div className="relative my-5 w-2/3 mx-auto">
                <input
                  id="username"
                  className="px-2 py-2 outline-none ring-0 border-none peer bg-transparent w-full"
                  aria-label="your username"
                  {...field}
                />
                <label
                  htmlFor="username"
                  className={cn(
                    "absolute text-gray-500 dark:text-gray-300 left-2 bottom-2 peer-focus:-translate-y-5 transition-all pointer-events-none",
                    getFieldState("username").isDirty && "-translate-y-5"
                  )}
                >
                  Username
                </label>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-black dark:bg-gray-200 origin-left rounded-full" />
                <span className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 peer-focus:scale-100 peer-hover:scale-100 z-10" />
                {errors.username && (
                  <div className="absolute left-0 -top-20 bg-slate-200 dark:bg-slate-400 z-10 rounded-md w-fit">
                    <div className="absolute left-1/2 -bottom-4 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 -z-10 bg-slate-200 dark:bg-slate-400" />
                    <div className="text-rose-600 dark:text-red-900 font-medium px-2 py-1 w-full">
                      {errors.username.message}
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            return (
              <div className="relative my-5 w-2/3 mx-auto">
                <input
                  type={isVisible ? "text" : "password"}
                  id="password"
                  className="px-2 py-2 outline-none ring-0 border-none peer bg-transparent w-full"
                  aria-label="your password"
                  {...field}
                />
                {getFieldState("password").isDirty && (
                  <button
                    className="absolute right-0 top-0 translate-y-1/2"
                    type="button"
                    onClick={toggleVisibility}
                    tabIndex={-1}
                  >
                    {isVisible ? <EyeIcon /> : <EyeOff />}
                  </button>
                )}
                <label
                  htmlFor="password"
                  className={cn(
                    "absolute text-gray-500 dark:text-gray-300 left-2 bottom-2 peer-focus:-translate-y-5 transition-all pointer-events-none",
                    getFieldState("password").isDirty && "-translate-y-5"
                  )}
                >
                  Password
                </label>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-black dark:bg-gray-200 origin-left rounded-full" />
                <span className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 peer-focus:scale-100 peer-hover:scale-100 z-10" />
                {!errors.username && errors.password && (
                  <div className="absolute left-0 -top-20 bg-slate-200 dark:bg-slate-400 z-20 rounded-md w-fit">
                    <div className="absolute left-1/2 -bottom-4 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 -z-10 bg-slate-200 dark:bg-slate-400" />
                    <div className="text-rose-600 dark:text-red-900 font-medium px-2 py-1 w-full">
                      {errors.password.message}
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => {
            return (
              <div className="relative my-5 w-2/3 mx-auto">
                <input
                  type={isConfirmVisible ? "text" : "password"}
                  id="confirmPassword"
                  className="px-2 py-2 outline-none ring-0 border-none peer bg-transparent w-full"
                  aria-label="your password again"
                  {...field}
                />
                {getFieldState("confirmPassword").isDirty && (
                  <button
                    className="absolute right-0 top-0 translate-y-1/2"
                    type="button"
                    onClick={toggleConfirmVisibility}
                    tabIndex={1}
                  >
                    {isConfirmVisible ? <EyeIcon /> : <EyeOff />}
                  </button>
                )}
                <label
                  htmlFor="confirm-password"
                  className={cn(
                    "absolute text-gray-500 dark:text-gray-300 left-2 bottom-2 peer-focus:-translate-y-5 transition-all pointer-events-none",
                    getFieldState("confirmPassword").isDirty && "-translate-y-5"
                  )}
                >
                  Confirm password
                </label>
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-black dark:bg-gray-200 origin-left rounded-full" />
                <span className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 ease-out scale-0 peer-focus:scale-100 peer-hover:scale-100 z-10" />
                {!errors.username &&
                  !errors.password &&
                  errors.confirmPassword && (
                    <div className="absolute left-0 -top-10 bg-slate-200 dark:bg-slate-400 z-20 rounded-md w-fit">
                      <div className="absolute left-1/2 -bottom-4 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 -z-10 bg-slate-200 dark:bg-slate-400" />
                      <div className="text-rose-600 dark:text-red-900 font-medium px-2 py-1 w-full">
                        {errors.confirmPassword.message}
                      </div>
                    </div>
                  )}
              </div>
            );
          }}
        />
        <button
          type="submit"
          aria-label="login"
          className="w-2/3 p-2 font-medium my-5 border text-green-600 hover:text-black dark:hover:text-white  border-green-600 bg-transparent relative group overflow-hidden"
        >
          Register
          <span className="absolute bottom-0 -left-5 -right-1 rotate-12 h-full origin-bottom-left scale-x-0 bg-green-600 opacity-30 transition-transform duration-300 ease-out scale-0 group-hover:scale-x-[200] group-hover:scale-y-[3]" />
        </button>
      </fieldset>
      <p className="text-center mb-10">
        Already have an account?{" "}
        <Link
          to={"/login"}
          state={{
            backgroundLocation: location.state?.backgroundLocation || null,
          }}
          className="text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-600 transition-colors duration-300 font-medium"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUp;
