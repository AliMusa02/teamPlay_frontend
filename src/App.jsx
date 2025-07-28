import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./layout/login";
import Register from "./layout/register";
import MainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <>
      <MainRoutes />
    </>
  );
}

export default App;
