const express = require("express");
const { Router } = express;

const router = Router();

const productos = [
  {
    id: 1,
    title: "Cerveza sol 355ml",
    price: 55.55,
    thumbnail:
      "https://www.ccu.com.ar/wp-content/uploads/2021/06/solbotella.png",
  },
];

let nextId = 1;

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
};

router.post("/productos", (req, res) => {
  nextId++;
  let { body: data } = req;
  data = { id: nextId, ...data };
  productos.push(data);
  res.status(STATUS_CODE.CREATED).json(data);
});

router.get("/productos", (req, res) => {
  res.status(STATUS_CODE.OK).json(productos);
});

router.get("/productos/:id", (req, res, next) => {
  try {
    var itemIndex = productos.findIndex((x) => x.id === id);
    console.log(itemIndex, "index");
    const id = parseInt(req.params.id);
    const dataById = productos.find((element) => element.id === id);
    if (!dataById) {
      throw new Error(`producto con id ${id} no encontrado.`);
    }
    res.status(STATUS_CODE.OK).json(dataById);
  } catch (error) {
    res.status(STATUS_CODE.NOT_FOUND).json({ error: error.message });
  }
});

router.put("/productos/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    let { body: data } = req;

    const dataById = productos.find((element) => element.id === id);
    if (!dataById) {
      throw new Error(`producto con id ${id} no encontrado.`);
    }

    for (const prod of productos) {
      if (prod.id === id) {
        prod.title = data.title || prod.title;
        prod.price = data.price || prod.price;
        prod.thumbnail = data.thumbnail || prod.thumbnail;
        break;
      }
    }

    res.status(STATUS_CODE.NO_CONTENT).end();
  } catch (error) {
    res.status(STATUS_CODE.NOT_FOUND).json({ error: error.message });
  }
});

router.delete("/productos/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = productos.findIndex((element) => {
      return element.id === id;
    });

    if (index === -1) {
      throw new Error(`producto con id ${id} no encontrado.`);
    }
    productos.splice(index, 1);
    res.status(STATUS_CODE.NO_CONTENT).end();
  } catch (error) {
    res.status(STATUS_CODE.NOT_FOUND).json({ error: error.message });
  }
});

module.exports = router;
