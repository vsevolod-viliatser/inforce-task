import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment, deleteComment } from "../store/commentSlice";
import { AppDispatch } from "../store/store";
import { CommentSectionProps } from "../types";

const CommentSection: React.FC<CommentSectionProps> = ({
  productId,
  comments,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newComment, setNewComment] = useState({
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.description.trim()) {
      alert("Please fill in your comment");
      return;
    }

    dispatch(
      addComment({
        productId: parseInt(productId),
        description: newComment.description.trim(),
      })
    );

    setNewComment({ description: "" });
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteComment(commentId));
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

      {/* Add Comment Form */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Add a Comment
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment *
            </label>
            <textarea
              value={newComment.description}
              onChange={(e) =>
                setNewComment({ ...newComment, description: e.target.value })
              }
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors"
          >
            Add Comment
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteComment(comment.id)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-700">{comment.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
