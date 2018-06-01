const http = require('http');
const express = require('express');
const app = express();

var credentials = {
    userName: "thomas",
    password: "moiroud"
};

var realm = 'Basic Authentication';

function authenticationStatus(resp) {
    resp.writeHead(401, { 'WWW-Authenticate': 'Basic realm="' + realm + '"' });
    resp.end('Authorization is needed');
};


var server = http.createServer(function (request, response) {
    var authentication, loginInfo;
 
    if (!request.headers.authorization) {
        authenticationStatus (response);
        return;
    }
 
    authentication = request.headers.authorization.replace(/^Basic/, '');
    authentication = (new Buffer(authentication, 'base64')).toString('utf8');
    loginInfo = authentication.split(':');
 
    if (loginInfo[0] === credentials.userName && loginInfo[1] === credentials.password) {
        response.end('Vous etes connecté');
    }
    authenticationStatus (response);
 
});

server.listen(5000);