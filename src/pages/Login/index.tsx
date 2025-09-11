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
} from "@mui/material";
import {
  DirectionsCar as CarIcon,
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/common/Textfield";
import { Button } from "@/components/common/Button";
import { loginSchema,type LoginFormData } from './validations'
import { useAuth } from "@/context/AuthContext/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {login } = useAuth()
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    clearErrors();
    login({...data,role:'BUYER'}).then(()=>{
      navigate("/dashboard");
    })
    .catch(() => {
      setError("root", {
        type: "manual",
        message: "Correo y/o contraseña incorrecta",
      })
  }).finally(() => {
    setIsLoading(false);
  }
) 
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
        backgroundImage:
          "linear-gradient(135deg, hsl(220, 100%, 95%) 0%, hsl(220, 100%, 98%) 100%)",
      }}
    >
      <Container maxWidth="sm">
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
              boxShadow: "0 8px 32px hsl(220, 100%, 45%, 0.3)",
            }}
          >
            <CarIcon sx={{ fontSize: 40, color: "white" }} />
          </Box>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
            Compra tu auto
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Inicia sesión en tu cuenta
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
                  helperText={errors.password?.message}
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

              {errors.root && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {errors.root.message}
                </Alert>
              )}

              <Box sx={{ mb: 3, textAlign: "right" }}>
                <Link
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? "Iniciando Sesión..." : "Iniciar Sesión"}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  ¿No tienes una cuenta?
                </Typography>
                <Link
                  component="button"
                  type="button"
                  onClick={() => navigate("/register")}
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
                  Regístrate aquí
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
      </Container>
    </Box>
  );
};

export default Login;
