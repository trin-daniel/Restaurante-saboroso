const conn = require('./database');

module.exports = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      conn.query(
        'SELECT * FROM tb_users WHERE email = ?',
        [email],
        (err, results) => {
          if (err) {
            reject(err);
          } else if (!results.length > 0) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Usuario ou senha incorretos');
          } else {
            const row = results[0];
            if (row.password !== password) {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject('Usuario ou senha incorretos');
            } else {
              resolve(row);
            }
          }
        },
      );
    });
  },
};
