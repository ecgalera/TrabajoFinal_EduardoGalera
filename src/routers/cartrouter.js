import { Router } from "express";
import CartManager from "../productManager/cartManager.js"
import ProductsManager from "../productManager/productManager.js";

const router = Router();

export default router;

const cartManager = new CartManager();
const productsManager = new ProductsManager();

const carts = cartManager.getCarts();
const products = productsManager.getProducts();

router.get(`/:cId`, async (req, res) => {
  try {
    const idCart = req.params.cId;
    const allCarts = await carts;
    const selected = allCarts.find((c) => c.id == idCart);
    res.send(selected);
  } catch (error) {
    console.log(error);
    return res.status(404).send({ status: "error", error: "not found" });
  }
});

router.post(`/`, async (req, res) => {
  try {
    cartManager.addCart();
    res.send("cart created");
  } catch (error) {
    console.log(error);
    return res.status(404).send({ status: "error", error: "cart not created" });
  }
});

router.post(`/:cId/product/:pId`, async (req, res) => {
  const allCarts = await carts;
  console.log(allCarts)
  const idCart = +req.params.cId;
  console.log(idCart)
  const CartExist = allCarts.find(u => u.id === idCart)
  console.log(CartExist)
  if (!CartExist) {
    return res.status(404).send({ status: "error", error: "cart not found" });
  }
  const idProduct = req.params.pId;
  let quantity = req.body.quantity;
  quantity ? (quantity = quantity) : (quantity = 1);
  const allProducts = await products;
  const productSelected = allProducts.find((p) => p.id == idProduct);
  productSelected
    ? res.send({ status: "succes ", code: "Product and Cart found" })
    : res.send("product not found");
  const productSelectedId = productSelected.id;
  const cartToSend = {
    product: productSelectedId,
    quantity: quantity,
  };
  cartManager.addProductToCart(idCart, cartToSend);
});