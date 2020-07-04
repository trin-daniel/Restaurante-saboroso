const conn = require('./database');

module.exports = {
  getEmails() {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_emails ORDER BY email', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM  tb_emails WHERE id=?', [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  save(req) {
    return new Promise((resolve, reject) => {
      if (!req.fields.email) {
        const msg = 'Preencha o campo e-mail corretamente';
        reject(msg);
      } else {
        conn.query(
          'INSERT INTO tb_emails (email) VALUES(?)',
          [req.fields.email],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        );
      }
    });
  },
};
