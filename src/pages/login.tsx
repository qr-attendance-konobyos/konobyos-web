import { useLogin } from "../api";
import { useFormReducer } from "../utils";
import "./login.scss";

export function Login() {
  const login = useLogin();
  const { value: form, register } = useFormReducer({
    phoneNumber: "",
    pin: "",
  });

  return (
    <div className="login-form">
      <h1> Login</h1>
      <div className="form-field">
        <label>Phone Number</label>
        <input
          type="number"
          autoComplete="tel"
          {...register("phoneNumber")}
          placeholder="phone number"
        />
      </div>
      <div className="form-field">
        <label>PIN</label>
        <input
          type="password"
          {...register("pin")}
          placeholder="pin"
          autoComplete="current-password"
        />
      </div>
      <button className="button primary" onClick={() => login.mutate(form)}>
        Log In
      </button>
    </div>
  );
}
