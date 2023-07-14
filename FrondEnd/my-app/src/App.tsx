import React, { useEffect } from 'react';
import ProductList from './components/ProductList';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';



const App: React.FC = () => {
  const dispatch = useDispatch();
 
  return (
    <div>
    <Box sx={{ flexGrow: 1 }} >
    
    <AppBar position="fixed">
      <Toolbar>      
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >          
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Product List
        </Typography>       
      </Toolbar>
    </AppBar>
  </Box>

  <Box sx={{ marginTop: '80px' }}>
        {/* Add a margin top of 80px to create a gap below the app bar */}
        <ProductList  />
      </Box>

    </div>
  );
};

export default App;
