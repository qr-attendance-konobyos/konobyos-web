import { useLogin } from "../api";
import { useFormReducer } from "../utils";
import "./login.scss";

export function Login() {
  const login = useLogin();
  const [form, updateForm] = useFormReducer({ phoneNumber: "", pin: "" });

  return (
    <div className="login-form">
      <h1> Login</h1>
      <label>Phone Number</label>
      <input
        type="number"
        autoComplete="tel"
        onChange={(e) => updateForm({ phoneNumber: e.target.value })}
        placeholder="phone number"
      />
      <label>PIN</label>
      <input
        type="password"
        onChange={(e) => updateForm({ pin: e.target.value })}
        placeholder="pin"
        autoComplete="current-password"
      />
      <button onClick={() => login.mutate(form)}>log in</button>
    </div>
  );
}
