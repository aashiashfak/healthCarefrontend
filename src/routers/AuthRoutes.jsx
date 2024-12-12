import SignUp from '@/pages/Authentication/SignUp';
import {Route, Routes} from "react-router-dom";
import React from 'react'

const AuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/sign-up" element={<SignUp/>} />
      </Routes>
    </div>
  );
}

export default AuthRoutes
