import { z } from "zod";

export const schema = z.object({
  price: z
    .string()
    .min(1, "El precio es obligatorio")
    .regex(/^\d+$/, "Debe ser un número válido"),
});

export type EditSaleCarForm = z.infer<typeof schema>;
