import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../config/env.ts";
import { deleteProduct, fetchProducts, setSortBy } from "../store/productSlice";
import { AppDispatch, RootState } from "../store/store";
import { Product, SortOption } from "../types";
import AddProductModal from "./AddProductModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, sortBy } = useSelector(
    (state: RootState) => state.products
  );

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSortChange = (option: SortOption) => {
    dispatch(setSortBy(option));
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "count") {
      return b.count - a.count;
    } else {
      return a.price - b.price;
    }
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{config.app.name}</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort by:
        </label>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortOption)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="name">Name</option>
          <option value="count">Count</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={() => handleDeleteClick(product)}
          />
        ))}
      </div>

      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          product={productToDelete!}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default ProductList;
