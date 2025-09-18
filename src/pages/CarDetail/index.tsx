import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardMedia, 
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  ArrowBack as ArrowBackIcon,
  DirectionsCar as CarIcon,
  Speed as SpeedIcon,
  LocalGasStation as FuelIcon,
  Settings as SettingsIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  AccountCircle as AccountCircleIcon,
  CheckCircle as CheckIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(220, 100%, 45%)', // automotive-blue
    },
    secondary: {
      main: 'hsl(220, 20%, 20%)', // automotive-dark
    },
    background: {
      default: 'hsl(0, 0%, 100%)', // background
      paper: 'hsl(0, 0%, 100%)', // card
    },
    text: {
      primary: 'hsl(222.2, 84%, 4.9%)', // foreground
      secondary: 'hsl(220, 10%, 46%)', // automotive-gray
    },
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
  },
});

// Mock data for car details (in a real app, this would come from an API)
const mockCarDetails = {
  1: {
    id: 1,
    brand: 'BMW',
    model: 'Serie 3',
    year: 2023,
    price: 45000,
    mileage: 15000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    images: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ],
    description: 'Sedan de lujo con excelente rendimiento y comodidad. Este BMW Serie 3 combina deportividad y elegancia en cada detalle.',
    location: 'Madrid',
    features: [
      'Sistema de navegación GPS',
      'Asientos de cuero',
      'Control de crucero adaptativo',
      'Sistema de sonido premium',
      'Cámara de reversa',
      'Sensores de aparcamiento',
      'Bluetooth y USB',
      'Control de clima automático'
    ],
    specifications: {
      motor: '2.0L Turbo',
      potencia: '255 HP',
      consumo: '7.5L/100km',
      color: 'Negro Metálico',
      puertas: 4,
      plazas: 5,
      maletero: '480L'
    },
    seller: {
      name: 'AutoConcesionario Madrid',
      phone: '+34 91 123 4567',
      email: 'ventas@autoconcesionario.com',
      type: 'Concesionario Oficial'
    }
  }
};

export default function CarDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const car = mockCarDetails[Number(id) as keyof typeof mockCarDetails] || mockCarDetails[1];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleBack = () => {
    navigate('/explore');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Header */}
        <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
          <Toolbar>
            <IconButton 
              edge="start" 
              color="inherit" 
              sx={{ mr: 2 }}
              onClick={handleBack}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton 
              color="inherit" 
              sx={{ mr: 2 }}
              onClick={() => navigate('/')}
            >
              <CarIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              AutoMarket
            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Iniciar Sesión</MenuItem>
              <MenuItem onClick={handleMenuClose}>Registrarse</MenuItem>
              <MenuItem onClick={handleMenuClose}>Registrar Agencia</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
            gap: 4 
          }}>
            {/* Image Gallery */}
            <Box>
              <Card sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  height="500"
                  image={car.images[selectedImage]}
                  alt={`${car.brand} ${car.model}`}
                  sx={{ bgcolor: 'grey.200' }}
                />
              </Card>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: 1 
              }}>
                {car.images.map((image, index) => (
                  <Card 
                    key={index}
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedImage === index ? 2 : 0,
                      borderColor: 'primary.main'
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <CardMedia
                      component="img"
                      height="120"
                      image={image}
                      alt={`${car.brand} ${car.model} ${index + 1}`}
                      sx={{ bgcolor: 'grey.200' }}
                    />
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Car Information */}
            <Box>
              <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                  {car.brand} {car.model}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                  {car.year}
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Chip 
                    icon={<SpeedIcon />} 
                    label={`${car.mileage.toLocaleString()} km`} 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<FuelIcon />} 
                    label={car.fuel} 
                    variant="outlined"
                  />
                  <Chip 
                    icon={<SettingsIcon />} 
                    label={car.transmission} 
                    variant="outlined"
                  />
                </Stack>

                <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                  €{car.price.toLocaleString()}
                </Typography>

                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Comprar Ahora
                </Button>
                
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  Solicitar Información
                </Button>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {car.location}
                  </Typography>
                </Box>
              </Card>

              {/* Seller Information */}
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Vendedor
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium' }}>
                  {car.seller.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {car.seller.type}
                </Typography>
                
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2">
                      {car.seller.phone}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2">
                      {car.seller.email}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Box>
          </Box>

          {/* Description and Details */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, 
            gap: 4,
            mt: 4 
          }}>
            <Box>
              <Card sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Descripción
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {car.description}
                </Typography>
              </Card>

              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Características
                </Typography>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, 
                  gap: 1 
                }}>
                  {car.features.map((feature, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckIcon sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                      <Typography variant="body2">
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Box>

            <Box>
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Especificaciones Técnicas
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="Motor"
                      secondary={car.specifications.motor}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Potencia"
                      secondary={car.specifications.potencia}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Consumo"
                      secondary={car.specifications.consumo}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Color"
                      secondary={car.specifications.color}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Puertas"
                      secondary={car.specifications.puertas}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Plazas"
                      secondary={car.specifications.plazas}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="Capacidad Maletero"
                      secondary={car.specifications.maletero}
                    />
                  </ListItem>
                </List>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}