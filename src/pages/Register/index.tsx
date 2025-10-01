import {
  Box,
  Typography,
  Link,
  Card,
  InputAdornment,
  IconButton,
  Container,
  CardContent,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import {
  DirectionsCar as CarIcon,
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@/components/common/Textfield";
import { Button } from "@/components/common/Button";
import { useForm, Controller } from "react-hook-form";
import { UserRole } from "@/domain/user/types";
import { registrationSchema, type RegistrationFormData } from "./validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCuit } from "@/utils/formatters";
import { registerCTA } from "@/services/domain/auth";
import { Congrats } from "@/components/core/containers/Congrats";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.BUYER);
  const [isLoggedSuccess,setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    clearErrors();
    try {
      await registerCTA({
        ...data,
        concesionaryCuit: data.concesionaryCuit?.replace(/-/g, ""),
      });
      clearErrors();
      reset();
      setSuccess(true)
    } catch (error) {
      setError("root", {
        type: "manual",
        message:
          "Ha ocurrido un error en el proceso de registro. Intentá nuevamente",
      });
    }
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      { !isLoggedSuccess ?( <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 80,
              height: 80,
              bgcolor: "primary.main",
              borderRadius: "50%",
              mb: 2,
              mt:2,
              boxShadow: "0 8px 32px hsl(220, 100%, 45%, 0.3)",
            }}
          >
            <CarIcon sx={{ fontSize: 40, color: "white" }} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
            Compra tu auto
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Crea tu cuenta
          </Typography>
        </Box>

        <Card
          sx={{
            boxShadow: "0 20px 60px -10px hsl(220, 100%, 45%, 0.15)",
            borderRadius: 1,
            border: "1px solid hsl(220, 100%, 95%)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Nombre Completo"
                  error={!!errors.fullname}
                  helperText={errors.fullname?.message}
                  disabled={isLoading}
                  {...register("fullname", {
                    required: "Este campo es obligatorio",
                  })}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isLoading}
                  {...register("email")}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password?.message || "Mínimo 8 caracteres"}
                  disabled={isLoading}
                  {...register("password")}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "text.secondary" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={togglePasswordVisibility}
                            edge="end"
                            disabled={isLoading}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <FormControl
                  fullWidth
                  error={!!errors.role}
                  disabled={isLoading}
                >
                  <InputLabel id="role-label">
                    Selecciona tu tipo de usuario
                  </InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue={UserRole.BUYER}
                    rules={{ required: "Selecciona un tipo de usuario" }}
                    render={({ field }) => (
                      <Select
                        labelId="role-label"
                        label="Selecciona tu tipo de usuario"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedRole(e.target.value as UserRole);
                        }}
                      >
                        <MenuItem value={UserRole.CONCESIONARY}>
                          Concesionaria
                        </MenuItem>
                        <MenuItem value={UserRole.BUYER}>Comprador</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <FormHelperText>{errors.role.message}</FormHelperText>
                  )}
                </FormControl>
              </Box>

              {selectedRole === UserRole.CONCESIONARY && (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Controller
                      name="concesionaryCuit"
                      control={control}
                      rules={{
                        required: "El CUIT es obligatorio",
                        pattern: {
                          value: /^\d{2}-\d{8}-\d{1}$/,
                          message: "Formato inválido. Ej: 20-12345678-3",
                        },
                      }}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          label="CUIT de Concesionaria"
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          inputMode="numeric"
                          onChange={(e) => {
                            const formatted = formatCuit(e.target.value);
                            field.onChange(formatted);
                          }}
                          slotProps={{
                            input: {
                              inputProps: {
                                maxLength: 13,
                              },
                            },
                          }}
                          fullWidth
                        />
                      )}
                    />
                  </Box>

                  {/* Nombre de Concesionaria */}
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Nombre de Concesionaria"
                      error={!!errors.concesionaryName}
                      helperText={errors.concesionaryName?.message}
                      disabled={isLoading}
                      {...register("concesionaryName")}
                    />
                  </Box>
                </>
              )}

              {errors.root && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {errors.root.message}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? "Creando Cuenta..." : "Crear Cuenta"}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  ¿Ya tienes una cuenta?
                </Typography>
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "primary.main",
                    fontWeight: "bold",
                    textDecoration: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Inicia sesión aquí
                </Link>
              </Box>
            </form>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Button
            variant="text"
            onClick={() => navigate("/")}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            ← Volver al inicio
          </Button>
        </Box>
      </Container>):(

              <Congrats
        title="Tu usuario se registro correctamente"
        subtitle="Ya podes ingresar a la aplicacion y disfrutar la experiencia unica que ofrecemos"
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{pr:'16px',pl:'16px'}}
          onClick={() => navigate("/login")}
        >
          Inicia sesion
        </Button>
      </Congrats>
      )}

    </Box>
  );
};

export default Register;
