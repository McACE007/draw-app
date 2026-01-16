"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateRoomFormType, CreateRoomRequest } from "@repo/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function Home() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoomFormType>({
    resolver: zodResolver(CreateRoomRequest),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<CreateRoomFormType> = async (data) => {
    const response = await fetch(`${BACKEND_URL}/api/room`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: localStorage.getItem("token") || "",
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();

    console.log(resData);

    if (response.status >= 200 && response.status <= 201) {
      setError("name", resData.message);
      return;
    }

    // router.push(`/room/${data.name}`);
  };

  return (
    <div className="w-screen h-screen p-10 flex items-center justify-center bg-gray-100">
      <div className="bg-white px-8 py-10 shadow min-w-md">
        <h1 className="mb-4 text-2xl font-bold">Create or Join a room</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <label className="font-semibold text-gray-500 mb-2">
                Room Name
              </label>
              <input
                type="text"
                placeholder="Enter your Room Name"
                className="py-1.5 px-2 rounded-lg placeholder:text-gray-300 placeholder:text-xs placeholder:font-normal outline-blue-200 border border-gray-300"
                {...register("name")}
              />
              {errors.name && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white mt-1 rounded-md py-1.5 font-semibold text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Create or join room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
