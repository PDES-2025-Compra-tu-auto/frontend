import z from "zod";

export const schema = z.object({
  carModel: z.string().min(1, "Selecciona un modelo de auto"),
  price: z
    .string()
    .min(1, "El precio es obligatorio")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "El precio debe ser un número mayor que cero",
    }),
});

export type CreateSaleCarForm = z.infer<typeof schema>;
