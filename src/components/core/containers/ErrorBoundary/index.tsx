import Typography from '@mui/material/Typography';
import React, { Fragment } from 'react';

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
} ;

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
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error });
  }

  render() {
    const { hasError, error } = this.state;

    if (hasError) {
      return (
        this.props.fallback ?? (
          <Fragment>
            <Typography variant="h2" sx={{ textAlign: 'center', marginTop: '10px' }}>
              error
            </Typography>
            {error && (
              <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '10px', color: 'red' }}>
                {error.message}
              </Typography>
            )}
          </Fragment>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
