import { useAuth } from "@/context/AuthContext/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PublicRoute = () =>{ 
  const { isAuthenticated, isLoading } = useAuth();
  const {pathname} =useLocation()
  
  if(isLoading)return null
  
  return !isAuthenticated || pathname ==='/'? <Outlet/> : <Navigate to={'/dashboard'}/>;
};