
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
