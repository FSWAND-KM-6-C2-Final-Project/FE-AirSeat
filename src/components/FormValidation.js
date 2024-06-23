import { IoMdAlert } from "react-icons/io";

const FormValidation = ({ errorMessage }) => {
  return (
    <>
      <p className="text-red-500 flex items-center font-semibold text-sm mt-1">
        <IoMdAlert className="mr-1" /> {errorMessage}
      </p>
    </>
  );
};

export default FormValidation;
