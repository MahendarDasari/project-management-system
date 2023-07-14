import React, { useState } from 'react';
import { Button, Modal, TextField, Grid } from '@mui/material';
import { Product } from '../redux/types';
import './ProductModelComponent.css'; // Import the CSS file

interface ProductModelComponentProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
}

const ProductModelComponent: React.FC<ProductModelComponentProps> = ({ product, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    onUpdate(updatedProduct);
    handleClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        View Details
      </Button>
      <Modal open={open} onClose={handleClose} className="modal">
        <div className="modal-container">
          <h2>Product Details</h2>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField label="Name" name="name" value={updatedProduct.name} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                name="quantity"
                value={updatedProduct.quantity}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label="Price" name="price" value={updatedProduct.price} onChange={handleInputChange} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Description"
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ProductModelComponent;
