const buyerProfile = [
  {
    id: "explore-cars",
    title: "Explorar autos",
    description: "Acá podés explorar los autos disponibles para la venta",
  },
  {
    id: "favourites-cars",
    title: "Autos favoritos",
    description: "Visualizá los autos que marcaste como favoritos",
  },
  {
    id: "my-cars",
    title: "Autos comprados",
    description: "Visualizá los autos que compraste",
  },
];
const concesionaryProfile = [
    {
    id: 'create-sale-car',
    title: 'Publicar venta',
    description: 'Agregá un auto para la venta',
  },
  {
    id: "manage-cars",
    title: "Gestión de autos",
    description: "Gestioná los autos de tu concesionaria",
  },
  {
    id: "sales",
    title: "Ventas",
    description: "Visualizá las ventas realizadas por tu concesionaria",
  },
  {
    id: "customers",
    title: "Mis clientes",
    description: "Visualizá la información de tus clientes",
  },
];

const administratorProfile = [
  {
    id: "reports",
    title: "Reportes y estadísticas",
    description:
      "Acá encontrarás los reportes y estadisticas de tus concesionarias y clientes",
  },

  {
    id: "most-favorited-cars",
    title: "Autos preferidos",
    description: "Visualizá los autos preferidos por los usuarios",
  },
  {
    id: "registered-users",
    title: "Usuarios registrados",
    description: "Visualizá los usuarios registrados en la plataforma",
  },
  {
    id: "manage-concesionaries",
    title: "Gestioná las concesionarias",
    description: "Gestioná las concesionarias registradas en la plataforma",
  },
    {
    id: "total-purchases",
    title: "Todas las ventas",
    description: "Visualizá todas las ventas realizadas en la plataforma",
  },
];

const profile = (role: 'BUYER'|'CONCESIONARY'|'ADMINISTRATOR') => {
  switch (role) {
    case "BUYER":
      return buyerProfile;
    case "CONCESIONARY":
      return concesionaryProfile;
    case "ADMINISTRATOR":
      return administratorProfile;
  }
};

const me = (role: string) => ({
  id: "604c1a86-fa69-4ff3-be79-2e52e041811b",
  fullname: "Diego Moronha",
  email: "diego@example.com",
  role: role,
  createdAt: "2025-09-23T06:35:11.028Z",
});

const update = {
  message: "User updated successfully",
};

const users = [
  {
    id: "604c1a86-fa69-4ff3-be79-2e52e041811b",
    fullname: "Diego Moronha",
    email: "diego@example.com",
    role: "BUYER",
    createdAt: "2025-09-23T06:35:11.028Z",
  },
  {
    id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    fullname: "Ana Pérez",
    email: "ana.perez@example.com",
    role: "BUYER",
    createdAt: "2025-11-01T14:22:45.123Z",
  },
  {
    id: "7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
    fullname: "Carlos López",
    email: "carlos.lopez@example.com",
    role: "BUYER",
    createdAt: "2025-10-15T09:11:32.456Z",
  },
  {
    id: "3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a",
    fullname: "Lucía Gómez",
    email: "lucia.gomez@example.com",
    role: "BUYER",
    createdAt: "2025-08-30T18:05:20.789Z",
  }
];



export { profile, me, update,users };
