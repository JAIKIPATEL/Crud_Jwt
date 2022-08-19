const dbConn = require('../../../config/db.config');


// Create a new post:
exports.create = (data, result) => {

    const { title, description, userId } = data;

    const insert = `INSERT INTO posts(title, description, status, isDeleted, userId) 
    VALUES(?, ?, "Pending", 0, ?)`;

    dbConn.query(insert, [title, description, userId], (err) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// getAll Registered posts:
exports.getAll = (result) => {

    dbConn.query(`SELECT title, description, status, isDeleted, userId FROM posts`, (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// get Registered post ById:
exports.getById = (id, result) => {

    dbConn.query(`SELECT title, description, status, isDeleted, userId FROM posts WHERE id = ?`,
        [id], (err, data) => {
            if (err) {
                return result(err, null);
            } else {
                if (data.length == 0)
                    return result(null, "Record not found");
                else
                    return result(null, data);
            }
        });
}


// Update a Registered post:
exports.update = (id, data, result) => {

    dbConn.query(`UPDATE posts SET ?  WHERE id = ?`, [data, id], (err) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// Soft Delete a registered user:
exports.delete = (id, result) => {

    dbConn.query(`SELECT * FROM posts  WHERE id = ?`, id, (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            if (data.length == 0)
                return result(null, "Data does not exist");
            else
                dbConn.query(`UPDATE posts SET isDeleted = ?  WHERE id = ?`, [1, id], (err) => {
                    if (!err) {
                        return result(null, "Post is Deleted Successfully");
                    } else {
                        return result(err, null);
                    }
                })
        }
    });
}
