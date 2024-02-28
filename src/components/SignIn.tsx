import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { LoginRequest, LoginValidator } from "../lib/validators/login";
import { useAuthContext } from "../providers/AuthContext";
import { useLocationContext } from "../providers/LocationContext";

const SignIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    getFieldState,
    setError,
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [isVisible, setIsVisible] = useState(false);
  const { backgroundLocation, setBackgroundLocation } = useLocationContext();
  const { setCurrentUser } = useAuthContext();
  const onSubmit = async (payload: LoginRequest) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        payload
      );
      setCurrentUser(res.data);
      if (backgroundLocation) {
        navigate(backgroundLocation);
        return setBackgroundLocation(null);
      }
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          setError("username", {
            type: "custom",
            message: "Username does not exist",
          });
        }
        if (error.response?.status === 400) {
          setError("password", {
            type: "custom",
            message: "Incorrect password",
          });
        }
      }
    }
  };

  return (
    <form
      className=" py-6 px-4 rounded-md bg-white shadow-sm shadow-black dark:bg-slate-600 w-[30rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset className="flex flex-col items-center">
        <legend className="font-medium text-3xl mx-auto my-4">
          Welcome Back!
        </legend>
        <p className="text-xl mx-auto w-full text-center mb-10">
          Sign in to access your account and explore personalized content
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
                  <div className="absolute left-0 -top-12 bg-slate-200 dark:bg-slate-400 z-10 rounded-md w-fit">
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
                    onClick={() => setIsVisible(!isVisible)}
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
                  <div className="absolute left-0 -top-10 bg-slate-200 dark:bg-slate-400 z-20 rounded-md w-fit">
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
        <button
          aria-label="login"
          type="submit"
          className="w-2/3 bg-green-600 p-2 font-medium my-5 text-white border dark:text-black transition-all hover:bg-white hover:text-green-600 dark:hover:text-green-600 border-green-600 dark:hover:bg-transparent"
        >
          Login
        </button>
      </fieldset>
      <p className="text-center mb-10">
        Don't have an account?{" "}
        <Link
          to={"/register"}
          state={{
            backgroundLocation: location.state?.backgroundLocation,
          }}
          className="text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-600 transition-colors duration-300 font-medium"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
