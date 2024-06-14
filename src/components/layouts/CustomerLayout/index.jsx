import { Outlet } from "react-router-dom";
import Header from "../../common/Header";
import Footer from "../../common/Footer";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../../hooks/AuthContext";
import "react-toastify/ReactToastify.css";

const customerLayoutStyles = {
  minHeight: '100vh',
};


const CustomerLayout = () => {
  return (
    <div style={customerLayoutStyles}> 
      <AuthProvider>
        <Header />
        <div style={{minHeight: '100vh', paddingTop: '125px'}}>
          <Outlet />
        </div>
        <Footer />
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
      </AuthProvider>
    </div>
  );
};

export default CustomerLayout;
