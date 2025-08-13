export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
  comments: Comment[];
}

export interface ProductCreate {
  name: string;
  imageUrl: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  weight: string;
}

export interface Comment {
  id: number;
  productId: number;
  description: string;
  date: string;
}

export type SortOption = "name" | "count" | "weight";

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
  productId: number;
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
