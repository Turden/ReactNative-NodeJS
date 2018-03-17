"use strict";

const dbdrv = require('../drivers');

exports.db = (req, method, callback) => {
	dbdrv[method]("test", req, (r)=>{
        callback(r);
    });
};

