"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserFormType, CreateUserRequest } from "@repo/common/types";
import { zodResolver } from "@hookform/resolvers/zod";

function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormType>({
    resolver: zodResolver(CreateUserRequest),
  });

  const onSubmit: SubmitHandler<CreateUserFormType> = async (data) => {
    console.log(data);
  };
  return (
    <div className="bg-white px-8 py-10 shadow min-w-md">
      <h1 className="mb-4 text-2xl font-bold">Create an account</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-500 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="py-1.5 px-2 rounded-lg placeholder:text-gray-300 placeholder:text-xs placeholder:font-normal outline-blue-200 border border-gray-300"
              {...register("username")}
            />
            {errors.username && (
              <div className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-500 mb-2">Password</label>
            <input
              type="text"
              placeholder="Enter your password"
              className="px-2 py-1.5 rounded-lg placeholder:text-gray-300 placeholder:text-xs  outline-blue-200 border border-gray-300"
              {...register("password")}
            />
            {errors.username && (
              <div className="text-red-500 text-xs mt-1">
                {errors?.password?.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white mt-1 rounded-md py-1.5 font-semibold text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;
