import React, { useState } from 'react';
import { Modal, TextField, Button, Grid, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { NewProduct, Category, Subcategory } from '../redux/types';

interface ProductAddComponentProps {
  open: boolean;
  onClose: () => void;
  onAdd: (newProduct: NewProduct) => void;
  categories: Category[];
}

const ProductAddComponent: React.FC<ProductAddComponentProps> = ({ open, onClose, onAdd, categories }) => {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: '',
    quantity: 0,
    price: 0,
    imageUrl: '',
    description: '',
    categoryId: 0,
    subcategoryId: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: SelectChangeEvent<number>) => {
    const categoryId = e.target.value as number;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      categoryId,
      subcategoryId: 0, // Reset subcategory when category changes
    }));
  };

  const handleSubcategoryChange = (e: SelectChangeEvent<number>) => {
    const subcategoryId = e.target.value as number;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      subcategoryId,
    }));
  };

  const categoryItems = categories.map((category: Category) => (
    <MenuItem key={category.id} value={category.id}>
      {category.name}
    </MenuItem>
  ));

  const subcategoryItems = newProduct.categoryId
    ? categories
        .find((category: Category) => category.id === newProduct.categoryId)
        ?.subcategories.map((subcategory: Subcategory) => (
          <MenuItem key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </MenuItem>
        ))
    : null;

  const handleAddProduct = () => {
    onAdd(newProduct);
    setNewProduct({
      name: '',
      quantity: 0,
      price: 0,
      imageUrl: '',
      description: '',
      categoryId: 0,
      subcategoryId: 0,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-container">
        <h2>Add Product</h2>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Name" name="name" value={newProduct.name} onChange={handleInputChange} fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={newProduct.categoryId} onChange={handleCategoryChange}>
                {categoryItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Subcategory</InputLabel>
              <Select value={newProduct.subcategoryId} onChange={handleSubcategoryChange}>
                {subcategoryItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button variant="contained" onClick={handleAddProduct}>
                  Add
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="error" onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
};

export default ProductAddComponent;
