import "./Dashboard.css";
import { useOpenContext } from "../../contexts/open";
export default function Dashboard() {
  const { isOpen } = useOpenContext();
  return <div className="dashboard">Dashboard</div>;
}
