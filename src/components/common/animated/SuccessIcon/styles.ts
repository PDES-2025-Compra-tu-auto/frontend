import { styled, keyframes } from '@mui/material/styles';

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const scale = keyframes`
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const fill = keyframes`
  100% {
    box-shadow: inset 0px 0px 0px 30px #4bb71b;
  }
`;

export interface SuccessCheckmarkProps {
  size?: number; 
}

export const SuccessAnimation = styled('div')({
  margin: '30px auto',
});

export const StyledCheckmark = styled('svg')<{ size: number }>(({ size }) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: '50%',
  display: 'block',
  strokeWidth: 2,
  stroke: '#4bb71b',
  strokeMiterlimit: 10,
  boxShadow: 'inset 0px 0px 0px #4bb71b',
  animation: `${fill} 0.4s ease-in-out 0.4s forwards, ${scale} 0.3s ease-in-out 0.9s both`,
  position: 'relative',
  top: '5px',
  right: '5px',
  margin: '0 auto',
}));

export const CheckmarkCircle = styled('circle')(({theme}) =>({
  strokeDasharray: 166,
  strokeDashoffset: 166,
  strokeWidth: 2,
  strokeMiterlimit: 10,
  stroke: '#4bb71b',
  fill: theme.palette.background.paper,
  animation: `${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards`,
}))

export const CheckmarkCheck = styled('path')({
  transformOrigin: '50% 50%',
  strokeDasharray: 48,
  strokeDashoffset: 48,
  animation: `${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards`,
});
