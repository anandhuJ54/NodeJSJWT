"use strict";

var db = require("../db");
var mysql = require('mysql');
var con = mysql.createPool(db);
var jwt = require('jsonwebtoken');
var TokenVerification = require('../manager/tokenVerify');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// login function to get JSON Web Token
function login(cb) {
    var userData = {
        id: 122,
        username: 'john',
        password: 'McKay'
    };

    jwt.sign(userData, 'mysecretkey', { expiresIn: '1h' }, (err, token) => {
        if (err) {
            cb(403);
        }
        else {
            cb(null, token);
        }
    });
}

//Get all records "../api/getData"
function getMethod(req, cb) {
    var resp = TokenVerification.verifyToken(req)
    if (resp === '403') {
        cb(null, 'Forbidden')
    }
    else if (resp === false) {
        cb(null, 'Invalid Token')
    }
    else {
        con.getConnection(function (err, connection) {
            if (err) {

                connection.release();
            }
            else {
                var selectQuery = "SELECT * FROM employees ";
                con.query(selectQuery, function (err, result, fields) {
                    if (err) {
                        cb(null, 'error');
                        connection.release();
                    }
                    {
                        cb(null, result);
                        connection.release();
                    }
                });
            }
        })
    }
}

//Get a single record  "../api/getData/:name"
function getMethodById(req, cb) {
    let id = req.params.name;
    var resp = TokenVerification.verifyToken(req)
    if (resp === '403') {
        cb(null, 'Forbidden')
    }
    else if (resp === false) {
        cb(null, 'Invalid Token')
    }
    else {
        con.getConnection(function (err, connection) {
            if (err) {
                cb(null, 'server error')
                // connection.release();
            }
            else {
                var selectQuery = "SELECT * FROM employees WHERE employeeNumber=" + id + "";
                con.query(selectQuery, function (err, result, fields) {
                    if (err) {
                        cb(null, 'server error')
                        connection.release();
                    }
                    {
                        cb(null, result);
                        connection.release();
                    }
                });
            }
        })
    }
}

//Insert record   "../api/postData"
function postMethod(v1, cb) {
    var resp = TokenVerification.verifyToken(v1)
    if (resp === '403') {
        cb(null, 'Forbidden')
    }
    else if (resp === false) {
        cb(null, 'Invalid Token')
    }
    else {
        let obj = {
            lastName: v1.body.lastName,
            firstName: v1.body.firstName,
            extension: v1.body.extension,
            email: v1.body.email,
            officecode: v1.body.officeCOde,
            reportsto: v1.body.reportsTo,
            jobtitle: v1.body.jobTitle
        }

        con.getConnection(function (err, connection) {
            if (err) {
                cb(null, 'server error')
            }
            else {
                var insertQuery = "insert into employees (lastName, firstName,extension, email, officeCOde, reportsTo, jobTitle ) values('" + obj.lastName + "','" + obj.firstName + "','" + obj.extension + "','" + obj.email + "','" + obj.officecode + "','" + obj.reportsto + "','" + obj.jobtitle + "')";
                con.query(insertQuery, function (err, result, fields) {
                    if (err) {
                        cb(null, 'server error')
                        connection.release();
                    }
                    else {
                        cb(null, 'record added successfully');
                        connection.release();
                    }
                });
            }
        })
    }
}

//Update record    "../api/updateData"
function updateMethod(v1, cb) {
    var resp = TokenVerification.verifyToken(v1)
    if (resp === '403') {
        cb(null, 'Forbidden')
    }
    else if (resp === false) {
        cb(null, 'Invalid Token')
    }
    else {
        let obj = {
            id: v1.body.employeeNumber,
            lastName: v1.body.lastName,
            firstName: v1.body.firstName,
            extension: v1.body.extension,
            email: v1.body.email,
            officecode: v1.body.officeCOde,
            reportsto: v1.body.reportsTo,
            jobtitle: v1.body.jobTitle
        }

        var updateQuery = "UPDATE employees SET lastName='" + obj.lastName + "',firstName='" + obj.firstName + "', extension='" + obj.extension + "', email='" + obj.email + "',officeCOde='" + obj.officecode + "', reportsTo='" + obj.reportsto + "', jobTitle='" + obj.jobtitle + "' WHERE employeeNumber = " + obj.id + "";
        con.getConnection(function (err, connection) {
            if (err) {
                cb(null, 'server error')
                connection.release();
            }
            else {
                con.query(updateQuery, function (err, result, fields) {
                    if (err) {
                        cb(null, 'server error')
                        connection.release();
                    }
                    {
                        cb(null, 'updated successfully');
                        connection.release();
                    }
                });
            }
        })
    }
}

//Delete record   "../api/deleteData/:name"
function deleteMethod(req, cb) {
    var resp = TokenVerification.verifyToken(req)
    if (resp === '403') {
        cb(null, 'Forbidden')
    }
    else if (resp === false) {
        cb(null, 'Invalid Token')
    }
    else {
        let id = req.params.name;
        con.getConnection(function (err, connection) {
            if (err) {
                cb(null, 'server error')
                connection.release();
            }
            else {
                var deleteQuery = "DELETE FROM employees WHERE employeeNumber=" + id + "";
                con.query(deleteQuery, function (err, result, fields) {
                    if (err) {
                        cb(null, 'server error')
                        connection.release();
                    }
                    {
                        cb(null, 'record deleted successfully');
                        connection.release();
                    }
                });
            }
        })
    }
}

// Export Functions to Controller
module.exports = {
    login: login,
    getMethod: getMethod,
    getMethodById: getMethodById,
    postMethod: postMethod,
    updateMethod: updateMethod,
    deleteMethod: deleteMethod
}