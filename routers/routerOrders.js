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
module.exports = routerOrders