"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";

export default function SignUpPage() {
  const { status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      surname: "",
      fatherHusbandName: "",
      password: "",
      confirmPassword: "",
      residentialAddress: "",
      // flatNo: "",
      // wing: "",
      // floor: "",
      // buildingName: "",
      // area: "",
      // street: "",
      // landmark: "",
      // pinCode: "",
      businessName: "",
      officeAddress: "",
      // officeNo: "",
      // officeFloor: "",
      // officeBuildingName: "",
      // officeArea: "",
      // officeStreet: "",
      // officeLandmark: "",
      // officePinCode: "",
      // telephone: "",
      mobile: "",
      email: "",
      dateOfBirth: "",
      bloodGroup: "",
      maritalStatus: "",
      anniversaryDate: "",
      gender: "",
      image: "",
    },
  });

  const [imageBase64, setImageBase64] = useState<string>("");

  const handleSignUp: SubmitHandler<FieldValues> = async (data) => {
    data.image = imageBase64;
    const res = await axios.post("/api/auth/register", data);
    if (res.status === 200) {
      return router.push("/signin");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "authenticated") {
    return redirect("/");
  }

  return (
    <div className=" lg:max-w-3xl p-6 space-y-8 sm:p-8 sm:w-full rounded-lg shadow-xl dark:bg-gray-800 mt-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        SmartFlex Fitness
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        Note:
        <br />
        1. Members shall be permitted to use the facilities of the fitness
        centre only after submission of the completed form.
        <br />
        2. Members are required to personally fill all the details.
        <br />
      </p>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignUp)}>
        {/* <div>
          <label
            htmlFor="membershipId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Membership ID
          </label>
          <input
            type="text"
            id="membershipId"
            {...register("membershipId", {
              required: "This field is required",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Membership ID"
            required
          />
        </div> */}

        {[
          {
            id: "name",
            label: "First Name",
            placeholder: "First Name",
          },
          { id: "surname", label: "Surname", placeholder: "Surname" },
          {
            id: "fatherHusbandName",
            label: "Father's/Husband's Name",
            placeholder: "Enter Father's/Husband's Name",
          },
          {
            id: "residentialAddress",
            label: "Residential Address",
            placeholder: "Enter residential address",
          },
        ].map(({ id, label, placeholder }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {label}
            </label>
            <input
              // type={type || "text"}
              id={id}
              placeholder={placeholder}
              {...register(id, { required: "This field is required" })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {errors[id] && (
              <p className="text-red-500 text-xs italic">
                {String(errors[id]?.message) || "something went wrong"}
              </p>
            )}
          </div>
        ))}

        {/* Blood Group */}
        <div>
          <label
            htmlFor="bloodGroup"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Blood Group
          </label>

          <select
            id="bloodGroup"
            {...register("bloodGroup", {
              required: "This field is required",
              validate: (value) =>
                ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].includes(
                  value
                ) || "Invalid blood group",
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          {errors &&
            errors.bloodGroup &&
            typeof errors.bloodGroup.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors?.bloodGroup?.message}
              </p>
            )}
        </div>

        {/* date of birth */}
        <div>
          <label
            htmlFor="dateOfBirth"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            {...register("dateOfBirth", {
              required: "This field is required",
              validate: (value) => {
                const enteredDate = new Date(value);
                const today = new Date();
                if (enteredDate >= today) {
                  return "Date of Birth must be in the past";
                }
                return true;
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors &&
            errors.dateOfBirth &&
            typeof errors.dateOfBirth.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors?.dateOfBirth?.message}
              </p>
            )}
        </div>

        {/* Anniversary date */}
        <div>
          <label
            htmlFor="anniversaryDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Anniversary Date
          </label>
          <input
            type="date"
            id="anniversaryDate"
            {...register("anniversaryDate", {
              required: "This field is required",
              validate: (value) => {
                const enteredDate = new Date(value);
                const today = new Date();
                if (enteredDate >= today) {
                  return "Anniversary Date must be in the past";
                }
                return true;
              },
            })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors &&
            errors.anniversaryDate &&
            typeof errors.anniversaryDate.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors?.anniversaryDate?.message}
              </p>
            )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Enter Email Address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors &&
            errors.email &&
            typeof errors.email.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors?.email?.message}
              </p>
            )}
        </div>

        {/* mobile number */}
        <div>
          <label
            htmlFor="mobile"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Mobile Number
          </label>
          <input
            type="number"
            id="mobile"
            {...register("mobile", {
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Mobile number should be of 10 digits.",
              },
              maxLength: {
                value: 10,
                message: "Mobile number should be of 10 digits.",
              },
              pattern: {
                value: /^[0-9]{10}$/, // Ensures exactly 10 digits (no letters/symbols)
                message: "Mobile number must be 10 digits only.",
              },
            })}
            placeholder="Enter Mobile address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors &&
            errors.mobile &&
            typeof errors.mobile.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors?.mobile?.message}
              </p>
            )}
        </div>

        {/* GENDER  */}
        <div className="flex items-center justify-start gap-5">
          <label className="block  text-sm font-medium text-gray-900 dark:text-white  h-full p-2">
            Gender :
          </label>
          <div className="flex items-center">
            <input
              id="default-radio-1"
              type="radio"
              value={"male"}
              {...register("gender", { required: true })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="default-radio-1"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Male
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value={"female"}
              {...register("gender", { required: true })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Female
            </label>
          </div>
          {errors &&
            errors.gender &&
            typeof errors.gender.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors?.gender?.message}
              </p>
            )}
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor="businessName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name & Nature of Business
          </label>
          <input
            type="text"
            id="businessName"
            {...register("businessName")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Business Name"
          />
        </div>

        {/* Office address */}
        <div>
          <label
            htmlFor="officeAddress"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Office Address
          </label>
          <input
            type="text"
            id="officeAddress"
            {...register("officeAddress")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Office Address"
          />
        </div>

        {/* Marital status */}
        <div className="flex items-center justify-start gap-5 w-full ">
          <label className="block  text-sm font-medium text-gray-900 dark:text-white h-full p-2">
            Marital Status:
          </label>
          <div className="flex items-center">
            <input
              id="married"
              type="radio"
              value="Married"
              {...register("married", { required: true })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              required
            />
            <label
              htmlFor="married"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Married
            </label>
          </div>
          <div className="flex items-center ">
            <input
              id="single"
              type="radio"
              value="Single"
              {...register("maritalStatus", { required: true })}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor="single"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Single
            </label>
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              maxLength: {
                value: 20,
                message: "Password must have at most 20 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter and one number",
              },
            })}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors &&
            errors.password &&
            typeof errors.password.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors?.password?.message}
              </p>
            )}
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors &&
            errors.confirmPassword &&
            typeof errors.confirmPassword.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors?.confirmPassword?.message}
              </p>
            )}
        </div>
        <div className="flex justify-center items-start flex-col">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload your profile picture
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            {...register("image", { required: true })}
            onChange={handleImageChange}
          />
          {errors &&
            errors.image &&
            typeof errors.image.message === "string" && (
              <p className="text-red-500 text-xs italic">
                {errors?.image?.message}
              </p>
            )}
        </div>
        <button
          type="submit"
          className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>

        <p className="text-white">
          Already have account?{" "}
          <button
            className="text-blue-500"
            onClick={() => router.push("/signin")}
          >
            {" "}
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
}
