const path = require('path');
const conn = require('./database');

module.exports = {
  getMenus() {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_menus ORDER BY title', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  save(fields, files) {
    return new Promise((resolve, reject) => {
      const photo = `images/${path.parse(files.photo.path).base}`;
      let query;
      let queryPhoto = '';
      const params = [fields.title, fields.description, fields.price];

      if (files.photo.name) {
        queryPhoto = ',photo = ?';
        params.push(photo);
      }

      if (parseInt(fields.id) > 0) {
        params.push(fields.id);
        query = `UPDATE tb_menus 
        SET title = ?,
        description = ?, 
        price = ?
        ${queryPhoto}
        WHERE id = ?`;
      } else {
        if (!files.photo.name) {
          const err = 'Envie um foto';
          reject(err);
        }
        query = `
        INSERT INTO tb_menus(title, description, price, photo) VALUES(?, ?, ?, ?)
        `;
      }
      conn.query(query, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  delete(id) {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM  tb_menus WHERE id=?', [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
