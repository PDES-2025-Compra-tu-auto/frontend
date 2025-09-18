import { Typography, Box, Container } from "@mui/material";
import { DirectionsCar, Security, People, Star } from "@mui/icons-material";
import heroImage from "@/assets/cars.jpg";
import { LandingCard } from "./components/LandingCard";
import { Button } from "@/components/common/Button";

const Landing = () => {

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to right, rgba(51, 65, 85, 0.8), rgba(51, 65, 85, 0.4))",
          },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "white",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "4.5rem" },
              fontWeight: "bold",
              mb: 3,
              animation: "fadeIn 1s ease-out",
            }}
          >
            Encuentra tu
            <Box component="span" sx={{ display: "block" }}>
              Auto Perfecto
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: 600,
              mx: "auto",
              opacity: 0.9,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
            }}
          >
            La plataforma líder para comprar y gestionar ventas de automóviles a
            traves de las mejores concesionarias. Conectamos compradores y
            agencias en un solo lugar.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.125rem",
                textTransform: "uppercase",
              }}
            >
              Explorar Autos
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              ¿Por qué elegir Compra tu auto?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Ofrecemos la mejor experiencia para comprar y vender automóviles
              con total seguridad y confianza.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
            }}
          >
            <LandingCard
              title={"Seguridad Garantizada"}
              legend={
                "Verificamos todos los vehículos y vendedores para garantizar transacciones seguras y confiables."
              }
              icon={<Security sx={{ fontSize: 32, color: "primary.main" }} />}
            />
            <LandingCard
              title={"Red de Agencias"}
              legend={
                "Conectamos con las mejores agencias y concesionarios para ofrecerte más opciones y mejores precios."
              }
              icon={<People sx={{ fontSize: 32, color: "primary.main" }} />}
            />
            <LandingCard
              title={"Experiencia Premium"}
              legend={
                "Interfaz intuitiva, búsqueda avanzada y herramientas que facilitan encontrar exactamente lo que buscas."
              }
              icon={<Star sx={{ fontSize: 32, color: "primary.main" }} />}
            />
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 10, bgcolor: "rgb(0, 102, 255)" }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "white", mb: 3 }}
          >
            ¿Listo para comenzar?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 4,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Únete a miles de usuarios que ya confían en Compra tu auto para sus
            necesidades automotrices.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              textTransform: "uppercase",
              px: 4,
              py: 1.5,
              background: "white",
              color: "primary.main",
              "&:hover": { bgcolor: "grey.100" },
            }}
          >
            Crear Cuenta Gratis
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ color: "white", py: 6, bgcolor: "rgb(51, 65, 85)" }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
              gap: 4,
            }}
          >
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <DirectionsCar />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Compra tu auto
                </Typography>
              </Box>
              <Typography sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                La plataforma líder para la compra y venta de automóviles en
                toda la región.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Servicios
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                   variant="text"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: "flex-start",
                    
                  }}
                  disableFocusRipple
                >
                  Comprar Auto
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: "flex-start",
                  }}
                  disableFocusRipple
                >
                  Vender Auto
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: "flex-start",
                  }}
                  disableFocusRipple
                >
                  Financiamiento
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: "flex-start",
                  }}
                  disableFocusRipple
                >
                  Seguro
                </Button>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Agencias
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: "flex-start",
                  }}
                  disableFocusRipple
                >
                  Registrar Agencia
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: "flex-start",
                  }}
                  disableFocusRipple
                >
                  Panel de Control
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: "flex-start",
                  }}
                  disableFocusRipple
                >
                  Herramientas
                </Button>
                <Button
                  variant="text"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    justifyContent: "flex-start",
                  }}
                  disableFocusRipple
                >
                  Soporte
                </Button>
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Contacto
              </Typography>
              <Box
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography>contacto@cta.com</Typography>
                <Typography>+1 (555) 123-4567</Typography>
                <Typography>Lunes a Viernes 9-18hs</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              mt: 4,
              pt: 4,
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <Typography>
              &copy; 2025 Compra tu auto. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
