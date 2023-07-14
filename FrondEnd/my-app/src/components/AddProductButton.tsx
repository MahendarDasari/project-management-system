import { Button } from '@mui/material';
import { styled } from '@mui/system';

const AddProductButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

export default AddProductButton;
