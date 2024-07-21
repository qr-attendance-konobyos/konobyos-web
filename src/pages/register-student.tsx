import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCreateStudentMutation } from "../api";
import { useFormReducer } from "../utils";
import "./register-student.scss";

export const RegisterStudent = () => {
  const navigate = useNavigate();
  const { value, register } = useFormReducer({
    name: "",
    christianName: "",
    phoneNumber: "",
    email: "",
  });

  const registerStudent = useCreateStudentMutation();

  const handler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    registerStudent.mutateAsync(value).then(() => navigate(-1));
  };

  const isLoading = registerStudent.isPending;

  return (
    <form className="register-student" onSubmit={handler}>
      <button
        onClick={() => navigate(-1)}
        className="button icon primary close-button"
      >
        <FaTimes size="16px" />
      </button>
      <h2>Student Registration</h2>
      <div className="form-field">
        <label>Name</label>
        <input type="text" {...register("name")} disabled={isLoading} />
      </div>
      <div className="form-field">
        <label>Christian Name</label>
        <input
          type="text"
          {...register("christianName")}
          disabled={isLoading}
        />
      </div>
      <div className="form-field">
        <label>Phone Number</label>
        <input
          type="number"
          autoComplete="tel"
          {...register("phoneNumber")}
          disabled={isLoading}
        />
      </div>
      <div className="form-field">
        <label>Email</label>
        <input
          type="email"
          autoComplete="email"
          {...register("email")}
          disabled={isLoading}
        />
      </div>
      {registerStudent.isError && (
        <span className="error">{registerStudent.error.message}</span>
      )}
      <button className="button primary" type="submit" disabled={isLoading}>
        Register
      </button>
    </form>
  );
};
