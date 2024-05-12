import React from "react";
import { Reset } from "styled-reset";
import "./index.css";
import Header from "./components/Header/header";
import Login from "./pages/Login/Login";
import RegisterDoctorMedi from "./pages/RegisterDoctorMedi/RegisterDoctorMedi";
const App = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-mybgcolor font-laundryRegular">
      <Reset />
      <Header title="이약머약"></Header>
      <RegisterDoctorMedi />
      {/* <Login /> */}
    </div>
  );
};

export default App;
