// import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import "./RegisterPage.css";
import RegisterForm from "./RegisterForm/RegisterForm";
// import { useAuthContext } from "../../contexts/auth";

export default function RegisterPage() {
  // const { user, setUser } = useAuthContext();
  return (
    <div className="registration-page">
      <RegisterForm />
    </div>
  );
}
