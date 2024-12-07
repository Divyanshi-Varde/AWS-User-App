"use client";

import { AddUserType } from "@/types/user.types";
import { AddUserSchema } from "@/validations/add-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const HomePage = () => {
  const [users, setUsers] = useState<AddUserType[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserType>({
    resolver: zodResolver(AddUserSchema),
  });

  const onSubmit: SubmitHandler<AddUserType> = (data) => {
    setUsers((prev) => [...prev, data]);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">User Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block font-bold text-gray-700 mb-1">
            First Name:
          </label>
          <input
            type="text"
            {...register("firstName")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-bold text-gray-700 mb-1">
            Last Name:
          </label>
          <input
            type="text"
            {...register("lastName")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-bold text-gray-700 mb-1">
            Address:
          </label>
          <input
            type="text"
            {...register("address")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-bold text-gray-700 mb-1">Phone:</label>
          <input
            type="text"
            {...register("phone")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className="block font-bold text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8">Submitted Users</h2>
      {users.length === 0 && (
        <p className="text-gray-500 mt-2">No users submitted yet.</p>
      )}
      <ul className="space-y-4 mt-4">
        {users.map((user, index) => (
          <li
            key={index}
            className="bg-gray-100 shadow rounded-md p-4 space-y-2 text-black"
          >
            <strong className="block text-lg font-bold">
              {user.firstName} {user.lastName}
            </strong>
            <p>Address: {user.address}</p>
            <p>Phone: {user.phone}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;