import { z } from 'zod';

export const registrationSchema = z.object({
  fullName: z.string()
    .min(3, { message: "El nombre completo debe tener al menos 3 caracteres" })
    .max(100, { message: "El nombre completo no puede tener más de 100 caracteres" }),

  username: z.string()
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" })
    .max(20, { message: "El nombre de usuario no puede tener más de 20 caracteres" }),

  email: z.string()
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
      { message: "Por favor, ingresa un correo válido" }
    )
    .max(100, { message: "El correo no puede tener más de 100 caracteres" }),

  password: z.string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
    .max(50, { message: "La contraseña no puede tener más de 50 caracteres" })
    .regex(/[a-zA-Z]/, { message: "La contraseña debe contener al menos una letra" })
    .regex(/[0-9]/, { message: "La contraseña debe contener al menos un número" }),

});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
