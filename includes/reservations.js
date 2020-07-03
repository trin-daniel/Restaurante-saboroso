const conn = require('./database');

module.exports = {
  save(body) {
    return new Promise((resolve, reject) => {
      const { name, email, people, time } = body;
      if (body.date.indexOf('/') > -1) {
        let date = body.date.split('/').reverse().join('-');
        body.date = date;
      }
      const params = [name, email, people, body.date, time];
      let query;
      if (parseInt(body.id) > 0) {
        query = `
        UPDATE tb_reservations
        SET 
        name = ?,
        email =?,
        people = ?,
        date = ?,
        time = ?
        WHERE id = ?
        `;
        params.push(body.id);
      } else {
        query = `INSERT INTO tb_reservations 
        (name, email, people, date, time) 
        VALUES(?, ?, ?, ?, ?)`;
      }
      conn.query(query, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('Sucesso na reserva');
        }
      });
    });
  },
  getReservations() {
    return new Promise((resolve, reject) => {
      conn.query(
        'SELECT * FROM tb_reservations ORDER BY date DESC',
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
};
