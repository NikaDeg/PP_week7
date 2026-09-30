import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import ProductPage from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";
// import Navbar from "./components/Navbar";
// import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />

            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
