import React from "react";
import { Link } from "react-router-dom";
import { ProductCardProps } from "../types";

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        {/* Product Image */}
        <div className="mb-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {product.name}
          </h3>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {product.count} in stock
          </span>
        </div>

        {/* Product Details */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Size:</span>
            <span>
              {product.size.width} × {product.size.height}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Weight:</span>
            <span className="font-medium">{product.weight}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Comments:</span>
            <span className="font-medium">{product.comments.length}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 px-4 rounded-lg transition-colors"
          >
            View Details
          </Link>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
