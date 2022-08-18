const { token } = require('morgan');
const dbConn = require('../../../config/db.config');


// Register a new user:
exports.create = (data, result) => {

    const { firstName, lastName, age, gender, email, password, userTypes, status, isDeleted, token } = data;

    const insert = `INSERT INTO users(firstName, lastName, age, gender, email, password, 
        userTypes, status, isDeleted, token) VALUES(?, ?, ?, ?, ?, ?, "User", "Approved", 0, ?)`;

    dbConn.query(insert, [firstName, lastName, age, gender, email, password, token], (err) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// Login a user:
exports.getUserByEmail = (email, result) => {

    dbConn.query(`SELECT * FROM users WHERE email = ?`, email, (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data[0]);
        }
    });
}

exports.updateToken = (token, email, result) => {

     dbConn.query(`UPDATE users SET token = ?  WHERE email = ?`, [token, email], (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
     })
}


// getAll Registered users:
exports.getAll = (result) => {

    dbConn.query(`SELECT firstName, lastName, age, gender, email, password, 
    userTypes, status, isDeleted FROM users`, (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// get Registered user ById:
exports.getById = (id, result) => {

    dbConn.query(`SELECT firstName, lastName, age, gender, email, password, 
    userTypes, status, isDeleted FROM users WHERE id = ?`, [id], (err, data) => {
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


// Update a Registered user:
exports.update = (id, data, result) => {

    dbConn.query(`UPDATE users SET ?  WHERE id = ?`, [data, id], (err) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// Soft Delete a registered user:
exports.delete = (id, result) => {

    dbConn.query(`SELECT * FROM users  WHERE id = ?`, id, (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            if (data.length == 0)
                return result(null, "Data does not exist");
            else
                dbConn.query(`UPDATE users SET isDeleted = ?  WHERE id = ?`, [1, id], (err) => {
                    if (!err) {
                        return result(null, "User is Deleted Successfully");
                    } else {
                        return result(err, null);
                    }
                })
        }
    });
}


// Delete a Registered user:
// exports.delete = (id, result) => {

//     dbConn.query(`SELECT * FROM users  WHERE id = ?`, id, (err, data) => {
//         if (err) {
//             return result(err, null);
//         } else {
//             if (data.length == 0)
//                 return result(null, "Data does not exist");
//             else
//                 dbConn.query(`DELETE FROM users  WHERE id = ?`, id, (err) => {
//                     if (!err) {
//                         return result(null, "User is Deleted Successfully");
//                     } else {
//                         return result(err, null);
//                     }
//                 });
//         }
//     });
// }


// isDeleted users getAll :
exports.deletedUsers = (result) => {
    const deletedList = `SELECT * FROM users  WHERE isDeleted = 1`;

    dbConn.query(deletedList, (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// isDeleted posts getAll :
exports.deletedPosts = (result) => {
    const deletedList = `SELECT * FROM posts  WHERE isDeleted = 1`;

    dbConn.query(deletedList, (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// Show User posts:
exports.showUsersList = (result) => {
    const showList = `SELECT * FROM users  WHERE userTypes = 'User'`;

    dbConn.query(showList, (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data.filter((item) => item.userTypes === 'User'));
        }
    });
}


// Show all post: through Admin Access
exports.adminAccess = (req, result) => {

    dbConn.query(`SELECT * FROM posts`, req.body, (err, data) => {
        console.log(data);
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// Show post ById: through Admin Access
exports.adminGetById = (id, result) => {

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


// Update post: through Admin Access
exports.adminPostUpdate = (id, data, result) => {

    dbConn.query(`UPDATE posts SET ?  WHERE id = ?`, [data, id], (err) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data);
        }
    });
}


// Soft Delete post: through Admin Access
exports.adminPostDelete = (id, result) => {

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
                });
        }
    });
}