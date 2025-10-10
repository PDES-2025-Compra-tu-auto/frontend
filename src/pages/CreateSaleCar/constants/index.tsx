
export const congratsType: {
  [key: string]: { title: string; subtitle: string };
} = {
  success: {
    title: "Creaste tu publicación de venta correctamente",
    subtitle: "Podes visualizarla en el menu Gestión de autos",
  },
  error: {
    title: "Hubo un error al crear tu publicación",
    subtitle: "Intenta nuevamente más tarde",
  },
  info: {
    title: "Información",
    subtitle: "Tu publicación está siendo revisada",
  },
  warning: { title: "Advertencia", subtitle: "Revisa los datos ingresados" },
};

export // Car Models
const carModels = [
  {
    id: "1",
    name: "Tesla Model 3",
    image:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=100&h=60&fit=crop",
  },
  {
    id: "2",
    name: "BMW Serie 3",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=100&h=60&fit=crop",
  },
  {
    id: "3",
    name: "Mercedes-Benz Clase C",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=100&h=60&fit=crop",
  },
  {
    id: "4",
    name: "Audi A4",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=100&h=60&fit=crop",
  },
  {
    id: "5",
    name: "Toyota Camry",
    image:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=100&h=60&fit=crop",
  },
  {
    id: "6",
    name: "Honda Accord",
    image:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=100&h=60&fit=crop",
  },
  {
    id: "7",
    name: "Ford Mustang",
    image:
      "https://images.unsplash.com/photo-1584345604476-8ec5f5f261ca?w=100&h=60&fit=crop",
  },
  {
    id: "8",
    name: "Chevrolet Camaro",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=100&h=60&fit=crop",
  },
];
