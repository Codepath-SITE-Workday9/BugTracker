import AccessForbidden from "../AccessForbidden/AccessForbidden";
import { useAuthContext } from "../../contexts/auth";

export default function ProtectedRoute({ element }) {
  const { user, isProcessing } = useAuthContext();
  console.log("AF user: ", user);
  console.log("Processing", isProcessing);

  console.log("Protectedroute");
  if (isProcessing) {
    console.log("Protected route processing");

    return null;
  }
  console.log("Processing", isProcessing);
  if (!user?.email) {
    console.log("No Access proteced rout");
    return <AccessForbidden />;
  }
  console.log("Accessing ");
  return <>{element}</>;
}
