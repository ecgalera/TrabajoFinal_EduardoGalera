import {Router} from "express";
const router = Router();
import uploads from "../services/uploads.js";

const products = [];

router.get("/", (req, res)=>{
        res.send(products)
});

router.post("/", uploads.single("image"), (req, res)=>{
    const product = req.body;
    products.push(product);
    res.send({status: "success" , message: "Product created"})
});

// router.post("/", (req, res)=>{
//     const product = req.body;
//     products.push(product);
//     res.send({status: "success" , message: "Product created"})
// });

export default router;