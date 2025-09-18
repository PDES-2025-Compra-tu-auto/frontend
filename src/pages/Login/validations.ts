import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('El email es obligatorio')
    .refine((email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email), {
      message: 'Ingrese un email válido',
    }),
  password: z
    .string()
    .min(4, 'La contraseña debe tener al menos 4 caracteres')
    .nonempty('La contraseña es obligatoria'),
  role: z.enum(['BUYER','DEALER','ADMINISTRATOR'])
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginCredentials = LoginFormData & { role: string };