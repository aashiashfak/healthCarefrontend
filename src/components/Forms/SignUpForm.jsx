import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import instance from "@/utils/axios";
import {Button} from "../ui/button";
import useToastNotification from "@/utils/sonnerToast";
import StyledButton from "../Buttons/StyledButtons";

const SignUpForm = ({setPatientData, setIsOTPsent}) => {
  const [loading, setLoading] = useState(false);
  const showToast = useToastNotification();

  const fields = [
    {name: "email", label: "Email", type: "email", required: true},
    {name: "username", label: "Username", type: "text", required: true},
    {name: "phone_number", label: "Phone Number", type: "tel", required: true},
    {
      name: "date_of_birth",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      options: ["Male", "Female", "Other"],
    },
    {
      name: "blood_group",
      label: "Blood Group",
      type: "select",
      required: true,
      options: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
    },
    {name: "allergies", label: "Allergies (Optional)", type: "text"},
    // {name: "address", label: "Address", type: "text", required: true},
    {
      name: "emergency_contact_number",
      label: "Emergency Contact Number",
      type: "tel",
      required: true,
    },
  ];

  const validationSchema = fields.reduce((schema, field) => {
    let rule;
    if (field.type === "email")
      rule = Yup.string().email("Invalid email").required("Required");
    else if (field.name === "phone_number" || field.name === "emergency_contact_number") 
      rule = Yup.string()
        .matches(/^\d{10}$/, "Must be a valid 10-digit phone number")
        .required("Required");
    else if (field.type === "text")
      rule = field.required ? Yup.string().required("Required") : Yup.string();
    else if (field.type === "date") rule = Yup.date().required("Required");
    else if (field.type === "select") rule = Yup.string().required("Required");

    return {...schema, [field.name]: rule};
  }, {});

  const formik = useFormik({
    initialValues: fields.reduce(
      (acc, field) => ({...acc, [field.name]: ""}),
      {}
    ),
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values, {setErrors}) => {
      try {
        setLoading(true);
        const response = await instance.post("accounts/patient-sign-up/", {
          email: values.email,
          phone_number: values.phone_number,
        });
        showToast(response?.data?.message || "OTP sent", "success");
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
            emergency_contact_number: values.emergency_contact_number,
          },
        });
        setIsOTPsent(true);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrors(error.response.data.error); 
        } else {
          showToast("Error sending OTP", "error");
        }
        showToast("Error sending OTP", "error");
        console.error("Error during signup:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className=""
      >
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block font-medium text-gray-700 mt-2"
            >
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                id={field.name}
                name={field.name}
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps(field.name)}
              >
                <option value="" disabled className="text-gray-500">
                  Select {field.label}
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={
                  field.name === "phone_number" ||
                  field.name === "emergency_contact_number"
                    ? "tel"
                    : field.type
                }
                maxLength={field.name.includes("phone_number") ? 10 : undefined}
                pattern={
                  field.name.includes("phone_number") ? "[0-9]{10}" : undefined
                }
                className={`mt-1 block w-full p-2 border rounded-md shadow-sm ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                {...formik.getFieldProps(field.name)}
              />
            )}
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <StyledButton type="submit" isLoading={loading} className="mt-4">
          {loading ? "Submitting..." : "Submit"}
        </StyledButton>
      </form>
      <div className="text-center">
        <p className="text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <a
            href="/auth/sign-in"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Please sign in
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUpForm;
