import React, {useState} from "react";
import SignUpForm from "@/components/Forms/SignUpForm";
import {InputOTPControlled} from "@/components/Forms/OtpComponent";
import instance from "@/utils/axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "@/redux/Slices/AuthSlice";
import useToastNotification from "@/utils/sonnerToast";
import BackButton from "@/components/Buttons/BackButton";

const SignUp = () => {
  const [isOTPsent, setIsOTPsent] = useState(false);
  const [patientData, setPatientData] = useState({});
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToastNotification();

  console.log("otp", otp);

  const verifyAndLogin = async () => {
    try {
      setLoading(true);
      const updatedData = {
        ...patientData,
        otp: otp,
      };
      const response = await instance.post(
        "/accounts/patient-verify-otp/",
        updatedData
      );
      const {access, user} = response.data;
      dispatch(
        setUser({
          isAuthenticated: true,
          isActive: user.is_active || "",
          email: user.email || "",
          username: user.username || "",
          phoneNumber: user.phone_number || "",
          accessToken: access || "",
          dateOfBirth: user.date_of_birth || "",
          role: user.role || "",
        })
      );
      showToast("user created and Logged succussfully", "succuss");
      navigate("/");
      if (response.data) {
        console.log("OTP verified successfully", response.data);
      }
    } catch (error) {
      showToast(error.response.data.error, error);
      console.error("Error during OTP verification:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleBackClick = () =>{
    navigate("/");
  }

  return (
    <>
      <div className="max-w-md mx-auto my-10 p-6 border rounded-md shadow-md ">
        <BackButton handleBackClick={handleBackClick}/>
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
    </>
  );
};

export default SignUp;
