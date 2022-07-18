import "./RegisterForm.css";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  // const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } =
  //   useRegistrationForm({ user, setUser });
  return (
    <div className="registration-form">
      <h2>Register For an Account</h2>
      <div className="form">
        <div className="input-field">
          <label htmlFor="email">Enter email</label>
          <input
            type="email"
            name="email"
            placeholder="jane@doe.io"
            //   value={form.email}
            //   onChange={handleOnInputChange}
          />
          {/* {errors.email && <span className="error">{errors.email}</span>} */}

          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="name">Enter full name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Jane"
                //   value={form.firstName}
                //   onChange={handleOnInputChange}
              />
              {/* {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )} */}
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              // value={form.password}
              // onChange={handleOnInputChange}
            />
            {/* {errors.password && (
                <span className="error">{errors.password}</span>
              )} */}
          </div>

          <div className="input-field">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="confirm password"
              // value={form.passwordConfirm}
              // onChange={handleOnInputChange}
            />
            {/* {errors.passwordConfirm && (
                <span className="error">{errors.passwordConfirm}</span>
              )} */}
          </div>

          <button
            className="submit-registration"
            //   disabled={isLoading}
            //   onClick={handleOnSubmit}
          >
            {" "}
            Sign up
            {/* {isLoading ? "Loading..." : "Create Account"} */}
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
