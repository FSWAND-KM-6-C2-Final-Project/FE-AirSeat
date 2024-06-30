import React from "react";
import ResetPassword from "../components/ResetPassword";
import Title from "../components/Title";

const ResetPasswordPage = () => {
  return (
    <div>
      <Title text={"Forgot Password"} />
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordPage;
