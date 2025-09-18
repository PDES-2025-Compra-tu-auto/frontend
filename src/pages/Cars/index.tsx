import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Slider, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Stack
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { 
  Search as SearchIcon, 
  FilterList as FilterIcon,
  DirectionsCar as CarIcon,
  Speed as SpeedIcon,
  LocalGasStation as FuelIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

// Mock data for cars
const mockCars = [
  {
    id: 1,
    brand: 'BMW',
    model: 'Serie 3',
    year: 2023,
    price: 45000,
    mileage: 15000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    image: '/api/placeholder/300/200',
    description: 'Sedan de lujo con excelente rendimiento y comodidad.',
    location: 'Madrid'
  },
  {
    id: 2,
    brand: 'Audi',
    model: 'A4',
    year: 2022,
    price: 42000,
    mileage: 25000,
    fuel: 'Diésel',
    transmission: 'Manual',
    image: '/api/placeholder/300/200',
    description: 'Elegante sedan con tecnología avanzada.',
    location: 'Barcelona'
  },
  {
    id: 3,
    brand: 'Mercedes-Benz',
    model: 'Clase C',
    year: 2023,
    price: 48000,
    mileage: 8000,
    fuel: 'Híbrido',
    transmission: 'Automática',
    image: '/api/placeholder/300/200',
    description: 'Lujo y eficiencia en perfecta armonía.',
    location: 'Valencia'
  },
  {
    id: 4,
    brand: 'Toyota',
    model: 'Corolla',
    year: 2021,
    price: 22000,
    mileage: 35000,
    fuel: 'Gasolina',
    transmission: 'Manual',
    image: '/api/placeholder/300/200',
    description: 'Confiable y económico para el uso diario.',
    location: 'Sevilla'
  },
  {
    id: 5,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2022,
    price: 28000,
    mileage: 20000,
    fuel: 'Gasolina',
    transmission: 'Automática',
    image: '/api/placeholder/300/200',
    description: 'Compacto versátil con gran calidad.',
    location: 'Bilbao'
  },
  {
    id: 6,
    brand: 'Ford',
    model: 'Focus',
    year: 2021,
    price: 24000,
    mileage: 30000,
    fuel: 'Diésel',
    transmission: 'Manual',
    image: '/api/placeholder/300/200',
    description: 'Deportivo y práctico para cualquier ocasión.',
    location: 'Málaga'
  }
];

const brands = ['Todas', 'BMW', 'Audi', 'Mercedes-Benz', 'Toyota', 'Volkswagen', 'Ford'];
const fuelTypes = ['Todos', 'Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'];
const transmissionTypes = ['Todas', 'Manual', 'Automática'];

export default function Explore() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [selectedFuel, setSelectedFuel] = useState('Todos');
  const [selectedTransmission, setSelectedTransmission] = useState('Todas');
  const [filteredCars, setFilteredCars] = useState(mockCars);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCarClick = (carId: number) => {
    navigate(`/car/${carId}`);
  };

  useEffect(() => {
    let filtered = mockCars.filter(car => {
      const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = selectedBrand === 'Todas' || car.brand === selectedBrand;
      const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];
      const matchesFuel = selectedFuel === 'Todos' || car.fuel === selectedFuel;
      const matchesTransmission = selectedTransmission === 'Todas' || car.transmission === selectedTransmission;

      return matchesSearch && matchesBrand && matchesPrice && matchesFuel && matchesTransmission;
    });

    setFilteredCars(filtered);
  }, [searchTerm, selectedBrand, priceRange, selectedFuel, selectedTransmission]);

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
          {/* Search and Filters Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, color: 'text.primary', fontWeight: 'bold' }}>
              Explorar Autos
            </Typography>
            
            {/* Search Bar */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                placeholder="Buscar por marca, modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'background.paper',
                    borderRadius: 2
                  }
                }}
              />
            </Box>

            {/* Filters */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
              gap: 3 
            }}>
              <FormControl fullWidth>
                <InputLabel>Marca</InputLabel>
                <Select
                  value={selectedBrand}
                  label="Marca"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Combustible</InputLabel>
                <Select
                  value={selectedFuel}
                  label="Combustible"
                  onChange={(e) => setSelectedFuel(e.target.value)}
                >
                  {fuelTypes.map((fuel) => (
                    <MenuItem key={fuel} value={fuel}>
                      {fuel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Transmisión</InputLabel>
                <Select
                  value={selectedTransmission}
                  label="Transmisión"
                  onChange={(e) => setSelectedTransmission(e.target.value)}
                >
                  {transmissionTypes.map((transmission) => (
                    <MenuItem key={transmission} value={transmission}>
                      {transmission}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ px: 2 }}>
                <Typography gutterBottom>
                  Precio: €{priceRange[0].toLocaleString()} - €{priceRange[1].toLocaleString()}
                </Typography>
                <Slider
                  value={priceRange}
                  onChange={(_, newValue) => setPriceRange(newValue as number[])}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100000}
                  step={5000}
                  sx={{ color: 'primary.main' }}
                />
              </Box>
            </Box>
          </Box>

          {/* Results Summary */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {filteredCars.length} autos encontrados
            </Typography>
          </Box>

          {/* Cars Grid */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
            gap: 3 
          }}>
            {filteredCars.map((car) => (
              <Card 
                key={car.id}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={car.image}
                  alt={`${car.brand} ${car.model}`}
                  sx={{ bgcolor: 'grey.200' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {car.brand} {car.model}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {car.description}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip 
                      icon={<SpeedIcon />} 
                      label={`${car.mileage.toLocaleString()} km`} 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      icon={<FuelIcon />} 
                      label={car.fuel} 
                      size="small" 
                      variant="outlined"
                    />
                  </Stack>

                  <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
                    €{car.price.toLocaleString()}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="small"
                      sx={{ flex: 1 }}
                    >
                      Comprar
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      size="small"
                      sx={{ flex: 1 }}
                      onClick={() => handleCarClick(car.id)}
                    >
                      Ver Detalles
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* No Results */}
          {filteredCars.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CarIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary' }}>
                No se encontraron autos
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Intenta ajustar los filtros de búsqueda
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}