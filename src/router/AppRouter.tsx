import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import PhotoUpload from "../pages/PhotoUpload/PhotoUpload";
import Header from "../components/Header/header";
import RegisterDoctorMedi from "../pages/RegisterDoctorMedi/RegisterDoctorMedi";
import MediInfo from "../pages/MediInfo/MediInfo";
import WarnMedi from "../pages/WarnMedi/WarnMedi";
import KaKaoRedirectHandler from "../pages/Login/components/KaKaoRedirectHandler";
import RegisterEachMedi from "../pages/RegisterEachMedi/RegisterEachMedi";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header title="이약머약" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<PhotoUpload />} />
        <Route path="/register-doctormedi" element={<RegisterDoctorMedi />} />
        <Route path="/register-eachmedi" element={<RegisterEachMedi />} />
        <Route path="/mediinfo" element={<MediInfo />} />
        <Route path="/warnmedi" element={<WarnMedi />} />
        <Route path="/redirect" element={<KaKaoRedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
