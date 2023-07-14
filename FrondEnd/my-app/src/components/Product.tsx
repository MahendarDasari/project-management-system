import React from 'react';
import { Product } from '../redux/types';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';
interface Props {
  product: Product;
  onUpdate: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductComponent: React.FC<Props> = ({ product, onUpdate, onDelete }) => {
  const handleUpdate = () => {
    // Handle update logic
    onUpdate(product);
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
      <TableCell><Button variant="contained" color="success" onClick={handleUpdate}>Edit</Button></TableCell>
    </TableRow>
  );
};

export default ProductComponent;
