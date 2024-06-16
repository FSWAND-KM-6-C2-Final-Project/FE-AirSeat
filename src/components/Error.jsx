import { Link } from "react-router-dom";

const Error = ({ statusCode, errorTitle, errorMessage, errorImage }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen text-center error-message">
        {errorImage && (
          <img
            className="w-[300px] h-auto mb-10"
            src={errorImage}
            alt={errorTitle}
          />
        )}
        <h1 className="text-4xl font-bold">
          {statusCode && statusCode} - {errorTitle && errorTitle}
        </h1>
        <p className="text-lg mt-4">{errorMessage && errorMessage}</p>
        <Link
          to="/"
          className="mt-6 bg-customBlue1 text-white hover:bg-customBlue2 px-5 py-2 rounded"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
