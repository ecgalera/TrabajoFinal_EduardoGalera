import express from "express";
import productsRouter from "./routers/products.router.js"
import cartRouter from "./routers/cartrouter.js"
import _dirname from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${_dirname}/public`))

app.use("/api/cart", cartRouter)


app.use("/products", productsRouter )



app.listen(8080, ()=>{
    console.log("Listenning in port: 8080");
})