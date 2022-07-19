import "./RegisterForm.css";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../../../hooks/useRegisterForm";
import { useAuthContext } from "../../../contexts/auth";

export default function RegisterForm() {
  const { user, setUser } = useAuthContext();
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } =
    useRegisterForm({ user, setUser });
  return (
    <div className="register-form">
      <h2>Register For An Account</h2>
      <div className="form">
        <div className="input-field">
          <label htmlFor="email">Enter email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleOnInputChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">Enter full name</label>
              <input
                type="text"
                name="firstName"
                placeholder="name"
                value={form.firstName}
                onChange={handleOnInputChange}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
            />
            {errors.passwordConfirm && (
              <p className="error">{errors.passwordConfirm}</p>
            )}
          </div>

          <button
            className="submit-register"
            disabled={isLoading}
            onClick={handleOnSubmit}
          >
            {isLoading ? "Loading..." : "Create Account"}
          </button>
        </div>
      </div>

      <div className="footer">
        <p>
          Already have an account? Login <Link to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}
