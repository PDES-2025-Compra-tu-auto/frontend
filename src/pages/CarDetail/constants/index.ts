
export const congratsType: {
  [key: string]: { title: string; subtitle: string };
} = {
  success: {
    title: "Compraste el vehiculo",
    subtitle: "Podes visualizarla junto con sus detalles en tus compras",
  },
  error: {
    title: "Hubo un error al realizar la compra del vehiculo",
    subtitle: "Intenta nuevamente más tarde",
  },
  info: {
    title: "Información",
    subtitle: "Tu publicación está siendo revisada",
  },
  warning: { title: "Advertencia", subtitle: "Revisa los datos ingresados" },
};