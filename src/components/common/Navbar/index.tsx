import { DirectionsCar, ExpandMore } from "@mui/icons-material"
import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navbar=()=>{
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
      const navigate = useNavigate()
      const {pathname} = useLocation()
      const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

      const showNavbar = useMemo(()=>{
        const hideOnPathname = ['/login','/register']
        return !hideOnPathname.includes(pathname)
    },[pathname])
      
    return(
          <AppBar
          
        position="sticky"
        sx={{
            display: showNavbar? 'visible':'none',
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
              <MenuItem onClick={()=>{
                handleMenuClose()
                navigate('/login')}}>Iniciar Sesión</MenuItem>
              <MenuItem onClick={()=>{
                handleMenuClose()
                navigate('/register')}}>Registrarse</MenuItem>
              <MenuItem onClick={()=>{
                handleMenuClose()
                navigate('/register')}}>Registrar Agencia</MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    )
}