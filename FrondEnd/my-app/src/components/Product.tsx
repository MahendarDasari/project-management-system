import React, { useState } from 'react';
import { Category, Product } from '../redux/types';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button,styled } from '@mui/material';
import ProductModelComponent from './ProductModelComponent';

import './Product.css';
interface Props {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: (productId: string) => void;
  categories: Category[];
}


const CustomButton = styled(Button)({
  // white color hexc
  backgroundColor: '#FFFFFF', //replace 'colorcode' with your specific color code
  color: 'black',
  '&:hover': {
    backgroundColor: '#hovercolorcode', //replace 'hovercolorcode' with your specific hover color code
  },
});

const ProductComponent: React.FC<Props> = ({ product, onUpdate, onDelete ,categories }) =>
 {

  const [selectedProduct,setSelectedProduct] = useState({});
  const [open, setOpen] = useState(false);

  const handleUpdate = (product: Product) =>  {
    setSelectedProduct(product);
    setOpen(true);
    console.log("product",product);
   <ProductModelComponent product={product} onUpdate={onUpdate} categories={categories} />
   
  };

  const getRowBackgroundColorClass = (quantity: number) => {
    if (quantity < 10) {
      return "red-background";
    } else if (quantity >= 10 && quantity <= 100) {
      return "orange-background";
    } else {
      return "green-background";
    }
  };
  

  const handleDelete = () => {
    // Handle delete logic
    onDelete(product.id);
  };

  return (
    
    <TableRow className={getRowBackgroundColorClass(product.quantity)}> 
        
    <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell><ProductModelComponent product={product} onUpdate={onUpdate} categories={categories} /></TableCell>
      <TableCell><CustomButton variant="contained"  onClick={handleDelete}>Delete</CustomButton></TableCell>
    </TableRow>
  );
};

export default ProductComponent;
