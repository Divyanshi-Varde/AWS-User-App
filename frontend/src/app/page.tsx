"use client";

import { AddUserType } from "@/types/user.types";
import { AddUserSchema } from "@/validations/add-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

const HomePage = () => {
  const [users, setUsers] = useState<AddUserType[]>([]);
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserType>({
    resolver: zodResolver(AddUserSchema),
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(URL as string);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const onSubmit: SubmitHandler<AddUserType> = async (data) => {
    try {
      const response = await axios.post(URL as string, data);
      setUsers((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Failed to submit user data:", error);
    }
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
            {...register("first_name")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-bold text-gray-700 mb-1">
            Last Name:
          </label>
          <input
            type="text"
            {...register("last_name")}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 text-black"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>
        <div>
          <label className="block font-bold text-gray-700 mb-1">Address:</label>
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

      <button
        className="text-xl font-semibold mt-8 bg-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 text-black"
        onClick={fetchUsers}
      >
        Fetch All Users
      </button>

      {users.length === 0 && (
        <p className="text-white mt-4">
          No users fetched yet. Click the button above!
        </p>
      )}
      <ul className="space-y-4 mt-4">
        {users.map((user, index) => (
          <li
            key={index}
            className="bg-gray-100 shadow rounded-md p-4 space-y-2 text-black"
          >
            <strong className="block text-lg font-bold">
              {user.first_name} {user.last_name}
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
