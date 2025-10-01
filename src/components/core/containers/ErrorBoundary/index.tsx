import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Grid } from "@mui/material";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true, error: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error });
  }

  handleLogin = () => {
    // Aquí puedes redirigir al login. Ejemplo con window.location:
    window.location.href = "/login";
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        this.props.fallback ?? (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            sx={{ minHeight: "100vh" }}
          >
            <ErrorOutlineIcon sx={{ fontSize: 60, color: "red", mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              En este momento no podemos mostrarte esta información
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Por favor contactate con el administrador o vuelve a iniciar
              sesión
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleLogin}
              sx={{ mt: 2 }}
            >
              Iniciar sesión
            </Button>
          </Grid>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
