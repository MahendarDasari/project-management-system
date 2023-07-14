import React, { useState } from 'react';
import { Category, Product } from '../redux/types';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';
import ProductModelComponent from './ProductModelComponent';


interface Props {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: (productId: string) => void;
  categories: Category[];
}

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
    
  

  const handleDelete = () => {
    // Handle delete logic
    onDelete(product.id);
  };

  return (

    <TableRow> 
        
    <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell><ProductModelComponent product={product} onUpdate={onUpdate} categories={categories} /></TableCell>
    </TableRow>
  );
};

export default ProductComponent;
