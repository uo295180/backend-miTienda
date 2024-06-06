const express = require("express")
const database = require("./database")
const routerItems = require("./routers/routerItems")
const routerOrders = require("./routers/routerOrders")
const app = express();
app.use(express.json())

app.use("/items", routerItems)
app.use("/orders", routerOrders)

const port = 3000




app.listen(port, () => {
    console.log("Servidor activo en el puerto "+port)
})
