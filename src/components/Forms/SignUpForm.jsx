import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import instance from "@/utils/axios";
import { Button } from "../ui/button";
import useToastNotification from "@/utils/sonnerToast";

const SignUpForm = ({setPatientData, setIsOTPsent}) => {
  const [loading, setLoading] = useState(false);
  const showToast = useToastNotification()

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      phone_number: "",
      date_of_birth: "",
      gender: "",
      blood_group: "",
      allergies: "",
      address: "",
      emergency_contact_number: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      username: Yup.string().required("Username is required"),
      phone_number: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")
        .required("Phone number is required"),
      date_of_birth: Yup.date().required("Date of birth is required"),
      gender: Yup.string().required("Gender is required"),
      blood_group: Yup.string().required("Blood group is required"),
      allergies: Yup.string(),
      address: Yup.string().required("Address is required"),
      emergency_contact_number: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, "Emergency contact number is not valid")
        .required("Emergency contact number is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await instance.post("accounts/patient-sign-up/", {
          email: values.email,
        });
        showToast(response?.data?.message || "otp sented" , 'success')
        setPatientData({
          patient: {
            user_data: {
              email: values.email,
              username: values.username,
              phone_number: values.phone_number,
              date_of_birth: values.date_of_birth,
            },
            gender: values.gender,
            blood_group: values.blood_group,
            allergies: values.allergies,
            address: values.address,
            emergency_contact_number: values.emergency_contact_number,
          },
        });
        setIsOTPsent(true);
      } catch (error) {
        showToast('Error senting otp', 'error')
        console.error("Error during signup:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const scrollToError = () => {
    const firstErrorField = document.querySelector(".border-red-500");
    if (firstErrorField) {
      firstErrorField.scrollIntoView({behavior: "smooth"});
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!formik.isValid) {
            scrollToError();
          } else {
            formik.handleSubmit();
          }
        }}
        className="space-y-6"
      >
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.username && formik.errors.username
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </p>
          )}
        </div>

        {/* Phone Number Field */}
        <div>
          <label
            htmlFor="phone_number"
            className="block font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone_number"
            name="phone_number"
            type="text"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.phone_number && formik.errors.phone_number
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("phone_number")}
          />
          {formik.touched.phone_number && formik.errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.phone_number}
            </p>
          )}
        </div>

        {/* Date of Birth Field */}
        <div>
          <label
            htmlFor="date_of_birth"
            className="block font-medium text-gray-700"
          >
            Date of Birth
          </label>
          <input
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.date_of_birth && formik.errors.date_of_birth
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("date_of_birth")}
          />
          {formik.touched.date_of_birth && formik.errors.date_of_birth && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.date_of_birth}
            </p>
          )}
        </div>

        {/* Gender Field */}
        <div>
          <label htmlFor="gender" className="block font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.gender && formik.errors.gender
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.gender}</p>
          )}
        </div>

        {/* Blood Group Field */}
        <div>
          <label
            htmlFor="blood_group"
            className="block font-medium text-gray-700"
          >
            Blood Group
          </label>
          <select
            id="blood_group"
            name="blood_group"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.blood_group && formik.errors.blood_group
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("blood_group")}
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          {formik.touched.blood_group && formik.errors.blood_group && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.blood_group}
            </p>
          )}
        </div>

        {/* Allergies Field */}
        <div>
          <label
            htmlFor="allergies"
            className="block font-medium text-gray-700"
          >
            Allergies (optional)
          </label>
          <input
            id="allergies"
            name="allergies"
            type="text"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.allergies && formik.errors.allergies
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("allergies")}
          />
          {formik.touched.allergies && formik.errors.allergies && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.allergies}
            </p>
          )}
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block font-medium text-gray-700">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.address && formik.errors.address
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("address")}
          />
          {formik.touched.address && formik.errors.address && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.address}</p>
          )}
        </div>

        {/* Emergency Contact Number Field */}
        <div>
          <label
            htmlFor="emergency_contact_number"
            className="block font-medium text-gray-700"
          >
            Emergency Contact Number
          </label>
          <input
            id="emergency_contact_number"
            name="emergency_contact_number"
            type="text"
            className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.emergency_contact_number &&
              formik.errors.emergency_contact_number
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("emergency_contact_number")}
          />
          {formik.touched.emergency_contact_number &&
            formik.errors.emergency_contact_number && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.emergency_contact_number}
              </p>
            )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-2  text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-600 mt-2">
          already have account?{" "}
          <a
            href="/auth/sign-in/"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Sign-In
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
