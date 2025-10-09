import { Button, styled, type ButtonProps } from "@mui/material";

interface StyledButtonProps extends ButtonProps {
  withBackground?: boolean;
}

export const StyledButton = styled(Button,{ shouldForwardProp: (prop) => prop !== 'withBackground'})<StyledButtonProps>(({ variant, withBackground = true }) => ({
  padding: '0.5em 5px 0.5em 5px',
  marginBottom:3,
  borderRadius: 8,
  fontSize: "1.1rem",
  fontWeight: "bold",
  textTransform: "none",
  background: withBackground? "linear-gradient(135deg, hsl(220, 100%, 45%) 0%, hsl(220, 100%, 35%) 100%)":'',
  boxShadow: "0 8px 24px hsl(220, 100%, 45%, 0.3)",
  "&:hover": {
    boxShadow: "0 12px 32px hsl(220, 100%, 45%, 0.4)",
    transform: "translateY(-2px)",
  },
  "&:disabled": {
    opacity: 0.7,
  },
  transition: "all 0.2s ease",
  ...(variant === 'text'&& {
    background: 'transparent',
    boxShadow: 'none',
    padding:0,
    "&:hover": {
    boxShadow: 'none'
  },

  
}),
...(variant === 'outlined'&&{
  padding: '0.5em 5px 0.5em 5px',
  border: 1,
  borderStyle:'solid',
  borderRadius: 8,
  marginBottom:3,
  fontSize: "1.1rem",
  fontWeight: "bold",
  textTransform: "none",
  background:'transparent',
  "&:hover": {
    boxShadow: "0 12px 32px hsl(220, 100%, 45%, 0.4)",
 
  },
  "&:disabled": {
    opacity: 0.7,
  },
  transition: "all 0.2s ease",
})

}));
