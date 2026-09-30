import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProductPage from './pages/AddProductPage';

// import Home from "./pages/HomePage";
// import AddProductPage from "./pages/AddProductPage";
// import Navbar from "./components/Navbar";
// import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <div className="App">
      <p>Hello</p>
      <AddProductPage />
      {/* <BrowserRouter>
        <Navbar />
        <p>Hello</p>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter> */}
    </div>
  );
};

export default App;
