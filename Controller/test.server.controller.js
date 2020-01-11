"use strict";
var config = require("../Config/manager/TestManager");

exports.getMethod = function (req, res) {
	config.getMethod(req,function (err, result) {
		res.send(result);
	});
}

exports.getMethodById = function (req, res) {
	var name = req;
	config.getMethodById(name, function (err, result) {
		res.send(result);
	});
}

exports.postMethod = function (req, res) {
	var v1 = req;
	config.postMethod(v1, function (err, result) {
		res.send(result);
	});
}

exports.updateMethod = function (req, res) {
	var v1 = req;
	config.updateMethod(v1, function (err, result) {
		res.send(result);
	});
}

exports.deleteMethod = function (req, res) {
	var name = req;
	config.deleteMethod(name, function (err, result) {
		res.send(result);
	});
};

exports.login=function (req, res){
	config.login(function (err, result){
		res.json({token: result});
	})
}
