import { Link } from "react-router-dom";
import ProductListing from "./ProductListing";

const ProductListings = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductListing key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductListings;

// <div className="products-preview" key={product._id}>
//   <Link to={`/products/${product._id}`}>
//     <h2>{product.productName}</h2>
//   </Link>
//   <p>category: {product.category}</p>
//   <p>description: {product.description}</p>
//   <p>price: {product.price}</p>
//   <p>inventory code: {product.inventoryCode}</p>
//   <p>supplier name: {product.supplier.name}</p>
//   <p>contact email: {product.supplier.contactEmail}</p>
//   <p>contact phone: {product.supplier.contactPhone}</p>
//   <p>isVerified: {product.supplier.isVerified}</p>
// </div>
