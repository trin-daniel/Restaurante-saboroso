const conn = require('./database');

module.exports = {
  save(body) {
    return new Promise((resolve, reject) => {
      const { name, email, message } = body;
      conn.query(
        'INSERT INTO tb_contacts (name, email, message) VALUES(?, ?, ?)',
        [name, email, message],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(
              'Sucesso no envio da messagem, aguarde a resposta de sua duvida',
            );
          }
        },
      );
    });
  },
  getContacts() {
    return new Promise((resolve, reject) => {
      conn.query(
        'SELECT * FROM tb_contacts ORDER BY register DESC',
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  },
  delete(id) {
    return new Promise((resolve, reject) => {
      conn.query(
        'DELETE FROM  tb_contacts WHERE id=?',
        [id],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        },
      );
    });
  },
};
