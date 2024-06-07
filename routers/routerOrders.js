const express = require("express")

const routerOrders = express.Router()
const database = require("../database")

routerOrders.get("/", async (req,res) => {
    database.connect();
    let orders = []
    if( req.query.DNIClient != undefined){
        orders = await database.query("SELECT * FROM orders WHERE DNIClient = ?", [req.query.DNIClient])
    }
    else{
        orders = await database.query("SELECT * FROM orders")
    }
    database.disConnect();
    res.json(orders);
})

routerOrders.get("/:id", async (req,res) => {
    id = req.params.id
    if(id == undefined){
        return res.status(400).json({error: "No id param"})
    }
    database.connect();
    const order = await database.query("SELECT * FROM orders WHERE id=?", [id])
    database.disConnect();
    res.json(order);
})

routerOrders.post("/", async (req, res) => {
    let DNIClient = req.body.DNIClient
    if(DNIClient == undefined){
        return res.status(400).json({ error: "no DNIClient in body"})
    }
    database.connect();
    let insertedOrder = await database.query("INSERT INTO orders (DNIClient, state) VALUES (?,0)", [DNIClient])
    database.disConnect();
    return res.json({ inserted: insertedOrder})
})

routerOrders.post("/:idOrder/items", async (req, res) => {
    let idOrder = req.params.idOrder
    if(idOrder == undefined){
        return res.status(400).json({error:"No id of the order"})
    }
    let idItem = req.body.idItem
    if(idItem == undefined){
        return res.status(400).json({error:"No id of the item in bodys"})
    }

    let units = req.body.units
    if(units == undefined){
        units = 1
    }

    database.connect();
    let itemsInOrder = await database.query("SELECT * FROM oder_items WHERE idOrder = ? AND idItem = ?", [idOrder,idItem])
    let result = undefined
    if(itemsInOrder.length > 0){
        result = await database.query("UPDATE oder_items SET units = ? WHERE idOrder = ? AND idItem = ?", [Number(units)+Number(itemsInOrder[0].units),idOrder,idItem])
    }
    else{
        result = await database.query("INSERT INTO oder_items (idOrder, idItem, units) VALUES (?,?,?)", [idOrder,idItem,units])
    }
    database.disConnect();
    res.json(result)
})


module.exports = routerOrders