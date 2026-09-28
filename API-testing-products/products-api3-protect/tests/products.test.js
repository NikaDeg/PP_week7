const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const api = supertest(app);

const userData = {
  name: 'Jane Air',
  email: 'jane.air@gmail.com',
  password: 'jane',
  phone_number: '+358409934567',
  gender: 'female',
  date_of_birth: '1995-06-15',
  membership_status: 'active',
};

const products = [
  {
    title: "Wireless Mouse",
    category: "Electronics",
    description: "Ergonomic wireless mouse with USB receiver.",
    price: 29.99,
    stockQuantity: 150,
    supplier: {
      name: "TechSupply Co.",
      contactEmail: "sales@techsupply.example",
      contactPhone: "+358401112233",
      rating: 5,
    },
  },
  {
    title: "Standing Desk",
    category: "Furniture",
    description: "Adjustable height standing desk.",
    price: 499.95,
    stockQuantity: 30,
    supplier: {
      name: "OfficePro Ltd.",
      contactEmail: "orders@officepro.example",
      contactPhone: "+358409998877",
      rating: 4,
    },
  },
];

const productsInDb = async () => {
  const products = await Product.find({});
  return products.map((product) => product.toJSON());
};

let token = null;

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await Product.deleteMany({});

  const signupResponse = await api
    .post("/api/users/signup")
    .send(userData)
    .expect(201);

  token = signupResponse.body.token;
});

beforeEach(async () => {
  await Product.deleteMany({});

  for (const product of products) {
    await api
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(product)
      .expect(201);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});


//GET products 

describe('GET /api/products', () => {
  it('should return all products', async () => {
    const response = await api.get('/api/products').expect(200);

    expect(response.body).toHaveLength(products.length);
  });

  it('should return products as JSON with status 200', async () => {
    await api
      .get('/api/products')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  it('should include a specific product in the returned list', async () => {
    const response = await api.get('/api/products');
    expect(response.body.map((product) => product.category)).toContain('Furniture');
  });
});


//GET BY ID


describe("GET /api/products/:productId", () => {

    it("when the id is valid, should return one product by ID", async () => {
      const product = await Product.findOne({ title: "Standing Desk" });

      const response = await api
        .get(`/api/products/${product._id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body.title).toBe(product.title);
    });
  

    it("when the id is invalid, should return status 404", async () => {
      const response = await api.get("/api/products/not-a-valid-id").expect(404);

      expect(response.body).toHaveProperty("error", "No such product");
    });
});

//POST NEW WITH AUTHENTICATION


describe('POST /api/products', () => {
  describe('when the payload is valid', () => {
    it('should return status 201', async () => {
      const newProduct = {
        title: 'Standing Desk2',
        category: 'Furniture',
        description: 'Adjustable height standing desk.',
        price: 600.95,
        stockQuantity: 50,
        supplier: {
          name: 'OfficePro',
          contactEmail: 'orders@pro.example',
          contactPhone: '+358409996677',
          rating: 5,
        },
      };
      await api
      .post('/api/products')
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct)
      .expect(201);
    });

    it('should persist the new product in the database', async () => {
      const newProduct = {
        title: 'Standing Desk2',
        category: 'Furniture',
        description: 'Adjustable height standing desk.',
        price: 600.95,
        stockQuantity: 50,
        supplier: {
          name: 'OfficePro',
          contactEmail: 'orders@pro.example',
          contactPhone: '+358409996677',
          rating: 5,
        },
      };
      const response = await api
        .post('/api/products')
        .set("Authorization", `Bearer ${token}`)
        .send(newProduct)
        .expect(201);

      expect(response.body.title).toBe(newProduct.title);
      expect(response.body).toHaveProperty("user_id");  

      const productsAfterPost = await Product.find({});
      expect(productsAfterPost).toHaveLength(products.length + 1);
    });
  });

  describe("when the user is not authenticated", () => {
    it("should return status 401", async () => {
      await api
      .post("/api/products")
      .send(products[0])
      .expect(401);
    });

    it("should not increase the number of products in the database", async () => {
      await api
      .post("/api/products")
      .send(products[0])
      .expect(401);

      const productsAtEnd = await productsInDb();
      expect(productsAtEnd).toHaveLength(products.length);
    });
  });
});




