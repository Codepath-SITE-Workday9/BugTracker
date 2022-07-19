import "./LoginPage.css";
import LoginForm from "./LoginForm/LoginForm";
export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <span className="material-symbols-outlined">pest_control</span>
        <LoginForm />
      </div>
    </div>
  );
}
