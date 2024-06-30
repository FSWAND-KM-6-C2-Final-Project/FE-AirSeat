import NavbarOTP from "../components/NavbarOTP";
import OTPInputResetPassword from "../components/OTPInputResetPassword";
import Title from "../components/Title";

const OTPResetPasswordPage = () => {
  return (
    <div>
      <Title text={"Forgot Password"} />
      <NavbarOTP />
      <OTPInputResetPassword />
    </div>
  );
};

export default OTPResetPasswordPage;
