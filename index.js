const express = require("express");
const productos = require("./routers/productos");
const app = express();
const path = require("path");

const PORT = process.env.NODE_PORT;
const ENV = process.env.NODE_ENV;

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
};

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", productos);

const server = app.listen(PORT, () => {
  console.log(
    `Servidor http esta escuchando en el puerto ${server.address().port}`
  );
  console.log(`http://localhost:${server.address().port}`);
  console.log(`Environment:${ENV}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));
