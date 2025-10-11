import { DirectionsCar, ExpandMore, Logout } from "@mui/icons-material";
import {
  Box,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../../../common/Avatar";
import { useAuth } from "@/context/AuthContext/useAuth";
import { UserRole } from "@/domain/user/types";

import {
  StyledAppBar,
  StyledToolbar,
  LogoBox,
  RoleTypography,
  StyledDivider,
  UserButton,
  MenuPaper,
  MenuPaperSmall,
  Divider,
} from "./styles";

const MAPPED_ROLE: { [key: string]: string } = {
  [UserRole.ADMINISTRATOR]: "Administración",
  [UserRole.CONCESIONARY]: "Concesionarias",
  [UserRole.BUYER]: "Clientes",
  DEFAULT: "",
};

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated, userProfile, logout } = useAuth();
  const { pathname } = useLocation();

  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout().then(() => navigate("/"));
  };
  const showNavbar = useMemo(() => {
    const hideOnPathname = ["/login", "/register"];
    return !hideOnPathname.includes(pathname);
  }, [pathname]);
  return (
    <StyledAppBar position="sticky" show={showNavbar}>
      <Container sx={{maxWidth:'100%',width:'100%', minWidth:'100%'}}>
        <StyledToolbar>
          <LogoBox>
            <DirectionsCar sx={{ fontSize: 32 }} />
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", pt: 0.5 }}
            >
              Compra tu auto
            </Typography>
            {isAuthenticated && (
              <>
                <StyledDivider orientation="vertical" flexItem />
                <RoleTypography variant="h5">
                  {MAPPED_ROLE[userProfile?.role || "DEFAULT"]}
                </RoleTypography>
              </>
            )}
          </LogoBox>

          {isAuthenticated ? (
            <>
              <UserButton onClick={handleClick}>
                <LogoBox>
                  <Avatar
                    sx={{ width: 40, height: 40, fontSize: "1rem" }}
                    name={userProfile?.fullname || "U"}
                  />
                  <ExpandMore sx={{ fontSize: 20 }} />
                </LogoBox>
              </UserButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                sx={{ "& .MuiPaper-root": MenuPaper }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" color="text.primary">
                    {userProfile?.fullname || "Nombre no disponible"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userProfile?.email || ""}
                  </Typography>
                </Box>

                <Divider />

                <MenuItem
                  sx={{mt:1}}
                  onClick={() => {
                    handleMenuClose();
                    navigate("/profile");
                  }}
                >
                  <ListItemIcon>
                    <Avatar sx={{ height: 25, width: 25,bgcolor:'#1976d2' }} />
                  </ListItemIcon>
                  Mi perfil
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <UserButton
                variant="outlined"
                endIcon={<ExpandMore />}
                onClick={handleMenuClick}
              >
                ACCEDER
              </UserButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ "& .MuiPaper-root": MenuPaperSmall }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/login");
                  }}
                >
                  Iniciar Sesión
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/register");
                  }}
                >
                  Registrarse
                </MenuItem>
              </Menu>
            </>
          )}
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};
