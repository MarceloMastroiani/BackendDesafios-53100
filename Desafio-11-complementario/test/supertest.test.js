import * as chai from "chai";
import e from "express";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Test ecommerce API", () => {
  //Test de rutas productos, carts, sessions

  describe("Test /products", () => {
    //test products

    //CREAR PRODUCTO
    it("El endpoint /api/products/add debe crear un producto", async () => {
      const producMock = {
        title: "Producto 1",
        description: "Descripcion del producto 1",
        code: "AAAA2",
        category: "Electronics",
        brand: "Samsung",
        price: 100,
        stock: 10,
        owner: "admin@gmail.com",
      };
      const { statusCode, ok, _body } = await requester
        .post("/api/products/add")
        .send(producMock);

      console.log(ok);
      console.log(statusCode);
      console.log(_body);

      expect(statusCode).to.equal(200);
      expect(_body.result).to.have.property("_id");
      expect(_body.result.owner).to.equal("admin@gmail.com");
    });

    //ACTUALIZAR PRODUCTO
    it("El endpoint /api/products/edit/:id debe actualizar  un producto", async () => {
      //agregar producto para actualizar
      const producMock = {
        title: "Producto viejo",
        description: "Descripcion del producto viejo",
        code: "123456",
        category: "Electronics",
        brand: "Samsung",
        price: 100,
        stock: 10,
        owner: "aaaa@gmail.com",
      };
      const { _body } = await requester
        .post("/api/products/add")
        .send(producMock);
      const productId = _body.result._id;

      //actualizar producto
      const newProductMock = {
        title: "Producto nuevo",
        description: "Descripcion del producto nuevo",
        code: "123456",
        category: "Electronics",
        brand: "Samsung",
        price: 100,
        stock: 10,
        owner: "aaaa@gmail.com",
      };
      const { statusCode } = await requester
        .put(`/api/products/edit/${productId}`)
        .send(newProductMock);

      expect(statusCode).to.equal(200);
    });
  });

  describe("Test /carts", () => {
    // test carts

    //CREA UN NUEVO CARRITO
    it("El endpoint /api/carts/create debe crear un carrito", async () => {
      const cartMock = {
        products: [
          {
            product: "",
            quantity: 1,
          },
        ],
      };
      const { statusCode, _body } = await requester
        .post("/api/carts/create")
        .send(cartMock);
      console.log(_body);
      expect(statusCode).to.equal(200);
      expect(_body.result).to.have.property("_id");
      expect(_body.result.products).to.be.an("array");
    });

    //AGREGAR PRODUCTO AL CARRITO
    it("El endpoint /api/carts/:cid/product/:pid debe agregar un producto al carrito", async () => {
      const cartMock = {
        products: [
          {
            product: "",
            quantity: 1,
          },
        ],
      };
      const { _body } = await requester
        .post("/api/carts/create")
        .send(cartMock);
      const cartId = _body.result._id;
      const productMock = {
        title: "Producto 01",
        description: "Descripcion del producto para agregar al carrito",
        code: "123456",
        category: "Electronics",
        brand: "Samsung",
        price: 100,
        stock: 10,
        owner: "aaaa@gmail.com",
      };
      const { body } = await requester
        .post("/api/products/add")
        .send(productMock);
      const productId = body.result._id;
      const { statusCode } = await requester
        .post(`/api/carts/${cartId}/product/${productId}`)
        .send(productMock);
      console.log(_body);
      expect(statusCode).to.equal(200);
    });

    //ACTUALIZAR CARRITO
    it("El endpoint /api/carts/:cid debe actualizar el carrito", async () => {
      //agregar producto al carrito
      const cartMock = {
        products: [
          {
            product: "",
            quantity: 1,
          },
        ],
      };
      const { _body } = await requester
        .post("/api/carts/create")
        .send(cartMock);
      const cartId = _body.result._id;
      const productMock = {
        title: "Producto viejo",
        description: "Descripcion del producto viejo",
        code: "11111",
        category: "Electronics",
        brand: "Samsung",
        price: 100,
        stock: 10,
        owner: "aaaa@gmail.com",
      };
      const { body } = await requester
        .post("/api/products/add")
        .send(productMock);
      const productId = body.result._id;
      const { ok } = await requester
        .post(`/api/carts/${cartId}/product/${productId}`)
        .send(productMock);
      const newProductMock = {
        title: "Producto nuevo",
        description: "Descripcion del producto nuevo",
        code: "123456",
        category: "Electronics",
        brand: "Samsung",
        price: 100,
        stock: 10,
        owner: "aaaa@gmail.com",
      };
      const { statusCode } = await requester
        .put(`/api/carts/${cartId}`)
        .send(newProductMock);
      console.log(_body);
      expect(statusCode).to.equal(200);
    });
  });

  describe("Test /sessions", () => {
    //logica de test sessions

    //REGISTRAR USUARIO
    it("El endpoint api/sessions/register debe registrar un usuario correctamente", async () => {
      const mockUser = {
        // Mock Object
        first_name: "Marcelo",
        last_name: "Mastroiani",
        email: "marcelo@gmail.com",
        age: 25,
        password: "1234",
        role: "user",
      };
      const { statusCode } = await requester
        .post("/api/sessions/register")
        .send(mockUser);

      expect(statusCode).to.equal(201);
    });

    //LOGIN USUARIO
    it("El endpoint api/sessions/login debe loginar un usuario correctamente", async () => {
      const mockUser = {
        // Mock Object
        first_name: "Marcelo",
        last_name: "Mastroiani",
        email: "marcelo@gmail.com",
        age: 25,
        password: "1234",
        role: "user",
      };
      const { ok } = await requester
        .post("/api/sessions/register")
        .send(mockUser);

      const { statusCode, _body } = await requester
        .post("/api/sessions/login")
        .send(mockUser);

      expect(ok).to.equal(true);
      expect(statusCode).to.equal(200);
      expect(_body.payload.email).to.be.equal("marcelo@gmail.com");
    });
  });
});
