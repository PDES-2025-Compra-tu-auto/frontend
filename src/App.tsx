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
import ConcessionarySales from "./pages/ConcesionarySales";
import AdminReports from "./pages/Admin/Reports";
import BuyerRegistered from "./pages/Admin/BuyerRegistered";
import AdminFavouritesCars from "./pages/Admin/FavouriteCars";
import ManageConcesionaries from "./pages/Admin/ConcesionaryManage";
import Favourites from "./pages/Favourites";
import BuyerPurchases from "./pages/BuyerPurchases";
import ManageSaleCar from "./pages/ManageSaleCar";
import ConcessionaryCustomers from "./pages/ConcesionaryClients";
import TotalPurchases from "./pages/Admin/TotalPurchases";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cars" element={<ExploreCars />} />
          <Route path="/car/:id" element={<CarDetail from='CARS'/>} />
          <Route path="/car/:id/favourite" element={<CarDetail from='FAV'/>} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/purchases" element={<BuyerPurchases />} />
          <Route path="/sale-car" element={<CreateSaleCar />} />
          <Route path="/concesionary/sales" element={<ConcessionarySales />} />
          <Route path="/concesionary/customers" element={<ConcessionaryCustomers />} />
          
          <Route path='/concesionary/manage-cars' element={<ManageSaleCar/>}/>
          <Route
            path="/admin/favourites-cars"
            element={<AdminFavouritesCars />}
          />
          <Route path="/admin/buyers" element={<BuyerRegistered />} />
          <Route
            path="/admin/concesionaries"
            element={<ManageConcesionaries />}
          />
          <Route path="/admin/total-purchases" element={<TotalPurchases/>} />
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
