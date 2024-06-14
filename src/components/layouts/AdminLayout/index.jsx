import "./AdminLayout.scss";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = () => {
  return (
    <div style={{ position: "relative" }}>
      <Topbar />
      <Sidebar />
      <div className="outlet ">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
