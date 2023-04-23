import {Router} from "express";
const router = Router();
import uploads from "../services/uploads.js";
import ProductManager from "../productManager/productManager.js";

const pm = new ProductManager()


router.get("/", async(req, res)=>{
    const cantidadDeProducts = req.query.limit;
    const allProducts = await pm.getProducts()
    if(cantidadDeProducts){
        const reduced = allProducts.slice(0,cantidadDeProducts)
        res.send(reduced)
    }else{
        res.send(allProducts)
    }
})

router.get("/:id", async (req, res)=>{
    
    res.send(await pm.getProductById(parseInt(req.params.id)))

})

router.post("/", uploads.single("image"), async(req, res)=>{
    const newProduct = req.body
    await pm.addProduct(newProduct)
    res.send({status: "success" , message: "Product created"})
});

router.delete("/:id" , async(req, res)=>{
//    const product = await pm.getProducts()
    const id = parseInt(req.params.id);
    
    await pm.deleteProduct(id)
    res.send({status: "success" , message: "Product delete"})
})

router.put("/:id", async(req, res)=>{
    const productId = req.params.id;
    const change = req.body
  
    await pm.updateProduct(productId, change)
    res.send({status: "success" , message: "Product change"})
});

export default router;
