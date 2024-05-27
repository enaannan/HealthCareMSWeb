import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import backgroundImage from '../../assets/images/back.jpg';
import { ThemeDirection } from '../../utils/config';

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'fixed',
        filter: 'blur(5px)',
        zIndex: -1,
        bottom: 0,
        top: 0, 
        left: 0,
        right: 0, 
        transform: theme.direction === ThemeDirection.RTL ? 'rotate(180deg)' : 'inherit',
        width: '100%',
        height: '100%', 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    />
  );
};

export default AuthBackground;
