import CarRentalIcon from "@mui/icons-material/CarRental";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CreateIcon from '@mui/icons-material/Create';

import type { ReactNode } from "react";

interface ICardsProfile {
  [key: string]: { icon: ReactNode; redirect?: string };
}
const iconStyle = { color: "#0066ff", fontSize: "2.5rem" };

export const CARDS_PROFILE: ICardsProfile = {
  "create-sale-car":{
    icon: <CreateIcon sx={iconStyle}/>,
    redirect: "/sale-car"
  },

  "my-cars": {
    icon: <CarRentalIcon sx={iconStyle} />,
    redirect: '/purchases'
  },
  "favourites-cars": {
    icon: <FavoriteBorderIcon sx={iconStyle} />,
    redirect: '/favourites'
  },
  "explore-cars": {
    icon: <DirectionsCarIcon sx={iconStyle} />,
    redirect: "/cars",
  },
  reports: {
    icon: <InsertChartOutlinedIcon sx={iconStyle} />,
    redirect: '/admin/reports'
  },
  "most-favorited-cars": {
    icon: <FavoriteBorderIcon sx={iconStyle} />,
    redirect: '/admin/favourites-cars'
  },
  "registered-users": {
    icon: <PeopleAltOutlinedIcon sx={iconStyle} />,
    redirect:'/admin/buyers'
  },
  "total-purchases": {
    icon: <PointOfSaleIcon sx={iconStyle} />,
    redirect: '/admin/total-purchases'
  },
  "manage-concesionaries": {
    icon: <StorefrontOutlinedIcon sx={iconStyle} />,
    redirect: '/admin/concesionaries'
  },
  "manage-cars": {
    icon: <DirectionsCarIcon sx={iconStyle} />,
    redirect: '/concesionary/manage-cars'
  },
  sales: {
    icon: <PointOfSaleIcon sx={iconStyle} />,
    redirect: '/concesionary/sales'
  },
  customers: {
    icon: <PeopleAltOutlinedIcon sx={iconStyle} />,
    redirect: '/concesionary/customers'
  },
  default: {
    icon: <HelpOutlineIcon sx={iconStyle} />,
  },
};
