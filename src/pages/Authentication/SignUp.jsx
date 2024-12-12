import React, {useState} from "react";
import SignUpForm from "@/components/Forms/SignUpForm";
import {InputOTPControlled} from "@/components/Forms/OtpComponent";
import instance from "@/utils/axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [patientData, setPatientData] = useState({});
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  console.log('otp', otp)

  const verifyAndLogin = async () => {
    try {
        setLoading(true)
      const updatedData = {
        ...patientData,
        otp: otp,
      };
      const response = await instance.post(
        "/accounts/patient-verify-otp/",
        updatedData
      );
      navigate('/')
      if (response.data) {
        console.log("OTP verified successfully", response.data);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }finally{
        setLoading(false)
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center"> Sign Up</h1>
      {!isOTPsent ? (
        <SignUpForm
          setPatientData={setPatientData}
          setIsOTPsent={setIsOTPsent}
        />
      ) : (
        <InputOTPControlled
          email={patientData?.patient?.user_data?.email}
          verifyAndLogin={verifyAndLogin}
          setOtp={setOtp}
          isLoading={loading}
        />
      )}
    </div>
  );
};

export default SignUp;
