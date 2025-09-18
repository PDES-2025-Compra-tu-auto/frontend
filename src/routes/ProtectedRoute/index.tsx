import { useAuth } from "@/context/AuthContext/useAuth";
import {  Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if(isLoading)return null
  
  return isAuthenticated? <Outlet/> : <Navigate to={'/login'}/>;
};
