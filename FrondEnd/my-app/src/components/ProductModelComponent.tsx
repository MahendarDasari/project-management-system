import React, { useState } from 'react';
import { Button, Modal, TextField, Grid, MenuItem, Select, FormControl, InputLabel,styled } from '@mui/material';
import { Product, Category, Subcategory } from '../redux/types';
import './ProductModelComponent.css'; // Import the CSS file

interface ProductModelComponentProps {
  product: Product;
  onUpdate: (updatedProduct: Product) => void;
  categories: Category[];
}


const CustomButton = styled(Button)({
  // blue hex code is #0071BC
  backgroundColor: '#FFFFFF', //replace 'colorcode' with your specific color code
  color: 'black',
  '&:hover': {
    backgroundColor: '#0071BC', //replace 'hovercolorcode' with your specific hover color code
  },
});


const ProductModelComponent: React.FC<ProductModelComponentProps> = ({ product, onUpdate, categories }) => {
  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

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

  const handleSubcategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const subcategoryId = e.target.value as number;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      subcategoryId,
    }));
  };

  return (
    <>
      <CustomButton onClick={handleOpen}>
        View Details
      </CustomButton>
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
              <TextField
                label="Price"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                fullWidth
              />
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
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={updatedProduct.categoryId}>
                  {categories.map((category: Category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select value={updatedProduct.subcategoryId}>
                  {updatedProduct.categoryId &&
                    categories
                      .find((category: Category) => category.id === updatedProduct.categoryId)
                      ?.subcategories.map((subcategory: Subcategory) => (
                        <MenuItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end" spacing={2}>
                <Grid item>
                  <Button variant="contained" onClick={handleSave}>
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleClose} color="error">
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
};

export default ProductModelComponent;
