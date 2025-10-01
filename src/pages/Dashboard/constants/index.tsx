import CarRentalIcon from "@mui/icons-material/CarRental";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import type { ReactNode } from "react";

interface ICardsProfile {
  [key: string]: { icon: ReactNode };
}
const iconStyle = { color: '#0066ff', fontSize: '2.5rem' };

export const CARDS_PROFILE: ICardsProfile = {
  "my-cars": {
    icon: <CarRentalIcon sx={iconStyle} />,
  },
  "favourites-cars": {
    icon: <FavoriteBorderIcon sx={iconStyle} />,
  },
  "explore-cars": {
    icon: <DirectionsCarIcon sx={iconStyle} />,
  },
  "reports": {
    icon: <InsertChartOutlinedIcon sx={iconStyle} />,
  },
  "most-favorited-cars": {
    icon: <FavoriteBorderIcon sx={iconStyle} />,
  },
  "registered-users": {
    icon: <PeopleAltOutlinedIcon sx={iconStyle} />,
  },
  "manage-concesionaries": {
    icon: <StorefrontOutlinedIcon sx={iconStyle} />,
  },
  "manage-cars": {
    icon: <DirectionsCarIcon sx={iconStyle} />,
  },
  "sales": {
    icon: <PointOfSaleIcon sx={iconStyle} />,
  },
  "customers": {
    icon: <PeopleAltOutlinedIcon sx={iconStyle} />,
  },
  "default": {
    icon: <HelpOutlineIcon sx={iconStyle} />,
  }
};
