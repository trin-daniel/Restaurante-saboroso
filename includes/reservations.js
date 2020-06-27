const conn = require('./database');

module.exports = {
  save(body) {
    return new Promise((resolve, reject) => {
      const { name, email, people, date, time } = body;
      const datePatternUSA = date.split('/').reverse().join('-');
      conn.query(
        'INSERT INTO tb_reservations (name, email, people, date, time) VALUES(?, ?, ?, ?, ?)',
        [name, email, people, datePatternUSA, time],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('Sucesso na reserva');
          }
        },
      );
    });
  },
};
