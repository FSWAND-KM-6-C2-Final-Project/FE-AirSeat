import { Link } from "react-router-dom";
import UserNavbar from "../components/NavbarAccount";
import restrictedImage from "../images/restricted.png";

const UnauthenticatePage = () => {
  return (
    <div>
      <UserNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-center error-message p-5">
        <img
          className="h-[200px] sm:h-[300px] w-auto mb-10"
          src={restrictedImage}
          alt="Restricted"
        />
        <h1 className="text-4xl font-bold">Oooppsss...</h1>
        <p className="text-lg mt-4">
          Your session is expired, please sign in again.
        </p>
        <Link
          to="/sign-in"
          className="mt-6 bg-customBlue1 text-white hover:bg-customBlue2 px-5 py-2 rounded"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  );
};

export default UnauthenticatePage;
