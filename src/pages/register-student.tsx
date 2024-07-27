import { SubmitHandler, useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { StudentModel, useCreateStudentMutation } from "../api";
import "./register-student.scss";

export const RegisterStudent = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      christianName: "",
      phoneNumber: "",
      email: "",
    },
  });

  const registerStudent = useCreateStudentMutation();

  const handler: SubmitHandler<Omit<StudentModel, "id">> = (value) => {
    registerStudent.mutateAsync(value).then(() => navigate(-1));
  };

  const isLoading = registerStudent.isPending;

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="button icon primary close-button"
      >
        <FaTimes size="16px" />
      </button>
      <form className="register-student" onSubmit={handleSubmit(handler)}>
        <h2>Student Registration</h2>
        <div className="form-field">
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            disabled={isLoading}
          />
        </div>
        <div className="form-field">
          <label>Christian Name</label>
          <input
            type="text"
            {...register("christianName", {
              required: "Christian Name is required",
            })}
            disabled={isLoading}
          />
        </div>
        <div className="form-field">
          <label>Phone Number</label>
          <input
            type="number"
            autoComplete="tel"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            disabled={isLoading}
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            autoComplete="email"
            {...register("email", { required: false })}
            disabled={isLoading}
          />
        </div>
        {registerStudent.isError && (
          <span className="error">{registerStudent.error.message}</span>
        )}
        {formState.errors && (
          <span className="error">
            {Object.keys(formState.errors).map((key) => {
              const message =
                formState.errors?.[key as keyof typeof formState.errors]
                  ?.message;
              return <div>- {message}</div>;
            })}
          </span>
        )}
        <button className="button primary" type="submit" disabled={isLoading}>
          Register
        </button>
        <button
          className="button outline"
          type="button"
          onClick={() => navigate(-1)}
          disabled={isLoading}
        >
          Cancel
        </button>
      </form>
    </>
  );
};
