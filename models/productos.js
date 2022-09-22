class Producto {
  constructor(data) {
    this.productos = data || [];
  }

  obtenerPorId(id) {
    try {
      const producto = this.productos.find(
        (element) => parseInt(element.id) === parseInt(id)
      );
      if (!producto) {
        throw new Error(`producto con id ${id} no encontrado.`);
      }
      return producto;
    } catch (error) {
      throw error;
    }
  }

  obtener() {
    try {
      return this.productos;
    } catch (error) {
      console.log("Ocurrio un error durante la operación:", error);
      throw new Error(error.message);
    }
  }

  crear(data) {
    try {
      const id = this.productos.length + 1;  
      this.productos.push({ id, ...data });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  eliminar(id) {
    try {
      const index = this.productos.findIndex((element) => {
        return parseInt(element.id) === parseInt(id);
      });

      if (index === -1) {
        throw new Error(`producto con id ${id} no encontrado.`);
      }
      this.productos.splice(index, 1);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  actualizar(data, id) {
    try {
        
      const producto = this.productos.find(
        (element) => parseInt(element.id) === parseInt(id)
      );
      if (!producto) {        
        throw new Error(`producto con id ${id} no encontrado.`);
      }

      for (const prod of this.productos) {
        if (parseInt(prod.id) === parseInt(id)) {
          prod.title = data.title || prod.title;
          prod.price = data.price || prod.price;
          prod.thumbnail = data.thumbnail || prod.thumbnail;
          break;
        }
      }
   
    } catch (error) {
        throw new Error(error.message);
    }
  }
}

module.exports = Producto;
