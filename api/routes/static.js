'use strict';

server.get(/\/|index\.html|((css|img|js).*)/g, restify.serveStatic({
	directory: '../app/public/',
	default: 'index.html',
}));