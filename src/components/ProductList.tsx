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
      // Sort by weight (extract numeric value)
      const weightA = parseInt(a.weight.replace(/\D/g, ""));
      const weightB = parseInt(b.weight.replace(/\D/g, ""));
      return weightA - weightB;
    }
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{config.app.name}</h1>
        <div className="flex gap-3">
          <button
            onClick={() => dispatch(fetchProducts())}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="name">Name</option>
            <option value="count">Count</option>
            <option value="weight">Weight</option>
          </select>
        </div>
        <div className="text-sm text-gray-600">
          {products.length} product{products.length !== 1 ? "s" : ""} found
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by adding your first product
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Add First Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => handleDeleteClick(product)}
            />
          ))}
        </div>
      )}

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
