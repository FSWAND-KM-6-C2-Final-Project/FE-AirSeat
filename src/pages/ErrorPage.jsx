import UserNavbar from "../components/NavbarAccount";
import Error from "../components/Error";
import notFoundImage from "../images/not-found.png";

const ErrorPage = () => {
  return (
    <div>
      <UserNavbar />
      <div>
        <Error
          errorImage={notFoundImage}
          statusCode={404}
          errorTitle={"Page Not Found"}
          errorMessage={"Sorry, the page you are looking for does not exist."}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
