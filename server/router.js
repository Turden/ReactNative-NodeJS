"use strict";

const settings = require("./settings.json");
const router = require('express').Router();
const db = require('./db/controllers/index');

router.post(settings.router.post, (req, res) => {	   
	db.db(req.body, "post", (r) => {
        res.send(r);
    })   
});

router.get(settings.router.get, (req, res) =>{  
    db.db(req.params.id, "get", (r) => {
        res.send(r);
    }) 
})

module.exports = router;
