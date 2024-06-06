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

routerOrders.post("/", async (req, res) => {

})


module.exports = routerOrders