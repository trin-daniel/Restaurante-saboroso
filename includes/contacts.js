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
};
