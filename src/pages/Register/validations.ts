import { z } from "zod";
import { UserRole } from "@/domain/user/types";

export const registrationSchema = z
  .object({
    fullname: z.string().min(1, "Este campo es obligatorio"),
     email: z
    .string()
    .nonempty('El correo es obligatorio')
    .refine((email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email), {
      message: 'Ingrese un correo válido',
    }),
    password: z.string().min(8, "Debe tener al menos 8 caracteres"),
    role: z.enum([UserRole.BUYER, UserRole.CONCESIONARY]),
    concesionaryCuit: z.string().optional(),
    concesionaryName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === UserRole.CONCESIONARY) {
      // Validar CUIT
      if (!data.concesionaryCuit || data.concesionaryCuit.trim() === "") {
        ctx.addIssue({
          path: ["concesionaryCuit"],
          code: "custom",
          message: "El CUIT es obligatorio",
        });
      } else if (!/^\d{2}-\d{8}-\d{1}$/.test(data.concesionaryCuit)) {
        ctx.addIssue({
          path: ["concesionaryCuit"],
          code: "custom",
          message: "Formato inválido. Ej: 20-12345678-3",
        });
      }

      // Validar nombre
      if (!data.concesionaryName || data.concesionaryName.trim() === "") {
        ctx.addIssue({
          path: ["concesionaryName"],
          code: "custom",
          message: "El nombre de la concesionaria es obligatorio",
        });
      }
    }
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
