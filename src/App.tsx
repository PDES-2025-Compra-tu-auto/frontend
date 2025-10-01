import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import { Navbar } from "./components/core/containers/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element ={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
