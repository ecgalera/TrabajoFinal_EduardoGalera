import fs from "fs";


export default class CartManager {
    constructor() {
        this.path = "./carts.json";

    };

    //--------------------------------------------------------

    initialize = async () => {
        const productsJson = JSON.stringify(this.products)
        await fs.promises.writeFile(this.path, productsJson)
    };

    //--------------------------------------------------------

    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const cart = JSON.parse(data);
            return cart;
        }else{
        console.log("Carrito vacío")
        return [];
    };
};


    //--------------------------------------------------------

    addCart = async () => {
        const carrito = await this.getCarts()
        console.log(carrito);

        const cart = {
            products: []
        }

        if (carrito.length === 0) {
            cart.id = 1
        } else {
            cart.id = carrito[carrito.length - 1].id + 1
        }

        carrito.push(cart)

        const data = await fs.promises.writeFile(this.path, JSON.stringify(carrito, null, "\t"))

        return data
    };

    getCartById = async (_id) => {
        const carts = await this.getCarts();
        const cartById = carts.find(e => e.id == _id);
        return cartById
    };

    addProductToCart = async (idCart, productsToAdd) => {
        const carts = await this.getCarts();
        
        const cartSelected = await this.getCartById(idCart)
    
        const yaEstaEnElCarrito = cartSelected.products.find(
          (p) => p.product == productsToAdd.product
        );
        if (!yaEstaEnElCarrito) {
          cartSelected.products.push(productsToAdd);
          console.log(productsToAdd);
        } else {
          const index = cartSelected.products.findIndex(
            (p) => p.product == productsToAdd.product
          );
          cartSelected.products[index].quantity += productsToAdd.quantity;
        }
    
        const newCart = carts.map((c) =>
          c.id == idCart ? { ...c, ...cartSelected } : c
        );
    
        fs.promises.writeFile(this.path, JSON.stringify(newCart, null, "\t"));
      };
       
            
    };
     