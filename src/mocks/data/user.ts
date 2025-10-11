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

export { profile, me, update };
