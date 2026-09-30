import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

// const ProductListing = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`/api/products/:${id}`);
//         if (!res.ok) {
//           throw new Error("could not fetch the data");
//         }
//         const data = await res.json();
//         console.log(data);

//         setProduct(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchProduct();
//   }, [id]);
//   console.log(product);
//   return (
//     <div className="product-list">
//       <div className="product-preview" key={id}>
//         <h2>{product.productName}</h2>

//         <p>category: {product.category}</p>
//         <p>description: {product.description}</p>
//         <p>price: {product.price}</p>
//         <p>inventory code: {product.inventoryCode}</p>
//         <p>supplier name: {product.supplier.name}</p>
//         <p>contact email: {product.supplier.contactEmail}</p>
//         <p>contact phone: {product.supplier.contactPhone}</p>
//         <p>isVerified: {product.supplier.isVerified}</p>
//       </div>
//     </div>
//   );
// };

const ProductListing = ({ product }) => {
  return (
    <div className="product-preview">
      <h2>{product.productName}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>In Stock: {product.description}</p>
    </div>
  );
};

export default ProductListing;
