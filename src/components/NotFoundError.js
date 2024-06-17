import { Link } from "react-router-dom";

const NotFoundError = ({ errorTitle, errorMessage, errorImage }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center error-message p-5">
        {errorImage && (
          <img
            className="w-[200px] sm:w-[300px] h-auto mb-10"
            src={errorImage}
            alt={errorTitle}
          />
        )}
        <h1 className="text-4xl font-bold">{errorTitle && errorTitle}</h1>
        <p className="text-lg mt-4">{errorMessage && errorMessage}</p>
      </div>
    </div>
  );
};

export default NotFoundError;
