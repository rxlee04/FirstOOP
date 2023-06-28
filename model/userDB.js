const db = require('../db_connection.js');
const userTableName = 'public."User"'
const userDB = {
    //GET/users/:id -> get user by id
    getUserByID: function (id) {
        var sql = `SELECT * FROM ${userTableName} u WHERE u."userId" = $1`;
        return db.query(sql, [id]);       
    },

};

module.exports = userDB;