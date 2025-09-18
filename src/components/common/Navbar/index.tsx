import { DirectionsCar, ExpandMore, Logout } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import { useAuth } from "@/context/AuthContext/useAuth";

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const openMenu = Boolean(anchorEl);
  const { isAuthenticated, userProfile, logout } = useAuth();
  const { pathname } = useLocation();
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
    <AppBar
      position="sticky"
      sx={{
        display: showNavbar ? "visible" : "none",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DirectionsCar sx={{ fontSize: 32 }} />
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Compra tu auto
            </Typography>
          </Box>
        {isAuthenticated && (<>  <Button
            onClick={handleClick}
            variant="text"
            sx={{
              textTransform: "none",
              ml: 2,
              px: 1,
              py: 0.5,
              borderRadius: 1,
              color: "text.primary",
              "&:hover": {
                backgroundColor: "action.hover", 
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{ width: 40, height: 40, fontSize: "1rem" }}
                name={userProfile?.fullName || "U"}
              />
              <ExpandMore sx={{ fontSize: 20 }} />
            </Box>
          </Button>

          
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={openMenu}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              sx={{
                "& .MuiPaper-root": {
                  boxShadow: "0 10px 30px -10px rgba(0, 102, 255, 0.3)",
                  border: "1px solid #e2e8f0",
                  minWidth: 220,
                  borderRadius: 2,
                  overflow: "hidden",
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" color="text.primary">
                  {userProfile?.fullName || "Nombre no disponible"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userProfile?.email || ""}
                </Typography>
              </Box>

              <Divider />

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/profile");
                }}
              >
                <ListItemIcon>
                  <Avatar sx={{ height: 25, width: 25 }} />
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
          </>)}

          {!isAuthenticated && (
            <>
              <Button
                variant="outlined"
                endIcon={<ExpandMore />}
                onClick={handleMenuClick}
              >
                Acceder
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{
                  "& .MuiPaper-root": {
                    boxShadow: "0 10px 30px -10px rgba(0, 102, 255, 0.3)",
                    border: "1px solid #e2e8f0",
                    minWidth: 200,
                  },
                }}
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
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/register");
                  }}
                >
                  Registrar Agencia
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
