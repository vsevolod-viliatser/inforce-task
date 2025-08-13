import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductDetail.tsx";
import ProductList from "./components/ProductList.tsx";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
