import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import StyledButton from "../Buttons/StyledButtons";

const SignInForm = ({onSubmit, isLoading}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border rounded-md p-2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <StyledButton type="submit" isLoading={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </StyledButton>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-600 mt-2">
          No account?{" "}
          <a
            href="/auth/sign-up"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Please sign up
          </a>
        </p>
      </div>
    </>
  );
};

export default SignInForm;
