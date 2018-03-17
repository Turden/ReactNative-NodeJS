"use strict";

const express = require("express");
const bodyParser = require('body-parser');
const router = require('./router');
const logger = require("morgan");

const settings = require('./settings.json')


const app = express();

class Server{
    start(settings, router){
        const listen = settings.listen;

		let port = process.env.PORT | listen.port;
        let host = listen.host;
        
        app.use(logger('dev'));

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
			extended: true
        }));
        
        app.use(router);

		app.listen(port, host, () => {
			console.info('Server started on %s', port);
		});
    }
}

new Server().start(settings,router);

