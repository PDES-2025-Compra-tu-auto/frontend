import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import { Navbar } from "./components/core/containers/Navbar";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ExploreCars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import CreateSaleCar from "./pages/CreateSaleCar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cars" element={<ExploreCars />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/sale-car" element={<CreateSaleCar />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
