import React from "react";
import "./index.css";
import Header from "./components/Header/header";
import Login from "./pages/Login/Login";
const App = () => {
  return (
    <div className="bg-mybgcolor h-full">
      <Header title="이약머약"></Header>
      <Login></Login>
    </div>
  );
};

export default App;
