export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  count: number;
  image?: string;
}

export interface Comment {
  id: string;
  productId: string;
  text: string;
  author: string;
  date: string;
}

export type SortOption = "name" | "count" | "price";

// Store types
export type ProductState = {
  products: Product[];
  loading: boolean;
  sortBy: SortOption;
};

export type CommentState = {
  comments: Comment[];
  loading: boolean;
};

// Component prop types
export type AddProductModalProps = {
  onClose: () => void;
};

export type ProductCardProps = {
  product: Product;
  onDelete: () => void;
};

export type CommentSectionProps = {
  productId: string;
  comments: Comment[];
};

export type DeleteConfirmModalProps = {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
};

export type EditProductModalProps = {
  product: Product;
  onClose: () => void;
};
