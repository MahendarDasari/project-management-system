import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/types';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../redux/actions/productActions';
import { Product, NewProduct } from '../redux/types';
import ProductComponent from './Product';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import './ProductList.css';
import { fetchCategories } from '../redux/actions/categoryActions';
import ProductAddComponent from './ProductAddComponent';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
}));

const StyledTable = styled(Table)({
  tableLayout: 'fixed',
});

const StyledTableBody = styled(TableBody)({
  height: '400px',
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
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false); // State for delete confirmation dialog
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [subcategoryFilter, setSubcategoryFilter] = useState<string>('');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = (newProduct: NewProduct) => {
    dispatch(addProduct(newProduct));
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    dispatch(updateProduct(updatedProduct));
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleCategoryChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategoryFilter(e.target.value as string);
    setSubcategoryFilter('All');
  };

  const handleSubcategoryChange = (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSubcategoryFilter(e.target.value as string);
  };

  const filteredProducts = products.filter((product) => {
    if (categoryFilter && subcategoryFilter && subcategoryFilter !== "All" && categoryFilter !== "All") {
      return (
        product.categoryId === parseInt(categoryFilter) &&
        product.subcategoryId === parseInt(subcategoryFilter)
      );
    } else if (categoryFilter &&  categoryFilter !== "All") {
      return product.categoryId === parseInt(categoryFilter);
    } else if (subcategoryFilter && subcategoryFilter !== "All" ) {
      return product.subcategoryId === parseInt(subcategoryFilter);
    } else {
      return true;
    }
  });

  return (
    <div className="product-list-container">
      
      
      <div className="filter-container">
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={handleCategoryChange as any}
          >
            <MenuItem value="All">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {(categoryFilter !== "All") && (
          <FormControl>
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={subcategoryFilter}
              onChange={handleSubcategoryChange as any}
            >
              <MenuItem value="All">All Subcategories</MenuItem>
              {categories
                .find((category) => category.id === parseInt(categoryFilter))
                ?.subcategories.map((subcategory) => (
                  <MenuItem
                    key={subcategory.id}
                    value={subcategory.id}
                  >
                    {subcategory.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
        <Button
        className="add-product-button"
        variant="contained"
        
        onClick={() => setShowModal(true)}
      >
        Add Product
      </Button>
      </div>

      <StyledTable>
        <StyledTableHead>
          <TableRow>            
            <StyledTableCell>Code</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Price</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
            <StyledTableCell>Delete</StyledTableCell>
          </TableRow>
        </StyledTableHead>
        <StyledTableBody>
          {filteredProducts.map((product) => (
            <ProductComponent
              key={product.id}
              product={product}
              onUpdate={handleUpdateProduct}
              onDelete={handleDeleteProduct}
              categories={categories}
            />
          ))}
        </StyledTableBody>
      </StyledTable>

     
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
