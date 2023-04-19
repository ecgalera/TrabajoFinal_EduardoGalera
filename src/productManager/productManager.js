import fs from "fs";

export default class ProductsManager {
  constructor() {
    this.path = "./products.json";
  }
//--------------------------------------------------
  getProducts = async () => {
    try {
      const data = fs.existsSync(this.path);
      if (data) {
        const info = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(info);

        return products;
      } else {
        console.log("leyendo desde pmanager");
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  //___________________________________________
  addProduct = async ({
    title,
    description,
    thumnail,
    code,
    price,
    status,
    category,
  }) => {
    try {
      const products = await this.getProducts();

      const product = {
        title: title,
        description: description,
        thumnail: thumnail,
        code: code,
        price: price,
        status: status,
        category: category,
      };
      if (
        (!title, !description, !thumnail, !code, !price, !status, !category)
      ) {
        console.log("complete todos los campos");
        return null;
      }
      const repetCode = products.find((p) => p.code === code);

      if (repetCode) {
        console.log("invalid code");
        return null;
      }

      if (products.length === 0) {
        product.id = 1;
      } else {
        product.id = products[products.length - 1].id + 1;
      }
      products.push(product);

      fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };

//----------------------------------------------------
  updateProduct = async (id, elem) => {
    console.log(id, elem);
    try {
      const products = await this.getProducts();

      const newProduct = products.map((p) =>
        p.id == id ? { ...p, ...elem } : p
      );

      fs.promises.writeFile(this.path, JSON.stringify(newProduct, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };

  //---------------------------------------------------------------

  deleteProduct = async (did) => {
    const products = await this.getProducts();
    console.log(products);
    const productIndex = products.findIndex(u => u.id === did)
    console.log(productIndex);
    products.splice(productIndex, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
  };

  //-----------------------------------------------------------------
  getProductById = async (_id) => {
    const data = await fs.promises.readFile(this.path, 'utf-8');
    const cart = JSON.parse(data)
    const product = cart.find(p => p.id === _id)
    if (product) {
        return product
    } else {
        console.error("Not found")
        return null
    }
};

}