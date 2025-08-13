import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchComments } from "../store/commentSlice";
import { fetchProducts } from "../store/productSlice";
import { AppDispatch, RootState } from "../store/store";
import CommentSection from "./CommentSection";
import EditProductModal from "./EditProductModal";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );
  const { comments } = useSelector((state: RootState) => state.comments);

  const [showEditModal, setShowEditModal] = useState(false);

  const product = products.find((p) => p.id === id);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
    if (id) {
      dispatch(fetchComments(id));
    }
  }, [dispatch, id, product]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-500 hover:text-blue-600 flex items-center"
      >
        ← Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Edit Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Price
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  ${product.price}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Stock
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {product.count} units
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentSection productId={id!} comments={comments} />

      {showEditModal && (
        <EditProductModal
          product={product}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default ProductDetail;
