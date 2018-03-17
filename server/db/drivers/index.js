"use strict";

const settings = require("../../settings.json");
const udb_settings = settings.db.udb;

const dbdrv = require("sequelize");

const credentials = udb_settings.credentials;

let connection = new dbdrv(udb_settings.database, credentials.username, credentials.password, udb_settings.options);

exports.post = (tableName, req, cb) => {
    let table = udb_settings.TABLES[tableName];
    let users = connection.define(table.table, table.config, table.extra_config);    
    connection
        .sync()
        .then(function () {
            users.findOrCreate({
                    where: {
                        id: req.key
                    },
                    defaults: {
                        value: req.value
                    }
                })
                .spread((body, created) => {
                    switch (created) {
                        case false:
                            {
                                users.update({
                                    value: req.value
                                }, {
                                    where: {
                                        id: req.key
                                    }
                                });
                                cb(200);
                                break;
                            }
                        case true:
                            {
                                cb(200);
                                break;
                            }
                    }
                });
        })
        .catch(function (err) {
            console.warn(err);
        });
};

exports.get = (tableName, id, cb) => {
    let table = udb_settings.TABLES[tableName];
    let users = connection.define(table.table, table.config, table.extra_config);

    connection
        .sync()
        .then(function () {
            users.findById(id).then((e) => {
                cb(e.dataValues);
            })
	.catch(function (err) {
		    console.warn(err);
		});
        })
};
