import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { User, X } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import imageUpload from "../lib/imageUpload";

import {
  ProfileChangeRequest,
  ProfileChangeValidator,
} from "../lib/validators/profile";
import { useAuthContext } from "../providers/AuthContext";

const ProfileSettings = () => {
  const { currentUser, setCurrentUser } = useAuthContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<ProfileChangeRequest>({
    resolver: zodResolver(ProfileChangeValidator),
    defaultValues: {
      username: currentUser?.username || "",
      password: "",
      image: currentUser?.image || "",
    },
  });
  const onSubmit = async (payload: ProfileChangeRequest) => {
    try {
      axios.defaults.withCredentials = true;
      await axios.put(`${import.meta.env.VITE_API_URL}/users/update`, payload);
      setCurrentUser((prev) => ({
        username: payload.username ?? prev?.username,
        image: payload.image ?? prev?.image,
        id: prev?.id,
      }));
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const [imageError, setImageError] = useState<string>("");
  const [newImage, setNewImage] = useState<string>("");
  const [isEditingUsername, setIsEditingUsername] = useState<boolean>(false);
  const [isEditingPassword, setIsEditingPassword] = useState<boolean>(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    try {
      if (event.target.files) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        if (file) {
          const url = await imageUpload(file);
          setValue("image", url);
          setNewImage(url);
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 400) {
          setImageError("Please upload a valid image");
        } else {
          setImageError("Error uploading image");
        }
      }
    }
  };

  return (
    <div className="py-6 px-4 rounded-md bg-white shadow-sm shadow-black dark:bg-slate-600 w-[30rem]">
      <h2 className="text-center">Profile Settings</h2>
      <h3 className="font-medium text-3xl mx-auto my-4 text-center">
        Hello{" "}
        <span className="capitalize text-green-600">
          {currentUser?.username}
        </span>
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col items-center">
          <p className="text-xl mx-auto w-full text-center mb-10 capitalize">
            Change your profile settings here
          </p>
          <input
            type="file"
            id="image"
            name="image"
            className="hidden"
            onChange={handleImageUpload}
          />
          <label
            className="w-20 h-20 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center cursor-pointer my-2"
            htmlFor="image"
          >
            {newImage ? (
              <img src={newImage} />
            ) : currentUser?.image ? (
              <img src={currentUser.image} />
            ) : (
              <User className="w-10 h-10" />
            )}
          </label>
          <p>Upload new image</p>
          {imageError && <p className="text-red-500">{imageError}</p>}
          {isEditingUsername ? (
            <Controller
              name="username"
              control={control}
              render={({ field }) => {
                return (
                  <div className="relative my-5 w-2/3 mx-auto">
                    <label
                      htmlFor="username"
                      className={"px-2 font-medium text-xl"}
                    >
                      New Username
                    </label>
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-red-600"
                      onClick={() => setIsEditingUsername(false)}
                    >
                      <X />
                    </button>
                    <input
                      id="username"
                      className="px-2 py-2 outline-none ring-0 border-none peer bg-transparent w-full"
                      aria-label="your username"
                      {...field}
                    />

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
          ) : (
            <button
              className="bg-slate-400 w-2/3 my-4 py-2"
              onClick={() => setIsEditingUsername(true)}
              type="button"
            >
              Edit Username
            </button>
          )}
          {isEditingPassword ? (
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <div className="relative my-5 w-2/3 mx-auto">
                    <label
                      htmlFor="password"
                      className={"px-2 font-medium text-xl"}
                    >
                      New Password
                    </label>
                    <button
                      type="button"
                      className="absolute right-2 top-2 text-red-600"
                      onClick={() => setIsEditingPassword(false)}
                    >
                      <X />
                    </button>
                    <input
                      type={"password"}
                      id="password"
                      className="px-2 py-2 outline-none ring-0 border-none peer bg-transparent w-full"
                      aria-label="your password"
                      {...field}
                    />
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
          ) : (
            <button
              className="bg-slate-400 w-2/3 my-4 py-2"
              onClick={() => setIsEditingPassword(true)}
              type="button"
            >
              Edit Password
            </button>
          )}
          <button
            aria-label="save changes"
            type="submit"
            className="w-2/3 bg-green-600 p-2 font-medium my-5 text-white border dark:text-black transition-all hover:bg-white hover:text-green-600 dark:hover:text-green-600 border-green-600 dark:hover:bg-transparent"
          >
            Save changes
          </button>
        </fieldset>
        <p className="text-center mb-10">
          Happy with your settings?{" "}
          <Link
            to={"/"}
            className="text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-600 transition-colors duration-300 font-medium"
          >
            Go back home
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ProfileSettings;
