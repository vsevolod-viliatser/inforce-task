# Product List App

A modern React application built with TypeScript, Vite, Tailwind CSS, and Redux for managing products and comments.

## Features

- 🛍️ Product management (CRUD operations)
- 💬 Comment system for products
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🔄 Real-time state management with Redux
- 🚀 Fast development with Vite
- 🔧 TypeScript for type safety

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **State Management**: Redux Toolkit
- **Backend**: JSON Server (mock API)
- **Routing**: React Router DOM

## Environment Variables

This project uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=Product List App
VITE_DB_URL=http://localhost:3001
VITE_DB_PORT=3001
VITE_DEV_MODE=true
VITE_PORT=5173
VITE_GITHUB_REPO_URL=https://github.com/vsevolod-viliatser/inforce-task.git
```

### Environment Variables Explained

- `VITE_API_BASE_URL`: Base URL for API endpoints
- `VITE_APP_NAME`: Application name displayed in the UI
- `VITE_DB_URL`: Database/API server URL
- `VITE_DB_PORT`: Database server port
- `VITE_DEV_MODE`: Development mode flag
- `VITE_PORT`: Vite development server port
- `VITE_GITHUB_REPO_URL`: GitHub repository URL

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/vsevolod-viliatser/inforce-task.git
   cd inforce-task/product-list-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server**

   ```bash
   npm run start
   ```

   This will start both:

   - JSON Server on port 3001 (API)
   - Vite dev server on port 5173 (Frontend)

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start JSON Server only
- `npm run start` - Start both servers concurrently
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── AddProductModal.tsx
│   ├── CommentSection.tsx
│   ├── DeleteConfirmModal.tsx
│   ├── EditProductModal.tsx
│   ├── ProductCard.tsx
│   ├── ProductDetail.tsx
│   └── ProductList.tsx
├── store/              # Redux store and slices
│   ├── commentSlice.ts
│   ├── productSlice.ts
│   └── store.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── config/             # Environment configuration
│   └── env.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## API Endpoints

The app uses JSON Server for the mock API:

- `GET /products` - Fetch all products
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product
- `GET /comments?productId=:id` - Fetch comments for a product
- `POST /comments` - Add a new comment
- `DELETE /comments/:id` - Delete a comment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit with logical commit messages
5. Push to your branch
6. Create a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
