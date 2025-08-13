import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Comment, CommentState } from "../types";

const initialState: CommentState = {
  comments: [],
  loading: false,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (productId: string) => {
    const response = await fetch(
      `http://localhost:3001/comments?productId=${productId}`
    );
    return response.json();
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (comment: Omit<Comment, "id" | "date">) => {
    const newComment = {
      ...comment,
      date: new Date().toISOString(),
    };
    const response = await fetch("http://localhost:3001/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });
    return response.json();
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (id: string) => {
    await fetch(`http://localhost:3001/comments/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c.id !== action.payload);
      });
  },
});

export default commentSlice.reducer;
