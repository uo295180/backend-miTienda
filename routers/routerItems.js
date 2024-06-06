const express = require("express")

const routerItems = express.Router()
const database = require("../database")

routerItems.get("/", async (req,res) => {
    database.connect();
    const items = await database.query("SELECT * FROM items")
    database.disConnect();
    res.json(items);
})

routerItems.get("/:id", async (req,res) => {
    id = req.params.id
    if(id == undefined){
        return res.status(400).json({error: "No id param"})
    }
    database.connect();
    const item = await database.query("SELECT * FROM items WHERE id=?", [id])
    database.disConnect();
    res.json(item);
})
module.exports = routerItems