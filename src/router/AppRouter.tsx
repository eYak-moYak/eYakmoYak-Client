import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import PhotoUpload from "../pages/PhotoUpload/PhotoUpload";
import KaKaoLogin from "../pages/Login/KaKaoLoginForm";
import Header from "../components/Header/header";
import RegisterDoctorMedi from "../pages/RegisterDoctorMedi/RegisterDoctorMedi";
import MediInfo from "../pages/MediInfo/MediInfo";
import WarnMedi from "../pages/WarnMedi/WarnMedi";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header title="이약머약" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<PhotoUpload />} />
        <Route path="/register" element={<RegisterDoctorMedi />} />
        <Route path="/mediinfo" element={<MediInfo />} />
        <Route path="/warnmedi" element={<WarnMedi />} />

        <Route path="/kakao-login" element={<KaKaoLogin />} />
        {/* <Route path="/login/oauth2/code/kakao" element={<KaKaoRedirectHandler />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
