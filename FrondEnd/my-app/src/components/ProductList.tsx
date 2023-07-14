import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/types';

import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../redux/actions/productActions';
import { Product, NewProduct } from '../redux/types';
import ProductComponent from './Product';

import { Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

import './ProductList.css'; // Import the CSS file
import { blue, orange } from '@mui/material/colors';
import ProductAddComponent from './ProductAddComponent';
import { fetchCategories } from '../redux/actions/categoryActions';

// Define custom styles using makeStyles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
}));

const StyledTable = styled(Table)({
  tableLayout: 'fixed',
});

const StyledTableBody = styled(TableBody)({
  height: '400px', // Adjust the height as needed
  overflowY: 'auto',
});

const StyledTableHead = styled(TableHead)({
  position: 'sticky',
  top: 50,
  backgroundColor: '#f5f5f5',
});


const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products);
  const categories = useSelector((state: RootState) => state.categories);
  useEffect(() => {
    // Fetch the categories on component mount
    dispatch(fetchCategories());
  }, [dispatch]);
  
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    // Fetch the products on component mount
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = (newProduct: NewProduct) => {
    // Handle add product logic
    dispatch(addProduct(newProduct));
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    // Handle update product logic
    console.log("updatedProduct",updatedProduct);
    dispatch(updateProduct(updatedProduct));
  };

  const handleDeleteProduct = (productId: string) => {
    // Handle delete product logic
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  // Apply custom styles
  return (
    <div className="product-list-container">
    <div className="add-product-container">
    <Button variant="contained" onClick={() => setShowModal(true)}>
      Add Product
    </Button>
  </div>
    <StyledTable>
      <StyledTableHead>
        <TableRow>
        <StyledTableCell >Code</StyledTableCell>
          <StyledTableCell >Name</StyledTableCell>
          <StyledTableCell>Quantity</StyledTableCell>
          <StyledTableCell>Price</StyledTableCell>
          <StyledTableCell>Description</StyledTableCell>
          <StyledTableCell>Actions</StyledTableCell>  
        </TableRow> 
      </StyledTableHead>
      <StyledTableBody>
        {products.map((product) => (
          <ProductComponent
              key={product.id}
              product={product}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
              categories={categories}
            />)
    )} 
      </StyledTableBody>    
    </StyledTable>

  

      {/* Render the add product modal */}
      <ProductAddComponent
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddProduct}
        categories={categories}
      />
    </div>
  );
};

export default ProductList;
