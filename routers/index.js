const express = require("express");
const Producto = require("../models/productos");
const { Router } = express;
const router = Router();

const data = [
  {
    id: 1,
    title: "Cerveza sol 355ml",
    price: 55.55,
    thumbnail:
      "https://www.ccu.com.ar/wp-content/uploads/2021/06/solbotella.png",
  },
];

const producto = new Producto(data);

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
};

router.post("/productos", (req, res, next) => {
  try {
    let { body: data } = req;
    producto.crear(data);
    res.status(STATUS_CODE.CREATED).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/productos", (req, res, next) => {
  try {
    const productos = producto.obtener();
    res.status(STATUS_CODE.OK).json(productos);
  } catch (error) {
    next(res.status(STATUS_CODE.NOT_FOUND).json(error));
  }
});

router.get("/productos/:id", (req, res) => {
  try {
    const dataById = producto.obtenerPorId(req.params.id);
    res.status(STATUS_CODE.OK).json(dataById);
  } catch (error) {
    res.status(STATUS_CODE.NOT_FOUND).json({ error: error.message });
  }
});

router.put("/productos/:id", (req, res) => {
  try {

    let { body: data } = req;
    producto.actualizar(data, req.params.id);
    res.status(STATUS_CODE.NO_CONTENT).end();

  } catch (error) {
    res.status(STATUS_CODE.NOT_FOUND).json({ error: error.message });
  }
});

router.delete("/productos/:id", (req, res) => {
  try {

    producto.eliminar(req.params.id);
    res.status(STATUS_CODE.NO_CONTENT).end();

  } catch (error) {
    res.status(STATUS_CODE.NOT_FOUND).json({ error: error.message });
  }
});

module.exports = router;
