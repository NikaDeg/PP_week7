import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inventoryCount, setInventoryCount] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isVerified, setIsVerified] = useState();

  //   const user = JSON.parse(localStorage.getItem('user'));
  //   const token = user ? user.token : null;

  //   const navigate = useNavigate();

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        throw new Error('Failed to add product');
      }
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newProduct = {
      productName,
      category,
      description,
      price,
      inventoryCount,
      supplier: {
        name: supplierName,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        isVerified: true,
      },
    };
    console.log(newProduct);

    const success = await addProduct(newProduct);
    if (success) {
      console.log('Product Added Successfully');
      //   navigate('/');
    } else {
      console.error('Failed to add the product');
    }
  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="productName"
          placeholder="productName"
          required
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          name="category"
          placeholder="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          name="description"
          placeholder="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="number"
          name="inventoryCount"
          placeholder="inventoryCount"
          required
          value={inventoryCount}
          onChange={(e) => setInventoryCount(Number(e.target.value))}
        />
        <input
          type="text"
          name="supplierName"
          placeholder="Supplier name"
          required
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <input
          type="text"
          name="contactEmail"
          placeholder="contact email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <input
          type="number"
          name="contactPhone"
          placeholder="contact phone"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(Number(e.target.value))}
        />

        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddProductPage;
