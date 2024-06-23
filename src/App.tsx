import { Reset } from "styled-reset";
import "./index.css";
import AppRouter from "./router/AppRouter";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-mybgcolor font-laundryRegular">
      <AppRouter />
      <Reset />
    </div>
  );
};

export default App;
