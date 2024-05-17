import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import PhotoUpload from "../pages/PhotoUpload/PhotoUpload";
import KaKaoLogin from "../pages/Login/KaKaoLoginForm";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/upload" element={<PhotoUpload />} />
        <Route path="/kakao-login" element={<KaKaoLogin />} />
        {/* <Route path="/login/oauth2/code/kakao" element={<KaKaoRedirectHandler />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
