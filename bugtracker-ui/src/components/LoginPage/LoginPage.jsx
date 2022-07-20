import "./LoginPage.css";
import LoginForm from "./LoginForm/LoginForm";
import { useAuthContext } from "../../contexts/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  });

  return (
    <div className="login-page">
      <div className="login-card">
        <span className="material-symbols-outlined">pest_control</span>
        <LoginForm />
      </div>
    </div>
  );
}
