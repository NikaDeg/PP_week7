const mongoose = require('mongoose');
const supertest = require("supertest");
const app = require("../app");
const connectDB = require("../config/db");
const Product = require("../models/productModel");

const api = supertest(app);

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

beforeAll( async() => {
    await connectDB();
});  

beforeEach(async() => {
    await Product.deleteMany({});
    await Product.insertMany(products);
});

afterAll(async() => {
    await mongoose.connection.close();
});

//GET ALL


describe("GET /api/products", () => {
    it("should return all products", async () => {
        const response = await api.get("/api/products").expect(200);

        expect(response.body).toHaveLength(products.length);
    });

    it("should return products as JSON with status 200", async () => {
       await api
        .get('/api/products') 
        .expect(200)
        .expect("Content-Type", /application\/json/);
    })

    it("should include a specific product in the returned list", async () => {
        const response = await api.get("/api/products");
        expect(response.body.map((product) => product.category)).toContain("Furniture");
    });

});

//POST NEW PRODUCT

describe("POST /api/products", () => {
    describe('when the payload is valid', () => {
        it("should return status 201", async () => {
            const newProduct = {
                title: "Standing Desk2",
                category: "Furniture",
                description: "Adjustable height standing desk.",
                price: 600.95,
                stockQuantity: 50,
                supplier: {
                name: "OfficePro",
                contactEmail: "orders@pro.example",
                contactPhone: "+358409996677",
                rating: 5,

            }}; 
            await api.post("/api/products").send(newProduct).expect(201);

        });
        it("should persist the new product in the database", async () => {
            const newProduct = {
                title: "Standing Desk2",
                category: "Furniture",
                description: "Adjustable height standing desk.",
                price: 600.95,
                stockQuantity: 50,
                supplier: {
                name: "OfficePro",
                contactEmail: "orders@pro.example",
                contactPhone: "+358409996677",
                rating: 5,

            }}; 
            await api.post("/api/products").send(newProduct).expect(201);

            const productsAfterPost = await Product.find({});
            expect(productsAfterPost).toHaveLength(products.length + 1);
            expect(productsAfterPost.map((product) => product.title)).toContain(newProduct.title);
        });
    });

    describe('when the payload is invalid', () => {
        it('should return status 400 when title is missing + should not increase length of products list', async () => {
            const invalidProduct = {
                category: "Furniture",
                description: "Adjustable height standing desk.",
                price: 600.95,
                stockQuantity: 50,
                supplier: {
                name: "OfficePro",
                contactEmail: "orders@pro.example",
                contactPhone: "+358409996677",
                rating: 5,
            }}; 
            await api.post("/api/products").send(invalidProduct).expect(400);

            const findProducts = await Product.find({});
            expect(findProducts).toHaveLength(products.length);
        });
    });

}); 


