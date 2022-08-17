const dbConn = require('../../../config/db.config');


// User resetPassword:
exports.resetPassword = (result) => {
    const reset = `UPDATE users SET password = ?  WHERE email = ?`;

    dbConn.query(reset, (err, data) => {
        if (err) {
            return result(err, null);
        } else {
            return result(null, data[0]);
        }
    });
}


 // ***Requests to the  resetPasswordToken table ***
 
//  dbConn.expireOldTokens = (email, used) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('UPDATE resetPassword SET used = ?  WHERE email = ?', [ used, email], (error)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve();
//         });
//     });
// };
 
 
//   dbConn.insertResetToken = (email, token_value, created_at, expired_at, used) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query(`INSERT INTO resetPassword ( email, token_value, created_at, expired_at, used ) 
//         VALUES (?, ?, ?, ?, ?)`, [email, token_value, created_at, expired_at, used], (error, result)=>{
//             if(error){
//                 return reject(error);
//             }
             
//               return resolve(result.insertId);
//         });
//     });
// };
 
//   dbConn.findValidToken = (token, email, currentTime) =>{
//     return new Promise((resolve, reject)=>{
//         pool.query('SELECT * FROM resetPassword WHERE (email = ? AND token_value = ? AND expired_at > ?)', [email, token, currentTime ], (error, tokens)=>{
//             if(error){
//                 return reject(error);
//             }
//             return resolve(tokens[0]);
             
//         });
//     });
// };
 